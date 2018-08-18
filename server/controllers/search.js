const axios = require('axios')
const API = process.env.MOVIE_KEY;

// Search component controller
// Search component => server/routes.js => server/controllers.search.js
// Sends axios.get request to TMDb API based on userInput
// **** REMEMBER to input API key in config/config.js file **** see config/config.example.js

module.exports = {
  searchAPI: (req, res) => {
    let address = `https://api.themoviedb.org/3/search/movie/?query=${req.body.search}&sort_by=vote_average.asc&api_key=${API}`
    axios.get(address)
      .then((result) => {
        res.send(result.data)
      })
  }
}

