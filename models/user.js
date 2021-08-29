const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const linkedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isFriend: Boolean,
  messages: [
    {
      sentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      message: String,
      date: Date,
    },
  ],
  _id: false,
  id: false,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  linked: [linkedSchema],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON',{
    transform:(document, returnedObject)=>{
        delete returnedObject.__v
    }
})

userSchema.set('toObject',{
    transform:(document, returnedObject)=>{
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model("User", userSchema);
