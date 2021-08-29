const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { GraphQLScalarType, Kind } = require("graphql");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/user");
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
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((error) => {
      console.log("Could not connect to MongoDB", error);
    });
};

const authenticateUser = async (request) => {
  //Everytime a request is sent, it checks the header for jwt
  //If the token exists and is in the correct format, returns an object with the username and sets as context
  const auth = request ? request.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
    const currentUser = await User.findOne({ username: decodedToken.username });
    return { currentUser };
  }
};

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom Date scalar type",
  serialize: (value) => value.getTime(),
  parseValue: (value) => new Date(value),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

const typeDefs = gql`
  scalar Date

  type Message {
    sentUser:User
    message: String!
    date: Date
  }

  type LinkedUser {
    user: User!
    isFriend: Boolean!
    messages: [Message!]!
  }

  type User {
    username: String!
    email: String!
    linked: [LinkedUser!]
    _id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allUsers: [User!]!
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!, email: String!): User
    addFriend(friendUsername: String!): User!
    deleteFriend(friendUsername:String!):User!
    login(username: String!, password: String!): Token
    sendMessage(message:String!,friendUsername:String!):Message!
  }
`;

const resolvers = {
  Date: dateScalar,
  Query: {
    allUsers: () => User.find({}).populate("user"),
    me: async (root, args, context) => {
      const currentUser = await User.findOne({
        username: context.currentUser.username,
      }).populate({
        path:'linked',
        populate:{
          path:'user',
          model:'User'
        }
      });
      return currentUser;
    },
  },

  Mutation: {
    addUser: (roots, args) => {
      if (args.username) {
        const existingUser = User.findOne({ username: args.username });
        if (!existingUser) {
          throw new UserInputError("User already exists");
        }
      }
      if (args.email) {
        const existingEmail = User.findOne({ email: args.email });
        if (!existingEmail) {
          throw new UserInputError("Email is already in use");
        }
      }
      const { addUser } = require("./resolvers/mutations");
      return addUser(args.username, args.password, args.email);
    },
    addFriend: (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError("Invalid token");
      }
      const {addFriend} = require('./resolvers/mutations')
      return addFriend(context.currentUser.username, args.friendUsername)
    },
    deleteFriend:(root, args, context)=>{
      if(!context.currentUser){
        throw new UserInputError('Invalid token')
      }
      const {deleteFriend} = require('./resolvers/mutations')
      return deleteFriend(context.currentUser.username, args.friendUsername)
    },
    login: (root, args) => {
      if (!args.username) {
        throw new UserInputError("Invalid username");
      }
      if (!args.password) {
        throw new UserInputError("Invalid password");
      }
      const { login } = require("./resolvers/mutations");
      return login(args.username, args.password);
    },
    sendMessage:(root,args,context)=>{
      if(!context.currentUser){
        throw new UserInputError('Invalid token')
      }
      const {sendMessage} = require('./resolvers/mutations')
      return sendMessage(context.currentUser.username, args.message, args.friendUsername)
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return await authenticateUser(req);
  },
});

module.exports = {
  connectDB,
  server,
};
