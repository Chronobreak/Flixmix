const mysql = require("mysql");
const config = require("../../config/config.js").dbConfig;
const dbConfig = {
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: '3306'
};


const pool = mysql.createPool(dbConfig);

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) console.log(error);
  console.log('The solution is: ', results[0].solution);
});


exports.pool = pool;


