const db = require('../database/db.js').pool;
const userController = require('../models/users.js');

module.exports = {
  checkUserCredentials: (req, res) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.log('there was an error getting a connection from the pool', err);
      } else {
        let {username, password} = req.body;
        connection.query('SELECT users_id, username, password FROM users WHERE username = ? AND password = ?', [username, password] ,(err, data) => {
          connection.release();
          if (err) {
            console.log(err)
          } else {
            res.send(data)
          }
        }) 
      }
    })
  },
  signup: (req, res) => {
    let {username, password} = req.body; 
    console.log('signing up user to DB', username, password) 
    db.getConnection((err, connection) => {
      if (err) {
        console.log('there was an error getting a connection from the pool', err);
      } else {
        connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, data) => {
          connection.release();
          if (err) {
            console.log(err)
          } else {
            res.send(data)
          }
        })
      }
    })
  }
}
