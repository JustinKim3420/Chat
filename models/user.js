const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    linked:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        isFriend:{
            type:Boolean
        },
        messages:[{
            type:String,
            date:Date
        }]
    }]
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User',userSchema)

module.exports= User;