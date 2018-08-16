import React from 'react';
import axios from 'axios';
import ExplorePlaylistEntry from './ExplorePlaylistEntry.jsx';
import ExplorePlaylistHeader from './ExplorePlaylistHeader.jsx';

class Explore extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      moviePlaylists: [], 
      displayedMovies: [],
    }
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
    axios.get('flixmix/explore')
    .then(res => this.formatData(res.data))
    .catch(err => console.log(err))
  }

  formatData(data) {
    let newMoviePlaylistsImages = [];
    data.forEach((movieTuple) => {
      let innerArray = [], id = [], title = [], popularity = [], releaseDate = [];
      movieTuple[1].forEach((movie) => {
        let collection = {
          src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          thumbnailWidth: 200000,
          thumbnailHeight: 200000,
          isSelected: false, 
          caption: `Title: ${movie.original_title} - ${movie.release_date}`, 
          maxRows: 1
        }
        innerArray.push(collection), id.push(movie.movies_id), 
        title.push(movie.original_title), popularity.push(movie.popularity), 
        releaseDate.push(movie.release_date)
      })
      newMoviePlaylistsImages.push({playlistID: movieTuple[0], id, title, popularity, releaseDate, movieImageArray: innerArray})
    })
    this.setState({moviePlaylists: data, displayedMovies: newMoviePlaylistsImages})
  }

  render() {
    return (
      <div className="container" >
      <ExplorePlaylistHeader/>
      <section className="section">
        {
          this.state.displayedMovies.map((collection, i) => {
            return <ExplorePlaylistEntry collection={collection} key={i}/>
          })
        }
      </section>
      </div>
      )
  }
}

export default Explore;