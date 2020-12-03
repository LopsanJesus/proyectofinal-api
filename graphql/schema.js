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

    type Tree {
        id: Int!
        name: String!
        owner: User!
        sourceLang: Language!
        targetLang: Language!
    }

    type ImportedTree {
        id: Int!
        customName: String!
        treeId: Tree!
        userId: User!
    }

    type Query {
        # getLanguage(code: String!): Language!
        # getAllLanguages: [Language!]!
        # getUser(id: Int!): User
        getMe: User
        # getAllUsers: [User!]!
        getMyForest: [ImportedTree!]!
    }

    type Mutation {
        # createLanguage(code: String!, name: String!): Language!
        # createUser(name: String!, email: String!, password: String!): User!
        register(name: String, email: String!, password: String!): User!
        login (email: String!, password: String!): AuthPayload!
    }
    
`;

module.exports = typeDefs