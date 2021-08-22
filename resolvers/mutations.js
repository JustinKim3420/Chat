const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

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
  const friendUser = await User.findOne({ username:friendUsername });

  currentUser.linked=[
    ...currentUser.linked,
    {
      user:friendUser,
      isFriend:true,
      messages:[]
    }
  ]

  return currentUser.save()
};

const deleteFriend = async (currentUsername, friendUsername)=>{
  const currentUser = await User.findOne({username:currentUsername}).populate({
    path:'linked',
    populate:{
      path:'user'
    }
  })

  currentUser.linked= currentUser.linked.filter((linkedInfo)=>{
    return linkedInfo.user.username !== friendUsername
  })

  return currentUser.save();
}

module.exports = {
  addUser,
  login,
  addFriend,
  deleteFriend
};
