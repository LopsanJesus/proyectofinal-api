const bcrypt = require('bcryptjs')
const models = require('./database/models')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

const resolvers = {
    Query: {
        async getLanguage(root, { code }) {
            return models.Language.findOne({ where: { code: code } })
        },
        async getAllLanguages(root, args) {
            return models.Language.findAll()
        },
        async getUser(root, { id }) {
            return models.User.findOne({ where: { id: id } });
        },
        async getMe(_, args, { user }) {
            if (!user) throw new Error('You are not authenticated')
            return await models.User.findByPk(user.id)
        },
        async getAllUsers(root, args, { user }) {
            try {
                if (!user) throw new Error('You are not authenticated!')
                return models.User.findAll()
            } catch (error) {
                throw new Error(error.message)
            }
        }
        // async getHobby(root, { id }) {
        //     return models.Hobby.findByPk(id)
        // }
    },
    Mutation: {
        async createLanguage(root, { code, name }) {
            return models.Language.create({
                code,
                name
            })
        },
        async createUser(root, { name, email, password }) {
            return models.User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            })
        },
        async registerUser(root, { name, email, password }) {
            try {
                const user = await models.User.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10)
                })
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
                    { expiresIn: '1d' }
                )
                return {
                    token, user
                }
            } catch (error) {
                throw new Error(error.message)
            }
        }
        // async createHobby(root, { studentId, title }) {
        //     return models.Hobby.create({ studentId, title })
        // }
    },
    // Language: {
    //     async hobbies(hobby) {
    //         return hobby.getHobbies()
    //     }
    // },
    // Hobby: {
    //     async student(student) {
    //         return student.getStudent()
    //     }
    // }
}

module.exports = resolvers;