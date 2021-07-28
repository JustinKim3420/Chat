const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const User = require('./models/user')

require("dotenv").config();

//Creating function to connect to my mongoDB
const connectDB = () => {
  //connecting to mongoDB and setting options
  mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(()=>{
      console.log('Successfully connected to MongoDB')
  })
  .catch((error)=>{
      console.log('Could not connect to MongoDB',error)
  })
};

const typeDefs = gql`
  type User{
    username:String!
    email:String!
    friends:[String!]!
    _id:ID!
  }

  type Token{
    value:String!
  }

  type Query{
    userCount: Int!
  }

  type Mutation{
    createUser(
      username:String!
      password:String!
      email:String!
    ):User
    login(username:String!
      password:String!):Token
  }
`

const resolvers ={
  Query:{
    userCount: ()=>User.collection.countDocuments(),
  },

  Mutation:{
    createUser:(roots,args)=>{ 
      if(args.username){
        const existingUser = User.findOne({username:args.username})
        if(!existingUser){
          throw new UserInputError('User already exists')
        }
      }
      if(args.email){
        const existingEmail = User.findOne({email:args.email})
        if(!existingEmail){
          throw new UserInputError('Email is already in use')
        }
      }
      const createUser = require('./resolver/mutations')
      createUser(args.username,args.password,args.email)
    },
    login: (root, args)=>{
      
    }
  }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


module.exports={
    connectDB,
    server
}