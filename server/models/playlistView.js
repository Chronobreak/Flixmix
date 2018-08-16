const db = require('../database/db.js').pool;

//takes in in playlist url and geths the playlist id
function fetchPlaylist(playlistUrl, callback) {
  db.getConnection((err, connection) => {
    if (err) {
      console.log('there was an error getting a connection from the pool', err);
    } else {
      connection.query('SELECT * FROM playlist WHERE url = ?', [playlistUrl], (err, results) => {
        connection.release();
        if (err) {
          callback(err, null)
        } else {
          callback(null, results)
        }
      }) 
    }
  })
}


//takes in playlist ids and returns all movies
function fetchPlaylistMovieIds(params, callback) {
  db.getConnection((err, connection) => {
    if (err) {
      console.log('there was an error getting a connection from the pool', err);
    } else {
      connection.query('SELECT movies.* FROM movies JOIN movies_playlists ON movies.movies_id = movies_playlists.movies_movies_id WHERE movies_playlists.playlist_playlist_id = ?', [params], (err, dbMovieIds) => {
        connection.release();
        if (err) {
          callback(err, null)
        } else {
          //response is reutrned as an array of "RowDataPacket { movies_movies_id: 342 }""
          // let movieIds = [];
          // for (let i = 0; i < dbMovieIds.length; i++) {
          //   movieIds.push(dbMovieIds[i].movies_movies_id);
          // }
          callback(null, dbMovieIds);
        }
      })
    }
  })
}


//takes in movie ids and returns the movies
function fetchMovies(params, callback) {
  db.getConnection((err, connection) => {
    if (err) {
      console.log('there was an error getting a connection from the pool', err);
    } else {
      connection.query('SELECT * from movies WHERE movies_id = (?)', [params], (err, results, fields) => {
        connection.release();
        if (err) {
          callback(err, null)
        } else {
          callback(null, results);
        }
      })
      
    }
  })
}


//add an entry to the watched table
function addWatched(params, callback) {
  db.getConnection((err, connection) => {
    if (err) {
      console.log('there was an error getting a connection from the pool', err);
    } else {
      let insert = {movies_movies_id: params.movieId, users_users_id: params.userId}
      connection.query('INSERT INTO watched set ?', insert, (err, response, fields) => {
        connection.release();
        if (err) {
          callback(err, null)
        } else {
          callback(null, err)
        }
      })
    }
  })
}

//return all watched movies for a given userid 
function haveWatched(params, callback) {
  db.getConnection((err, connection) => {
    if (err) {
      console.log('there was an error getting a connection from the pool', err);
    } else {
      connection.query('SELECT movies_movies_id FROM watched WHERE ?', params, (err, response, fields) => {
        connection.release();
        if (err) {
          callback(err)
        } else {
          let watchedMovieIds = {};
          response.forEach((movieId) => {
            watchedMovieIds[movieId.movies_movies_id] = movieId.movies_movies_id;
          })
          callback(null, watchedMovieIds)
        }
      })
    }
  })
}

function addMessage(params, callback) {
  db.getConnection((err, connection) => {
    if (err) {
      console.log('there was an error getting a connection from the pool', err);
    } else {
      let insert = {movies_movies_id: params.movieId, message: params.movieMessage, users_senderid: params.messageSenderId, users_receiverid: params.messageReceiverId};
      connection.query('INSERT INTO messages set ?', insert, (err, response, fields) => {
        connection.release();
        if (err) {
          callback(err)
        } else {
          callback(null, response)
        }
      })
    }
  })
}

function retrieveUsername(params, callback) {
  console.log('params on fetch username', params)
  db.getConnection((err, connection) => {
    if (err) {
      console.log('there was an error getting a connection from the pool', err);
    } else {
      connection.query('SELECT username FROM users WHERE ?', {users_id: params}, (err, response, fields) => {
        connection.release();
        if (err) {
          callback(err)
        } else {
          callback(null, response[0].username)
        }
      })
    }
  })
}

function retrieveAllMessages(callback) {
  db.getConnection((err, connection) => {
    if (err) {
      console.log('there was an error getting a connection from the pool', err);
    } else {
      connection.query('SELECT * FROM messages', (err, response, fields) => {
        connection.release();
        if (err) {
          callback(err)
        } else {
          callback(null, response)
        }
    
      })
    }
  })
}

function messagesSentBy(params, callback) {
  db.getConnection((err, connection) => {
    if (err) {
      console.log('there was an error getting a connection from the pool', err);
    } else {
      connection.query('SELECT * FROM messages WHERE ?', {users_senderid: params}, (err, response, fields) => {
        connection.release();
        if (err) {
          callback(err)
        } else {
          callback(null, response)
        }
      })
    }
  })
}

function messagesReceivedBy(params, callback) {
  db.getConnection((err, connection) => {
    if (err) {
      console.log('there was an error getting a connection from the pool', err);
    } else {
      connection.query('SELECT * FROM messages WHERE ?', {users_receiverid: params}, (err, response, field) => {
        connection.release();
        if (err) {
          callback(err)
        } else {
          callback(null, response);
        }
      })
    }
  })
}


exports.fetchPlaylist = fetchPlaylist;
exports.fetchMovies = fetchMovies;
exports.fetchPlaylistMovieIds = fetchPlaylistMovieIds;
exports.addWatched = addWatched;
exports.haveWatched = haveWatched;
exports.addMessage = addMessage;
exports.retrieveUsername = retrieveUsername;
exports.retrieveAllMessages = retrieveAllMessages;
exports.messagesSentBy = messagesSentBy;
exports.messagesReceivedBy = messagesReceivedBy;