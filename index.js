const {connectDB,
    typeDefs,
    resolvers,
    startApolloServer} = require("./app");

const PORT = process.env.PORT || 4000;

connectDB();

startApolloServer(typeDefs, resolvers)