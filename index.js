const {server, connectDB} = require('./app')

const PORT = process.env.PORT || 3001;

connectDB();

server
    .listen({port:PORT})
    .then(()=>{console.log(`Sever running on port ${PORT}`)})
    .catch((error)=>console.log('Could not start server', error))