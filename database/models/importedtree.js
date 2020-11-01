'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImportedTree extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ImportedTree.init({
    customName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ImportedTree',
  });
  return ImportedTree;
};