const bcrypt = require('bcryptjs')
const models = require('../database/models')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    }),
    Query: {
        async getAllLanguages(_, args) {
            return models.Language.findAll()
        },
        async getMe(_, args, { loggedUser }) {
            if (!loggedUser) throw new Error('You are not authenticated')
            return await models.User.findByPk(loggedUser.id)
        },
        async getMyForest(_, args, { loggedUser }) {
            try {
                if (!loggedUser) throw new Error('You are not authenticated!')
                return models.ImportedTree.findAll({ where: { userId: loggedUser.id } })
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async getAllTrees() {
            try {
                return models.Tree.findAll();
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async getTree(_, { id }) {
            try {
                return models.Tree.findByPk(id)
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async getBranch(_, { id }) {
            try {
                return modelo = models.Branch.findByPk(id);
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async getMyHistory(_, args, { loggedUser }) {
            try {
                if (!loggedUser) throw new Error('You are not authenticated!')

                const importedTrees = await models.ImportedTree.findAll({ where: { userId: loggedUser.id } })
                const tests = await models.Test.findAll({ order: [['createdAt', 'DESC']] });
                var history = [];

                importedTrees.map((importedTree) => {
                    tests.map((test) => {
                        if (test.importedTreeId === importedTree.id)
                            history = [...history, test];
                    })
                })
                return history;
            } catch (error) {
                throw new Error(error.message)
            }
        }
    },
    Mutation: {
        async register(_, { name, email, password }) {
            try {
                const user = await models.User.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10)
                })
                return user
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async login(_, { email, password }) {
            try {
                const user = await models.User.findOne({ where: { email } })
                if (!user) {
                    throw new Error('El par email/password no existe.')
                }
                const isValid = await bcrypt.compare(password, user.password)
                if (!isValid) {
                    throw new Error('El par email/password no existe.')
                }
                const token = jsonwebtoken.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1y' }
                )
                return {
                    token, user
                }
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async importTree(_, { id }, { loggedUser }) {
            try {
                if (!loggedUser)
                    throw new Error('You are not authenticated!');

                return models.Tree.findByPk(id).then((res) => {
                    return models.ImportedTree.create({
                        customName: res.name,
                        treeId: res.id,
                        userId: loggedUser.id
                    });
                });

            } catch (error) {
                throw new Error(error.message)
            }
        },
        async createTree(_, { name, sourceLang, targetLang }, { loggedUser }) {
            try {
                if (!loggedUser)
                    throw new Error('You are not authenticated!');

                if (sourceLang == targetLang)
                    throw new Error('SourceLang and TargetLang are equal!');

                const tree = await models.Tree.create({
                    name: name,
                    owner: loggedUser.id,
                    sourceLang: sourceLang,
                    targetLang: targetLang
                });

                await models.ImportedTree.create({
                    customName: name,
                    treeId: tree.id,
                    userId: loggedUser.id
                });

                return tree;

            } catch (error) {
                throw new Error(error.message)
            }
        },
        async createBranch(_, { tree, name, names, translations }, { loggedUser }) {
            try {
                if (!loggedUser)
                    throw new Error('You are not authenticated!');

                const branch = await models.Branch.create({
                    name: name,
                    treeId: tree
                });

                var leafs = [];
                names.map((element, index) => {
                    leafs[index] = {
                        branchId: branch.id,
                        name: element,
                        translation: translations[index]
                    }
                })

                var insertsLength = -1;
                models.Leaf.bulkCreate(leafs)
                    .then((inserts) => { insertsLength = inserts.length; })
                    .catch((err) => {
                        console.log("Error inserting leaves");
                        console.log(err);
                    });
                return insertsLength;

            } catch (error) {
                throw new Error(error.message)
            }
        },
        async recordTest(_, { score, numberOfLeaves, names, hits, importedTreeId }, { loggedUser }) {
            try {
                if (!loggedUser)
                    throw new Error('You are not authenticated!');

                await models.Test.create({
                    numberOfLeaves: numberOfLeaves,
                    score: score,
                    importedTreeId: importedTreeId
                });

                names.map(async (element, index) => {
                    const leaf = await models.Leaf.findOne({ where: { name: element } });
                    const leafRecord = await models.LeafRecord.findOne({ where: { leafId: leaf.id } });
                    if (!leafRecord) {
                        models.LeafRecord.create({
                            attempts: 1,
                            hits: hits[index] === "correct" ? 1 : 0,
                            isApple: false,
                            importedTreeId: importedTreeId,
                            leafId: leaf.id
                        });
                    } else {
                        leafRecord.attempts += 1;
                        leafRecord.hits = hits[index] === "correct" ? leafRecord.hits + 1 : leafRecord.hits;
                        leafRecord.isApple = leafRecord.hits > 1 ? true : false;
                        await leafRecord.save();
                    }
                    return leafRecord;
                })
                return 0;

            } catch (error) {
                throw new Error(error.message)
            }
        }
    },
    ImportedTree: {
        async treeId(treeId) {
            return treeId.getTree()
        },
        async userId(userId) {
            return userId.getUser()
        },
    },
    Tree: {
        async owner(userId) {
            return userId.getUser()
        },
        async sourceLang(languageId) {
            return models.Language.findOne({ where: { id: languageId.dataValues.sourceLang } })
        },
        async targetLang(languageId) {
            return models.Language.findOne({ where: { id: languageId.dataValues.targetLang } })
        },
        async branches(tree) {
            return tree.getBranches()
        },
        async importedBy(treeId) {
            return treeId.getImportedTrees()
        },
    },
    Branch: {
        async leaves(branch) {
            return branch.getLeafs()
        },
    },
    Leaf: {
        async leafRecords(leaf) {
            return leaf.getLeafRecords()
        }
    },
    LeafRecord: {
        async importedTree(leafRecord) {
            return leafRecord.getImportedTree()
        },
        async leafId(leafRecord) {
            return leafRecord.getLeaf()
        },
    },
    Test: {
        async importedTree(test) {
            return test.getImportedTree()
        }
    }
}

module.exports = resolvers;