const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const mongoose = require("mongoose");

const addUser = async (username, password, email) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username: username,
    passwordHash: hashedPassword,
    email: email,
    linked: [],
  });
  try {
    return newUser.save();
  } catch (error) {
    console.log(error);
    throw new UserInputError(error);
  }
};

const login = async (username, password) => {
  const user = await User.findOne({ username: username });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          username: username,
        },
        process.env.JWT_SECRET
      );
      return {
        value: token,
      };
    }
  }
  throw new UserInputError("Username and password combination is incorrect");
};

const addFriend = async (currentUsername, friendUsername) => {
  const currentUser = await User.findOne({ username: currentUsername });
  const friendUser = await User.findOne({ username: friendUsername });

  currentUser.linked = [
    ...currentUser.linked,
    {
      user: friendUser._id,
      isFriend: true,
      messages: [],
    },
  ];

  friendUser.linked = [
    ...friendUser.linked,
    {
      user: currentUser._id,
      isFriend: true,
      messages: [],
    },
  ];

  await friendUser.save();

  return await (
    await currentUser.save()
  )
    .populate({
      path: "linked",
      populate: {
        path: "user",
      },
    })
    .execPopulate();
};

const deleteFriend = async (currentUsername, friendUsername) => {
  const currentUser = await User.findOne({
    username: currentUsername,
  });
  const friendUser = await User.findOne({ username: friendUsername });

  //Updates current and friend users by filtering out the deleted name by _id
  currentUser.linked = currentUser.linked.filter((linkedInfo) => {
    return linkedInfo.user.toString() !== friendUser._id.toString();
  });
  friendUser.linked = friendUser.linked.filter((linkedInfo) => {
    return linkedInfo.user.toString() !== currentUser._id.toString();
  });

  await friendUser.save();

  return await (
    await currentUser.save()
  )
    .populate({
      path: "linked",
      populate: {
        path: "user",
      },
    })
    .execPopulate();
};

const sendMessage = async (currentUsername, sentMessage, friendUsername) => {
  const currentUser = await User.findOne({
    username: currentUsername,
  });
  const friendUser = await User.findOne({ username: friendUsername });
  const currentDate = new Date();
  let messageId;

  const updatedCurrentUserLinked = currentUser.linked.map((linkedUser) => {
    if (linkedUser.user.toString() === friendUser._id.toString()) {
      return {
        ...linkedUser.toObject(),
        messages: linkedUser.messages.concat({
          sentUser: currentUser.toObject(),
          message: sentMessage,
          date: currentDate,
        }),
      };
    }
    return linkedUser;
  });

  const updatedFriendLinked = friendUser.linked.map((linkedUser) => {
    if (linkedUser.user.toString() === currentUser._id.toString()) {
      return {
        ...linkedUser.toObject(),
        messages: linkedUser.messages.concat({
          sentUser: currentUser.toObject(),
          message: sentMessage,
          date: currentDate,
        }),
      };
    }
    return linkedUser;
  });

  currentUser.linked = updatedCurrentUserLinked;
  friendUser.linked = updatedFriendLinked;

  await friendUser.save();
  const updatedCurrentUser = await currentUser.save();

  const linkedFriendUser = updatedCurrentUser.linked.find((linkedUser) => {
    return linkedUser.user.toString() === friendUser._id.toString();
  });
  const latestMessage =
    linkedFriendUser.messages[linkedFriendUser.messages.length - 1];

  messageId = latestMessage._id;

  return {
    _id: messageId,
    sentUser: currentUser,
    message: sentMessage,
    date: currentDate,
  };
};

module.exports = {
  addUser,
  login,
  addFriend,
  deleteFriend,
  sendMessage,
};
