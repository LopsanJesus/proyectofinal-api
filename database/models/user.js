'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Tree, {
        foreignKey: {
          name: 'owner'
        }
      });
      User.hasMany(models.ImportedTree, {
        foreignKey: {
          name: 'userId'
        }
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
  });
  return User;
};