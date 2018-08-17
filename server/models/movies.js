const db = require('../database/db.js').pool;

const insertMoviesIntoMovieTable = (arrayOfMovies) => {
  // console.log('getting arguments', arrayOfMovies)
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', ett)
      } else {
        let queryAddMoviesToMoviesTable = 'INSERT INTO movies (poster_path, release_date, original_title, popularity) VALUES ?';
        connection.query(queryAddMoviesToMoviesTable, [arrayOfMovies], (err, data) => {
          connection.release();
          if (err) reject(err)
          else resolve()
        })
      }
    })

  })
}

const insertPlaylistURLintoPlaylistTable = (url, user_id, listname) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', ett)
      } else {
        let queryAddURLToPlaylistTable = 'INSERT INTO playlist (url, users_users_id, listname) VALUES (?, ?, ?)';
        connection.query(queryAddURLToPlaylistTable, [url, user_id, listname], (err, data) => {
          connection.release();
          if (err) reject(err)
          else {
            // This helps parse the OK packet object into an array.
            resolve(Object.values(data)[2]) 
          }
        })
      }
    })
  })
}

const selectMovieIdsFromMovieTable = (arrayOfMovieTitles) => {  
  let promises = [];
  arrayOfMovieTitles.forEach((movieTitle) => {
    let sqlPromise = new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) {
          console.error('there was an error getting a connection from the pool', ett)
        } else {
          let queryToSelectMovieIds = `SELECT movies_id FROM movies WHERE original_title = ?`;   
          connection.query(queryToSelectMovieIds, movieTitle, (err, data) => {
            connection.release()
            if (err) {
              reject(err)
            } else {
              // This extracts movie ids
              let finalData = data.map((array) => { return array.movies_id})
              resolve(finalData)
            }    
          })
        }
        })
      })
      promises.push(sqlPromise);
  })
  return Promise.all(promises)  
}

const insertPlaylistWithMovieIdsIntoPlaylistMovieTable = (arrayOfMovieIds, playlistID) => {
  const movieAndPlaylistArray = arrayOfMovieIds.map((array) => [array[0],  playlistID])
  let promises = [];
  movieAndPlaylistArray.forEach((MovieandPlaylistTuple) => {
    let sqlMoviePromise = new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) {
          console.error('there was an error getting a connection from the pool', ett)
        } else {
          let queryToAddMovieIDandPlaylistID = 'INSERT INTO movies_playlists (movies_movies_id, playlist_playlist_id) VALUES (?, ?)';   
          connection.query(queryToAddMovieIDandPlaylistID, MovieandPlaylistTuple, (err, data) => {
            connection.release()
            if (err) reject(err)
            else resolve(data)
          })             
        }
      })
    })
    promises.push(sqlMoviePromise)
  })
  return Promise.all(promises)
}

const createUniqueURL = () => {
    //creating url
    let playlistURL = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 6);
    return new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) {
          console.error('there was an error getting a connection from the pool', ett)
        } else {
          let queryAddMoviesToMoviesTable = "SELECT * FROM playlist WHERE url = ?";
          connection.query(
            queryAddMoviesToMoviesTable,
            [playlistURL],
            (err, data) => {
              connection.release();
              if (err) reject(err);
              else if (data.length === 0) {
                resolve(playlistURL);
              } else{
                reject('duplicates')
              }
            }
          );
        }
      })
    });
  }

exports.insertMoviesIntoMovieTable = insertMoviesIntoMovieTable
exports.insertPlaylistURLintoPlaylistTable = insertPlaylistURLintoPlaylistTable
exports.selectMovieIdsFromMovieTable = selectMovieIdsFromMovieTable
exports.insertPlaylistWithMovieIdsIntoPlaylistMovieTable = insertPlaylistWithMovieIdsIntoPlaylistMovieTable
exports.createUniqueURL = createUniqueURL
