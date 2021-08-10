const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

const linkedSchema = new mongoose.Schema({
    isFriend:Boolean,
    
})

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
    linked:
    [{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
        ,
        isFriend:{
            type:Boolean
        },
        messages:[{
            message:String,
            date:Date
        }]
    }]
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User',userSchema)
