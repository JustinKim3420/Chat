const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const addUser = async (username, password, email) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username: username,
    passwordHash: hashedPassword,
    email: email,
    linked: [],
  });
  return newUser.save();
};

const login = async (username, password) => {
  const user = await User.findOne({ username: username });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password,user.passwordHash);
    if (isPasswordCorrect) {
      const token = jwt.sign({
        username:username
      }, process.env.JWT_SECRET);
      return {
        value: token,
      };
    }
  }
};

module.exports = {
  addUser,
  login,
};
