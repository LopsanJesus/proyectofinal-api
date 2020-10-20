const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers')
const models = require('./database/models');

const server = new ApolloServer({ typeDefs, resolvers, context: { models } });
const app = express();

var indexRouter = require('./routes/index');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

server.applyMiddleware({ app });
models.sequelize.authenticate();
models.sequelize.sync();

module.exports = app;