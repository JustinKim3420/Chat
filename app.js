const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

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
    login:Token
  }
`

const resolvers ={
  Query:{
    userCount: ()=>3
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