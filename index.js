const { server, connectDB } = require("./app");

const PORT = process.env.PORT || 4000;

connectDB();

server
  .listen({ port: PORT })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`Sever ready at ${url}`);
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
  })
  .catch((error) => console.log("Could not start server", error));
