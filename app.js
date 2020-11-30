const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers')
const models = require('./database/models');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { JWT_SECRET } = process.env

const getUser = token => {
    try {
        if (token) {
            return jwt.verify(token, JWT_SECRET)
        }
        return null
    } catch (error) {
        return null
    }
}

const server = new ApolloServer({
    typeDefs, resolvers, context: (({ req }) => {
        const token = req.get('Authorization') || ''
        return { loggedUser: getUser(token.replace('Bearer', '')) }
    })
});

const app = express();

var indexRouter = require('./routes/index');

var path = require('path');
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

server.applyMiddleware({ app });
// models.sequelize.authenticate();
// models.sequelize.sync();

module.exports = app;