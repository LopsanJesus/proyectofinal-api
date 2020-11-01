'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leaf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Leaf.init({
    name: DataTypes.STRING,
    translation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Leaf',
  });
  return Leaf;
};