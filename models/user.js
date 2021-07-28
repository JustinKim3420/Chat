const mongoose = require('mongoose')

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
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    messages:[{
        type:String,
        date:Date,
        to:mongoose.ObjectId
    }]
})

userSchema.plugin(uniqueValidator)

module.exports=