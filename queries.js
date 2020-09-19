const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'ltarrbliehoikx', 
    host: 'ec2-46-137-156-205.eu-west-1.compute.amazonaws.com', 
    database: 'ddi3lnaobbpnta', 
    password: '0afe44e24e605694f3efc7c30ba8e5f5669821090736d226a4f56eabaf0ac279',
    port: 5432 
});