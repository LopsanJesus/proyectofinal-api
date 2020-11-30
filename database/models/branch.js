'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    static associate(models) {
      Branch.hasMany(models.Leaf, {
        foreignKey: {
          name: 'branchId'
        }
      });
      Branch.belongsTo(models.Tree, {
        constraints: true,
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'treeId',
          allowNull: false
        }
      });
    }
  };
  Branch.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Branch',
    freezeTableName: true
  });
  return Branch;
};