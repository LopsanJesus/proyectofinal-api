'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tree extends Model {
    static associate(models) {
      Tree.hasMany(models.Branch, {
        foreignKey: {
          name: 'treeId'
        }
      });
      Tree.hasMany(models.ImportedTree, {
        foreignKey: {
          name: 'treeId'
        }
      });
      Tree.belongsTo(models.Language, {
        constraints: true,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'sourceLang',
          allowNull: false
        }
      });
      Tree.belongsTo(models.Language, {
        constraints: true,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'targetLang',
          allowNull: false
        }
      });
      Tree.belongsTo(models.User, {
        constraints: true,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'owner',
          allowNull: false
        }
      });
    }
  };
  Tree.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tree',
    freezeTableName: true,
  });
  return Tree;
};