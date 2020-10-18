'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    modelName: 'Student',
    freezeTableName: true
  });
  Student.associate = function(models) {
    // Student.hasMany(models.Hobby, { foreignKey: { name:'studentId', allowNull: false }});
    Student.hasMany(models.Hobby, { foreignKey: { name: 'studentId' } });
  };
  return Student;
};
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Student extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Student.init({
//     firstName: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Student',
//     freezeTableName: true
//   });
//   Student.associate = function(models) {    
//     Student.hasMany(models.Hobby, { foreignKey: { name: 'studentId' } });
//   };
//   return Student;
// };