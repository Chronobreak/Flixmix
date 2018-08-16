const selectPlaylistByUser = userID => {
  return new Promise((resolve, reject) => {
    let qStr = "SELECT playlist_id FROM playlist WHERE users_users_id = ?";
    db.connection.query(qStr, [userID], (err, data) => {
      if (err) reject(err);
      else resolve(playlistURL);
    });
  });
};

const getPlaylistMovies = () => {
  Promise.all([promise1, promise2, promise3]).then(function(values) {
    console.log(values);
  });  
};

const getMoviesData = () => {

};

exports.selectPlaylistByUser = selectPlaylistByUser;
exports.selectMovieIDsPerPlaylist = selectMovieIDsPerPlaylist;
exports.selectMovieDataByMovieID = selectMovieDataByMovieID;

// CLIENT JSON DATA
