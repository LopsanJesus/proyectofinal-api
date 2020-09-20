var express = require('express');
var router = express.Router();
//var pool = require('../queries');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'ysdfrklyjigiph', 
    host: 'ec2-54-217-236-206.eu-west-1.compute.amazonaws.com', 
    database: 'd5thoeukc04mjn', 
    password: '5daddfc91d3e8950ce1b90435ef188e2e0b0ef690561f8ea55eeae7787a2874c',
    port: 5432 
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.query('SELECT nombre FROM prueba2;', (error,result) => {
    if(error){
      throw error
    }
    res.status(200).json(result.rows);
  })
  
});

module.exports = router;
