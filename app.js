require('dotenv').config()
//var logger = require('morgan');
const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./database/models');

//models.sequelize.authenticate();
//models.sequelize.sync();

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: { models }
});
// tracing: true, cors: false, debug: true

// const port = 4040;
// const app = express();
//server.applyMiddleware({ app });

// models.Student.create({
//   firstName: "a",
//   email: "aa"
// }).then((r)=>{
//   console.log(r.id);
// });

// app.listen({ port }, () =>{
//   //console.log(process.cwd());
//   //console.log("El .env funciona: " + process.env.DEV_DATABASE_URL);
//   console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  
// });

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT || '4000');

server
  .listen({
    port: port,
  })
  .then(({ url }) => console.log('Server is running on ' + url))

//module.exports = app;