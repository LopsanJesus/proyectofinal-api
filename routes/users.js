var express = require('express');
var router = express.Router();
//const a = require('../database/models/user.js');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://treelang:treelang@127.0.0.1:5432/treelang') // Example for postgres

const User = require("../database/models/user.js")(sequelize, Sequelize);
//const Tutorial = db.users;
//var pool = require('../queries');

// const Pool = require('pg').Pool;
// const pool = new Pool({
//     user: 'ysdfrklyjigiph', 
//     host: 'ec2-54-217-236-206.eu-west-1.compute.amazonaws.com', 
//     database: 'd5thoeukc04mjn', 
//     password: '5daddfc91d3e8950ce1b90435ef188e2e0b0ef690561f8ea55eeae7787a2874c',
//     port: 5432 
// });

/* GET users listing. */
router.get('/', function(req, res, next) {
//   pool.query('SELECT nombre FROM Users;', (error,result) => {
//     if(error){
//       throw error
//     }
//     res.status(200).json(result.rows);
//   })
User.findAll()
    .then((users)=>{
        res.status(200).json(users[0].name);
    })
    .catch((err)=>{
        console.log(err);
    });
});


// //User.create({ name: 'Jazus', email: 'jazus@jazus.com'});
// const users = User.findAll()
//     .then(()=>{
//         console.log(users);
//         res.status(200).json(result.rows);
//     })
//     .catch(()=>{
//         console.log("Error");
//     });

module.exports = router;
