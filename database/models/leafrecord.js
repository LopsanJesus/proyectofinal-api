'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeafRecord extends Model {
    static associate(models) {
      LeafRecord.belongsTo(models.ImportedTree, {
        constraints: true,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'importedTreeId',
          allowNull: false
        }
      });
      LeafRecord.belongsTo(models.Leaf, {
        constraints: true,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'leafId',
          allowNull: false
        }
      });
    }
  };
  LeafRecord.init({
    attempts: DataTypes.INTEGER,
    hits: DataTypes.INTEGER,
    isApple: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'LeafRecord',
    freezeTableName: true,
  });
  return LeafRecord;
};