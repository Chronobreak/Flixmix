const db = require('../database/db.js');
const playlistModel = require('../models/playlist.js');
const helpers = require('../helpers/helpers.js')

module.exports = {
  fetchUsersMoviesList: (req, res) => {
    let {userID} = req.params;
    playlistModel.selectPlaylistByUser(userID)
      .then((playlists) => playlistModel.getPlaylistMovies(playlists))
      .then((nestedMovieArr) => playlistModel.getMoviesData(nestedMovieArr))
      .then((movieList) => res.send(movieList))
      .catch(err => res.send(err))
      .catch(err => res.send(err))
      .catch(err => res.send(err))
  }, 
  fetchPlaylistMovieList: (req, res) => {
    let playlistMovieArr = [];
    let movieData = [];
    playlistModel.getAllMoviePlaylist()
      .then((movieplaylists) => {
        playlistMovieArr = movieplaylists
        return playlistModel.getMovieDataForExplorePage(movieplaylists)
      })
      .then(resolvedMovieData => {
        movieData = resolvedMovieData
        let finalData = helpers.packageData(playlistMovieArr, movieData)
        res.send(finalData)
      })
      .catch(err => res.send(err))
      .catch(err => res.send(err))
  }
}




