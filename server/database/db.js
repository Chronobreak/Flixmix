const mysql = require("mysql");

const config = {
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "bd0716b7938c2c",
  password: "63e9914e",
  database: "heroku_69ec92a76fd7e58"
};


const handleDisconnect = () => {
  const connection = mysql.createConnection(config); 
  connection.connect(function(err) {
    if (err) {
      console.log("error when connecting to db")
      setTimeout(() => handleDisconnect2, 6000); 
    } 
  });
  connection.on("error", function(err) {
    console.log("db error, trying to reconnect");
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); 
    } else {
      throw err; 
    }
  });
  return connection;
}

const handleDisconnect2 = () => {
  const connection = mysql.createConnection(config); 
  connection.connect(function(err) {
    if (err) {
      console.log("error when connecting to db2")
      setTimeout(handleDisconnect, 6000); 
    } 
  });
  connection.on("error", function(err) {
    console.log("db error, trying to reconnect");
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); 
    } else {
      throw err; 
    }
  });
  return connection;
}
handleDisconnect();

exports.connection = handleDisconnect();


