var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        person(id: Int!): Person
    },
    type Person {
      id: Int
      name: String
      email: String
    }
`);


// Root resolver
var root = {
    person: getPerson
  };

var app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

module.exports = app;