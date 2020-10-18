

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://treelang:treelang@127.0.0.1:5432/treelang') // Example for postgres

const User = require("./database/models/user.js")(sequelize, Sequelize);

var coursesData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com'
    },
    {
        id: 2,
        name: 'John Doe',
        email: 'johndoe@gmail.com'
    }
]

var getCourse = function(args) { 
    var id = args.id;
    console.log(coursesData.filter(course => {
        return course.id == id;
    })[0]);
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}

var usersData = User.findAll()
    .then((users)=>{
        return users.filter(user => {return user.id == 3})[0].dataValues;
    })
    .catch((err)=>{
        console.log(err);
        return null;
    });

var getUser = (args) => {
    var id = args.id;
  
    User.findAll()
    .then((users)=>{
      console.log(users.filter(user => {return user.id == id})[0].dataValues);
        return users.filter(user => {return user.id == id})[0].dataValues;
    })
    .catch((err)=>{
        console.log(err);
        return null;
    });
    
  };

  var obtainUserFromSequelize = (param) => {
    return User.findAll({
      where: {
        id: param
      }
    });
  };

  obtainUserFromSequelize(4).then((result) => {
      console.log(result[0].dataValues);
  });
  console.log();


//   console.log(usersData);
//   usersData.then((values) => {
//     console.log(values);
//   });
//   console.log(usersData);

//   console.log("First:");
//   //console.log(getUser({id: 1}));
//   console.log("Second:");
  //console.log(getCourse({id: 1}));