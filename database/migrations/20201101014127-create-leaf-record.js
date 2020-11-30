'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LeafRecord', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attempts: {
        type: Sequelize.INTEGER
      },
      hits: {
        type: Sequelize.INTEGER
      },
      isApple: {
        type: Sequelize.BOOLEAN
      },
      importedTreeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ImportedTree',
          key: 'id'
        },
      },
      leafId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Leaf',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LeafRecord');
  }
};