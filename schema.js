const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Student {
        id: Int!
        firstName: String!
        email: String!
        hobbies: [Hobby!]!
    }

    type Hobby {
        id: Int!
        title: String!
        student: Student!
    }

    type Query {
        getStudent(id: Int!): Student
        getAllStudents: [Student!]!
        getHobby(id: Int!): Hobby
    }

    type Mutation {
        createStudent( firstName: String!, email: String!): Student!
        createHobby( studentId: Int!, title: String!): Hobby!
    }`;

module.exports = typeDefs