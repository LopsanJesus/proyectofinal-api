const bcrypt = require('bcryptjs')
const models = require('../database/models')
const jsonwebtoken = require('jsonwebtoken')
const { Op } = require("sequelize");
require('dotenv').config()

const resolvers = {
    Query: {
        // async getLanguage(_, { code }) {
        //     return models.Language.findOne({ where: { code: code } })
        // },
        async getAllLanguages(_, args) {
            return models.Language.findAll()
        },
        // async getUser(_, { id }) {
        //     return models.User.findOne({ where: { id: id } });
        // },
        async getMe(_, args, { loggedUser }) {
            if (!loggedUser) throw new Error('You are not authenticated')
            return await models.User.findByPk(loggedUser.id)
        },
        // async getAllUsers(root, args, { user }) {
        //     try {
        //         if (!user) throw new Error('You are not authenticated!')
        //         return models.User.findAll()
        //     } catch (error) {
        //         console.log(error);
        //         throw new Error(error.message)
        //     }
        // },
        async getMyForest(_, args, { loggedUser }) {
            try {
                if (!loggedUser) throw new Error('You are not authenticated!')
                // console.log("\n\n**********************************");
                // console.log(loggedUser.name);
                // console.log("\n\n**********************************");
                return models.ImportedTree.findAll({ where: { userId: loggedUser.id } })
                // console.log("***MODELO***");
                // console.log(modelo)
                //return modelo
            } catch (error) {
                // console.log(error);
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
                console.log(id);
                const modelo = models.Tree.findByPk(id);
                console.log(await modelo)
                return modelo
            } catch (error) {
                throw new Error(error.message)
            }
        },
    },
    Mutation: {
        // async createLanguage(root, { code, name }) {
        //     return models.Language.create({
        //         code,
        //         name
        //     })
        // },
        // async createUser(_, { name, email, password }) {
        //     return models.User.create({
        //         name,
        //         email,
        //         password: await bcrypt.hash(password, 10)
        //     })
        // },
        async register(_, { name, email, password }) {
            try {
                const user = await models.User.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10)
                })
                // const token = jsonwebtoken.sign(
                //     { id: user.id, email: user.email },
                //     process.env.JWT_SECRET,
                //     { expiresIn: '1y' }
                // )
                return user
                // /*token,*/ user

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

                const sourceLangId = await models.Tree.findByPk(sourceLang);
                const targetLangId = await models.Tree.findByPk(targetLang);

                const tree = await models.Tree.create({
                    name: name,
                    owner: loggedUser.id,
                    sourceLang: sourceLangId.id,
                    targetLang: targetLangId.id
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
        }
        // async createHobby(root, { studentId, title }) {
        //     return models.Hobby.create({ studentId, title })
        // }
    },
    ImportedTree: {
        async treeId(treeId) {
            // console.log(treeId)
            //console.log(await treeId.getTree())
            return treeId.getTree()
        },
        async userId(userId) {
            return userId.getUser()
        },
    },
    Tree: {
        async owner(userId) {
            //console.log(userId)
            return userId.getUser()
        },
        async sourceLang(languageId) {
            // console.log("****SOURCE******")
            //console.log("****************" + languageId.dataValues.sourceLang)
            return models.Language.findOne({ where: { id: languageId.dataValues.sourceLang } })
        },
        async targetLang(languageId) {
            // console.log("****TARGET******")
            // console.log(d)
            return models.Language.findOne({ where: { id: languageId.dataValues.targetLang } })
        },
        async branches(tree) {
            // console.log("****TARGET******")
            // console.log(d)
            //return models.Language.findOne({ where: { id: languageId.dataValues.targetLang } })
            return tree.getBranches()
        },
        async importedBy(treeId) {
            //console.log(await treeId.getImportedTrees())
            return treeId.getImportedTrees()
        },
    },
    Branch: {
        async numberOfLeaves(branchId) {
            //console.log(await branchId.getLeafs().length)
            const { count } = await models.Leaf.findAndCountAll({ where: { branchId: branchId.id } });
            // console.log("***************************\n" + await count + "\n*****************************");
            // console.log("***************************\n" + await rows + "\n*****************************");
            // console.log(count)
            return count
            //return models.Leaf.findAndCountAll({ where: { branchId: branchId } }).count
        },
        async numberOfApples(branchId) {
            //const { count } = await models.Leaf.findAndCountAll({ where: { branchId: branchId.id } });
            return 0
        },
    }
    // Hobby: {
    //     async student(student) {
    //         return student.getStudent()
    //     }
    // }
}

module.exports = resolvers;