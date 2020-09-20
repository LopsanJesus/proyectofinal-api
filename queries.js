const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'ysdfrklyjigiph', 
    host: 'ec2-54-217-236-206.eu-west-1.compute.amazonaws.com', 
    database: 'd5thoeukc04mjn', 
    password: '5daddfc91d3e8950ce1b90435ef188e2e0b0ef690561f8ea55eeae7787a2874c',
    port: 5432 
});