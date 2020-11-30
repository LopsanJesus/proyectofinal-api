'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    static associate(models) {
      Test.belongsTo(models.ImportedTree, {
        constraints: true,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'importedTreeId',
          allowNull: false
        }
      });
    }
  };
  Test.init({
    numberOfLeaves: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Test',
    freezeTableName: true,
  });
  return Test;
};