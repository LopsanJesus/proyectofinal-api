module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Student',
    [
      {
        firstName: 'Jane',
        email: 'janedoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Jon',
        email: 'jondoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Student', null, {}),
};