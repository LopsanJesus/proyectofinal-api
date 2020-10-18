// resolvers.js
const resolvers = {
    Query: {
        async getStudent(root, { id }, { models }) {
            //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            return models.Student.findByPk(id)
            // return {
            //     id: 10,
            //     firstName: "Jesus",
            //     email: "jesus@jesus.com"
            // }
        },
        async getAllStudents(root, args, { models }) {
            return models.Student.findAll()
        },
        async getHobby(root, { id }, { models }) {
            return models.Hobby.findByPk(id)
        }
    },
    Mutation: {
        async createStudent(root, { firstName, email }, { models }) {
            console.log("Entra");
            return models.Student.create({
                firstName,
                email
            })
        },
        async createHobby(root, { studentId, title }, { models }) {
            return models.Hobby.create({ studentId, title })
        }
    },
    Student: {
        async hobbies(hobby) {
            return hobby.getHobbies()
        }
    },
    Hobby: {
        async student(student) {
            return student.getStudent()
        }
    }
}

module.exports = resolvers;