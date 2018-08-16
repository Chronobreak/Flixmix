const express = require('express');
const FlixMixRouter = express.Router();

/* Controllers w/ Model Functions */
const UserController = require('./controllers/user.js');
const MovieController = require('./controllers/movies.js');
const PlaylistController = require('./controllers/playlist.js')
const Search = require('./controllers/search.js')
const PlaylistViewController = require('./controllers/playlistView.js')


FlixMixRouter.route('/login')
    .post(UserController.checkUserCredentials)

FlixMixRouter.route('/signup')
    .post(UserController.signup)

FlixMixRouter.route('/myMovielists/:userID')
    .get(PlaylistController.fetchUsersMoviesList)

FlixMixRouter.route('/explore')
    .get(PlaylistController.fetchPlaylistMovieList)

FlixMixRouter.route('/createPlaylist')
    .post(MovieController.addMoviesToDatabaseAndCreatePlaylist)

FlixMixRouter.route('/search')
    .post(Search.searchAPI)

FlixMixRouter.route('/retrievePlaylist')
    .get(PlaylistViewController.getPlaylistFromUrl)

FlixMixRouter.route('/watched')
    .post(PlaylistViewController.addWatchedMovie)

FlixMixRouter.route('/youtube')
    .get(PlaylistViewController.searchYoutube)

FlixMixRouter.route('/playlists')
    .get(PlaylistViewController.redirect)
    
FlixMixRouter.route('/addMessage')
    .post(PlaylistViewController.addMessage)

FlixMixRouter.route('/playlistDetails')
    .get(PlaylistViewController.getPlaylistDetails)

FlixMixRouter.route('/playlistMovieIds')
    .get(PlaylistViewController.getPlaylistMovies)

FlixMixRouter.route('/movieDetails')
    .get(PlaylistViewController.getMovieDetails)

FlixMixRouter.route('/haveWatched')
    .get(PlaylistViewController.getWatchedMovies)

FlixMixRouter.route('fetchUsername')
    .get(PlaylistViewController.getUsername)

FlixMixRouter.route('/playlistMovieIds')
    .post(PlaylistViewController.getPlaylistMovies)

FlixMixRouter.route('/movieDetails')
    .get(PlaylistViewController.getMovieDetails)

FlixMixRouter.route('/haveWatched')
    .get(PlaylistViewController.getWatchedMovies)

FlixMixRouter.route('/fetchUsername')
    .get(PlaylistViewController.getUsername)

FlixMixRouter.route('/fetchAllMessages')
    .get(PlaylistViewController.getAllMessages)

FlixMixRouter.route('/fetchMessagesSentBy')
    .get(PlaylistViewController.getMessagesSentBy)

FlixMixRouter.route('/fetchMessagesReceivedBy')
    .get(PlaylistViewController.getMessagesReceivedBy)

module.exports = FlixMixRouter