const db = require("../database/db.js");
const helpers = require("../helpers/helpers.js");
const movieModels = require("../models/movies.js");
const Promise = require("bluebird");

module.exports = {
  addMoviesToDatabaseAndCreatePlaylist: (req, res) => {
    let sanitizeMovieArray = function(arr) {
      return arr.map(movie => {
        return [
          movie.poster_path,
          movie.release_date,
          movie.original_title,
          movie.popularity
        ];
      });
    };

    let shortURL, playlistID;
    let { movieArr, user_id, listname} = req.body;
    if (user_id === "") user_id = 62 //anon 
    // let arrayOfMovieValues = movieArr.map((object) =>  Object.values(object))
    let arrayOfMovieValues = sanitizeMovieArray(movieArr);

    let arrayOfMovieTitles = movieArr.map(object => object.original_title);

    movieModels
      .createUniqueURL()
      .then(url => {
        shortURL = url;
        return movieModels.insertMoviesIntoMovieTable(arrayOfMovieValues);
      })
      .then(() =>
        movieModels.insertPlaylistURLintoPlaylistTable(shortURL, user_id, listname)
      )
      .then(idOfPlaylist => {
        playlistID = idOfPlaylist;
        return movieModels.selectMovieIdsFromMovieTable(arrayOfMovieTitles);
      })
      .then(arrayOfMovieIds => {
        return movieModels.insertPlaylistWithMovieIdsIntoPlaylistMovieTable(
          arrayOfMovieIds,
          playlistID
        );
      })
      .then(() => res.send(shortURL))
      .catch(err => {
        console.log(err)
        res.sendStatus(404)})
      .catch(err => {
        console.log(err)
        res.sendStatus(404)})
      .catch(err => {
        console.log(err)
        res.sendStatus(404)})
      .catch(err => {
        console.log(err)
        res.sendStatus(404)})
  }
};

// CLIENT JSON DATA

// JSON DATA:
// { "user_id": 2,
//   "movieArr": [{
//   "poster_path": "Test",
//   "release_date": "Test",
//   "original_title": "test",
//   "popularity": "test"
// },
// {
//   "poster_path": "Test1",
//   "release_date": "Test1",
//   "original_title": "test1",
//   "popularity": "test1"
// }]}

/*{ vote_count: 8,
    id: 56354,
    video: false,
    vote_average: 5.3,
    title: 'Captain Nemo and the Underwater City',
    popularity: 1.399,
    poster_path: '/91iv56eyzYSnKmLrMq3f5EXhnCf.jpg',
    original_language: 'en',
    original_title: 'Captain Nemo and the Underwater City',
    genre_ids: [ 12, 10751 ],
    backdrop_path: '/awYg8Zbaq7p53LcIEMzbKeosmjD.jpg',
    adult: false,
    overview: 'Some survivors of a drowning ship are rescued by Captain Nemo and his submarine crew. They are taken to an underwater city, where they may be trapped for the rest of their lives.',
    release_date: '1969-12-19' } */

/*poster_path, release_date, original_title, popularity */
