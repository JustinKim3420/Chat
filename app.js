const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

require("dontenv").config();

const connectDB = () => {
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

const typeDef = gql`

`

const resolvers ={

}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


module.exports={
    connectDB,
    server
}