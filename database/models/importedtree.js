'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImportedTree extends Model {
    static associate(models) {
      ImportedTree.belongsTo(models.Tree, {
        constraints: true,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'treeId',
          allowNull: false
        }
      });
      ImportedTree.belongsTo(models.User, {
        constraints: true,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });
      ImportedTree.hasMany(models.LeafRecord, {
        foreignKey: {
          name: 'importedTreeId'
        }
      });
      ImportedTree.hasMany(models.Test, {
        foreignKey: {
          name: 'importedTreeId'
        }
      });
    }
  };
  ImportedTree.init({
    customName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ImportedTree',
    freezeTableName: true,
  });
  return ImportedTree;
};