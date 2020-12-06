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
        branches: [Branch!]
        importedBy: [ImportedTree!]
    }

    type ImportedTree {
        id: Int!
        customName: String!
        treeId: Tree!
        userId: User!
    }

    type Branch {
        id: Int!
        name: String!
        numberOfLeaves: Int!
        numberOfApples: Int!
    }

    type Leaf {
        id: Int!
        name: String!
        translation: String!
    }

    type Test {
        id: Int!
        numberOfLeaves: Int!
        score: Int!
    }

    type Query {
        # getLanguage(code: String!): Language!
        getAllLanguages: [Language!]!
        # getUser(id: Int!): User
        getMe: User
        # getAllUsers: [User!]!
        getMyForest: [ImportedTree!]!
        getAllTrees: [Tree!]!
        getTree(id: Int!): Tree!
    }

    type Mutation {
        # createLanguage(code: String!, name: String!): Language!
        # createUser(name: String!, email: String!, password: String!): User!
        register (name: String!, email: String!, password: String!): User!
        login (email: String!, password: String!): AuthPayload!
        importTree (id: Int!): ImportedTree!
        createTree (name: String!, sourceLang: Int!, targetLang: Int!): Tree!
    }
    
`;

module.exports = typeDefs