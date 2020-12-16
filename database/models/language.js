'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate(models) {
      Language.hasMany(models.Tree, {
        foreignKey: {
          name: 'sourceLang'
        }
      });
      Language.hasMany(models.Tree, {
        foreignKey: {
          name: 'targetLang'
        }
      });
    }
  };
  Language.init({
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Language',
    freezeTableName: true,
  });
  return Language;
};