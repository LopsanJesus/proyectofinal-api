const resolvers = {
    Query: {
        async getStudent(root, { id }, { models }) {
            return models.Student.findByPk(id)
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