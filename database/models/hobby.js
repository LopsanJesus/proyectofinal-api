'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hobby = sequelize.define('Hobby', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    modelName: 'Hobby',
    freezeTableName: true
  });
  Hobby.associate = function(models) {
    Hobby.belongsTo(models.Student, { constraints: true,
      onDelete: 'CASCADE', foreignKey: {name: 'studentId', allowNull: false} });
  };
  return Hobby;
};

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Hobby extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Hobby.init({
//     title: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Hobby',
//     freezeTableName: true,
//   });
//   Hobby.associate = function(models) {
//     Hobby.belongsTo(models.Student, { constraints: true,
//       onDelete: 'CASCADE', foreignKey: {name: 'studentId', allowNull: false} });
//   };
//   return Hobby;
// };