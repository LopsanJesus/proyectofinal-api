const { gql } = require('apollo-server-express');

const typeDefs =

    gql`
    type Language {
        id: Int!
        code: String!
        name: String!
    }

    type User {
        id: Int!
        name: String!
        email: String!
        password: String!
    }
    
    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        getLanguage(code: String!): Language!
        getAllLanguages: [Language!]!
        getUser(id: Int!): User
        getAllUsers: [User!]!
        getMe: User
    }

    type Mutation {
        createLanguage(code: String!, name: String!): Language!
        createUser(name: String!, email: String!, password: String!): User!
        registerUser(name: String, email: String!, password: String!): AuthPayload!
        login (email: String!, password: String!): AuthPayload!
    }
    
`;

module.exports = typeDefs