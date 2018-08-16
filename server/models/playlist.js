const db = require('../database/db.js').pool;
const Promise = require('bluebird');

const selectPlaylistByUser = userID => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.log('there was an error getting a connection from the pool', err);
      } else {
        let qStr = "SELECT playlist_id FROM playlist WHERE users_users_id = ?";
        connection.query(qStr, [userID], (err, data) => {
          connection.release();
          if (err) reject(err);
          else {
            let playlists = data.map(id => Object.values(id)[0]);
            resolve(playlists); // arr of playlists ids
          }
        });
      }
    })
  });
};

const getPlaylistMovies = playlists => {
  let qStr =
    "SELECT movies_movies_id FROM movies_playlists WHERE playlist_playlist_id = ?";
  let promises = [];
  playlists.forEach(playlist => {
    promises.push(
      new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
          if (err) {
            console.log('there was an error getting a connection from the pool', err);
          } else {
            connection.query(qStr, [playlist], (err, data) => {
              connection.release();
              if (err) reject(err);
              else {
                // console.log("playlist movie objects", data);
                let moviesIDarr = data.map(id => Object.values(id)[0]);
                resolve(moviesIDarr); // arr of movie ids
              }
            });
          }
        })
      })
    );
  });
  return Promise.all(promises); //returns nestedMovieArr
};

const getMoviesData = nestedMovieArr => {
  let qStr = "SELECT * FROM movies WHERE movies_id = ?";
  let promises = [];
  nestedMovieArr.forEach(movieArr => {
    movieArr.forEach(movie => {
      promises.push(
        new Promise((resolve, reject) => {
          db.getConnection((err, connection) => {
            if (err) {
              console.log('there was an error getting a connection from the pool', err);
            } else {
              connection.query(qStr, [movie], (err, data) => {
                connection.release();
                if (err) reject(err);
                else {
                  //why stringifying then parsing
                  resolve(JSON.parse(JSON.stringify(data))); // arr of movie ids
                }
              });
            }
          })
        })
      );
    });
  });
  return Promise.all(promises); //returns nestedMovieArr
};

const getAllMoviePlaylist = () => {
  let qStr = "SELECT * from movies_playlists"
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.log('there was an error getting a connection from the pool', err);
      } else {
        connection.query(qStr, (err, data) => {
          connection.release();
          if (err) reject(err)
          else resolve(data)
        })  
      }
    })
  })
}

const getMovieDataForExplorePage = (arrayOfMovieObjects) => {
  let promisesArr = [];
  arrayOfMovieObjects.forEach((movie) => {
    let movieID = movie.movies_movies_id;
    promisesArr.push(new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) {
          console.log('there was an error getting a connection from the pool', err);
        } else {
          let qStr = "SELECT * FROM movies WHERE movies_id = ?"
          connection.query(qStr, movieID, (err, data) => {
            connection.release();
            if (err) reject(err)
            else resolve(data)
            })     
        }
      })
    }))
  })
  return Promise.all(promisesArr)
}


exports.selectPlaylistByUser = selectPlaylistByUser
exports.getPlaylistMovies = getPlaylistMovies;
exports.getMoviesData = getMoviesData
exports.getAllMoviePlaylist = getAllMoviePlaylist
exports.getMovieDataForExplorePage = getMovieDataForExplorePage



