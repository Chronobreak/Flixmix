const mysql = require("mysql");
const config = require("../../config/config.js");
const dbConfig = {
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DATABASE,
  port: '3306'
};


const pool = mysql.createPool(dbConfig);

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) console.log(error);
  console.log('The solution is: ', results[0].solution);
});


exports.pool = pool;


