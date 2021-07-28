const bcrypt = require('bcrypt')
const User = require('./models/user')

export const createUser = async (username, password, email)=>{
    const saltRounds = 10;

    const hashedPassword =await bcrypt.hash(password, saltRounds)
    const newUser = new User({
        username:username,
        password:hashedPassword,
        email:email
    })
    return newUser.save()
}

export const login = async (username,password)=>{
    
}