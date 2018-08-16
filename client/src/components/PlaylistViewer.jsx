import React from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import YouTube from "react-youtube";
import genCard from "./genCard.jsx";

class PlaylistView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: {
        title: null,
        user: null,
        movies: [
          {
            movieInfo: {
              movieId: null,
              title: "",
              posterPath: "",
              releaseDate: ""
            },
            watched: false,
            showComment: false
          }
        ]
      },
      movies: [],
      playlistDetails: {},
      currentComment: "",
      charactersLeft: 250,
      hoverOpen: false,
      currentVideo: "",
      author: ""
    };
    // this.handleWatchedSubmit = this.handleWatchedSubmit.bind(this);
    this.fetchPlaylist = this.fetchPlaylist.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
    this.openModal = this.openModal.bind(this);
    // this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    // this.handleCommentCancel = this.handleCommentCancel.bind(this);
  }

  // //In current state of the app there is no watched button so this function is irrelevant
  // handleWatchedSubmit(event, index) {
  //   //Don't know why the functionality was changed though
  //   //below code will update the watched status of the movie in the current state
  //   //to update the watched status in the db, utilize the /watched route
  //   event.preventDefault();
  //   let updatedPlaylist = this.state.playlist;
  //   updatedPlaylist.movies[index].showComment = true;
  //   updatedPlaylist.movies[index].watched = false;
  //   this.setState({
  //     playlist: updatedPlaylist
  //   });
  // }

  // //this function is also no longer used, in a previous state of the app
  // //it would tell you how many characters you have left for your comment
  // handleCommentChange(event) {
  //   this.setState({
  //     currentComment: event.target.value,
  //     charactersLeft: 250 - this.state.currentComment.length
  //   });
  // }

  //this was also used in a previous state of the app, but is ready to use to submit a comment to the db
  handleCommentSubmit(event, index, messageText) {
    event.preventDefault();

    //set up all variables we'll use in this function
    let currentMovieId = this.state.playlist.movies[index].movieInfo.movieId;
    let currentUserId = this.props.user_id || 62;
    let currentUsername = this.props.username || "Anon";
    let playlistAuthorId = this.state.playlist.authorId;
    let movieReviewed = this.state.playlist.movies[index].movieInfo.title.slice(
      0,
      30
    );
    let message = `${currentUsername} thought this about ${movieReviewed}: ${
      this.state.currentComment
    }`;

    axios
      .post("flixmix/watched", {
        userId: currentUserId,
        movieId: currentMovieId
      })
      .then(response => {
        this.fetchPlaylist();
      })
      .then(response => {
        this.fetchPlaylist();
      })
      .catch(err => {
        console.error("we had an error updating the watched table", err);
      });

    //the below params are named to reflect db
    axios
      .post("flixmix/addMessage", {
        movieMessage: message,
        messageSenderId: currentUserId,
        messageReceiverId: playlistAuthorId,
        movieId: currentMovieId
      })
      .then(response => {
        console.log("the message was successfully added");
      })
      .catch(err => {
        console.error(
          "there was an error posting this message to the database",
          err
        );
      });
    let updatedPlaylist = this.state.playlist;
    updatedPlaylist.movies[index].showComment = false;
    this.setState({
      charactersLeft: 250,
      currentComment: "",
      playlist: updatedPlaylist
    });
  }

  // //this function was also used in a previous state of the app 
  // //no longer a cancel comment button
  // handleCommentCancel(event, index) {
  //   event.preventDefault();
  //   let prevPlaylist = this.state.playlist;
  //   prevPlaylist.movies[index].showComment = false;
  //   this.setState({
  //     charactersLeft: 250,
  //     currentComment: "",
  //     playlist: prevPlaylist
  //   });
  // }

  //fetches playlists username
  fetchUsers() {
    axios
      .get("/flixmix/fetchUsername", { params: { userId: 62 } })
      .then(({ data }) => this.setState({ author: data }));
  }

  //fetches the playlist details
  fetchPlaylist() {
    let currentUserId = this.props.user_id || 62;
    let playlistUrl = this.props.endpoint;
    axios
      .get("flixmix/playlistDetails", {
        params: {
          url: playlistUrl
        }
      })
      .then(res => {
        this.setState({ playlistDetails: res.data });
        this.fetchMovies();
      });
  }

  //fetches the movies for a playlist
  fetchMovies() {
    console.log("firing", this.state.playlistDetails);
    axios
      .get("flixmix/playlistMovieIds", {
        params: {
          id: this.state.playlistDetails.playlistId
        }
      })
      .then(({ data }) => {
        console.log('movie data', data)
        this.fetchUsers();
        this.setState({ movies: data });
      });
  }

  //opens the trailer for the movie
  openModal(index) {
    let movieToSearch = `${
      this.state.movies[index].original_title
    } trailer`;
    axios
      .get("flixmix/youtube", {
        params: {
          searchTerm: movieToSearch
        }
      })
      .then(response => {
        this.setState({
          currentVideo: response.data,
          hoverOpen: true
        });
      })
      .catch(err => {
        console.error(
          "there was an error fetching the trailer for this video",
          err
        );
      });
  }

  componentDidMount() {
    this.fetchPlaylist();
  }

  render() {
    //playlist title, for mvp we will not know the creater and the title of the playlist
    //this logic handles not display the title component in that case
    let youtubeVideo = null;
    ////////////////This set of logic handles the display of the youtube video////////////////
    //youtube config
    let video = (
      <YouTube
        videoId={this.state.currentVideo}
        onReady={this._onReady}
        opts={{
          height: "390",
          width: "640",
          playerVars: {
            autoplay: 1
          }
        }}
      />
    );
    if (this.state.hoverOpen) {
      youtubeVideo = <ReactTooltip id="youtube">{video}</ReactTooltip>;
    }
    // <div />
    return (
      <div className="columns">
        <div
          className="column is-parent is-two-thirds is-offset-2"
          style={{ marginTop: "10px" }}
        >
          <span
            className="tag is-light is-large"
            style={{
              marginLeft: "10px",              marginBottom: "10px"
            }}
          >
            {this.state.playlistDetails.listname}{" "}
            {this.state.author ? `by ${this.state.author}` : null}
          </span>
          {this.state.movies.map((movie,index) => {
            return (
              <div
                className="message card is-warning sarah"
                style={{
                  marginLeft: "10px"
                }}
              >
                <div className="media-content ">
                  <div
                    className="message-header "
                  >
                    {movie.original_title} <small>{movie.release_date}</small>
                  </div>
                </div>
                <div className="columns is-vertical">
                  <div className="card-image" >
                  {youtubeVideo}
                    <img
                    className="youtube"
                      data-tip
                      data-for="youtube"
                      onMouseLeave={() => this.setState({ hoverOpen: false })}
                      onMouseEnter={() => this.openModal(index)}
                      className="cardimgpreview"
                      
                      src={
                        "https://image.tmdb.org/t/p/w500" + movie.poster_path
                      }
                    />{" "}
                  </div>
                  <div className="column">
                    <p className="subtitle" style={{ marginTop: "10px" }}>
                      Leave a comment after you watch it!
                    </p>
                    <input className="textarea" type="text" />
                    <button
                      className="button is-warning"
                      style={{ marginTop: "10px" }}
                    >
                      {" "}
                      Submit Comment
                    </button>
                  </div>
                  <div style={{ visibility: "hidden" }}>o</div>
                </div>
                <div
                  className="media-right"
                  style={{
                    visibility: "hidden"
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PlaylistView;

//
