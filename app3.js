require('dotenv').config()
//var logger = require('morgan');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
//const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./database/models');

//import express from 'express';
//import bodyParser from 'body-parser';
// import { graphqlExpress } from 'apollo-server-express';

//const myGraphQLSchema = // ... define or import your schema here!
//const PORT = 3000;

const app = express();

// const server = new ApolloServer({ 
//   typeDefs, 
//   resolvers, 
//   context: { models }
// });

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: { models }
});

// bodyParser is needed just for POST.
app.use('/graphql', express.json(), server);
// graphqlExpress({ schema: myGraphQLSchema })

//app.listen(PORT);

//models.sequelize.authenticate();
//models.sequelize.sync();


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


// server
//   .listen()
//   .then(({ url }) => console.log('Server is running on ' + url))

module.exports = app;