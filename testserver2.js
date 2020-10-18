var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        user(id: Int!): User
        users(topic: String): [User]
    },
    type User {
        id: Int
        name: String
        email: String
    }
`);

var coursesData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com'
    },
    {
        id: 2,
        name: 'John Doe',
        email: 'johndoe@gmail.com'
    }
]

var getCourse = function(args) { 
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}

var getCourses = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}

var root = {
    user: getCourse,
    users: getCourses
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));