'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leaf extends Model {
    static associate(models) {
      Leaf.belongsTo(models.Branch, {
        constraints: true,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'branchId',
          allowNull: false
        }
      });
      Leaf.hasMany(models.LeafRecord, {
        foreignKey: {
          name: 'leafId'
        }
      });
    }
  };
  Leaf.init({
    name: DataTypes.STRING,
    translation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Leaf',
    freezeTableName: true,
  });
  return Leaf;
};