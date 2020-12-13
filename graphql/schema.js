const { gql } = require('apollo-server-express');

const typeDefs =
    gql`
    scalar Date

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
        leaves: [Leaf!]!
    }

    type Leaf {
        id: Int!
        name: String!
        translation: String!
        branchId: Branch!
        leafRecords: [LeafRecord!]!
    }

    type LeafRecord {
        id: Int!
        attempts: Int!
        hits: Int!
        isApple: Boolean!
        importedTree: ImportedTree!
        leafId: Leaf!
    }

    type Test {
        id: Int!
        numberOfLeaves: Int!
        score: Int!
        createdAt: Date!
        importedTree: ImportedTree!
    }

    type Query {
        getAllLanguages: [Language!]!
        getMe: User
        getMyForest: [ImportedTree!]!
        getAllTrees: [Tree!]!
        getTree(id: Int!): Tree!
        getBranch(id: Int!): Branch!
        getMyHistory: [Test!]!
    }

    type Mutation {
        register (name: String!, email: String!, password: String!): User!
        login (email: String!, password: String!): AuthPayload!
        importTree (id: Int!): ImportedTree!
        createTree (name: String!, sourceLang: Int!, targetLang: Int!): Tree!
        createBranch (tree: Int!, name: String!, names: [String!]!, translations: [String!]!): Int!
        recordTest (score: Int!, numberOfLeaves: Int!, names: [String!]!, hits: [String!]!, importedTreeId: Int!): Int!
    }
    
`;

module.exports = typeDefs