const mysql = require("mysql");
const config = require("../../config/config.js");
const dbConfig = {
  host: config.dbConfig.host,
  user: config.dbConfig.user,
  password: config.dbConfig.password,
  database: config.dbConfig.database,
  connectionLimit: 10
};


const pool = mysql.createPool({dbConfig});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


exports.pool = pool;


