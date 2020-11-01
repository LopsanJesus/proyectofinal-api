'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeafRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LeafRecord.init({
    attempts: DataTypes.INTEGER,
    hits: DataTypes.INTEGER,
    isApple: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'LeafRecord',
  });
  return LeafRecord;
};