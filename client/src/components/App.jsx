import React from "react";
import axios from "axios";
import Login from "./Login.jsx";
import ShareModal from "./ShareModal.jsx"

import ExplorePlaylist from './ExplorePlaylist.jsx';
// import Signup from "./Signup.jsx";  //
// import Profile from "./Profile.jsx";
import Search from "../components/Search.jsx";
import SearchResults from "../components/SearchResults.jsx";
import PlayListViewer from "./PlaylistViewer.jsx";
import Navbar from "./Navbar.jsx";
import SortableComponent from "./Sortable.jsx"; //

import {
  arrayMove
} from "react-sortable-hoc";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      username: "",
      isLoggedIn: false,
      searchResults: [],
      userInput: "",
      playlist: [],
      user: "placeholder",
      toggleView: true,
      loginHover: false,
      playlistUrlEndpoint: "",
      user: "placeholder",
      toggleView: true,
      listname: '',
      generatedLink: null
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.updateUserInput = this.updateUserInput.bind(this);
    this.searchOnSubmit = this.searchOnSubmit.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
    this.movePlaylistItemDown = this.movePlaylistItemDown.bind(this);
    this.movePlaylistItemUp = this.movePlaylistItemUp.bind(this);
    this.sendPlaylist = this.sendPlaylist.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderCreate = this.renderCreate.bind(this);
    this.renderExplore = this.renderExplore.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.renderLogic = this.renderLogic.bind(this);

  }

  // Login, Logout, Signup Functions

  login(e, username, password) {
    e.preventDefault()
    let body = {username,  password}
    axios.post('flixmix/login', body)
    .then(response => {
      this.setState(
      {
      user_id: response.data[0].users_id,
      username: response.data[0].username,
      isLoggedIn: true
      })
      let sessionInfo = {
        user_id: this.state.user_id,
        username: this.state.username
      }
      axios.post('/session', sessionInfo)
    })
    .catch(err => console.log(err))
  }

  logout() {
    axios.get('/logout')
    .then(() => {
      this.setState({
        user_id: '',
        isLoggedIn: false,
        username: ''
      })
    })
  }

  signup(e, username, password) {
    e.preventDefault();
    let body = { username, password };
    axios
      .post("flixmix/signup", body)
      .then(response => {
        this.setState({
          user_id: response.data[0].user_id,
          username: response.data[0].username,
          isLoggedIn: true
        });
      })
      .then(result => console.log("Console logging signup: ", result))
      .catch(err => console.log(err));
  }

  // Search component helper functions

  updateUserInput(e) {
    this.setState({
      userInput: e.target.value
    });
  }

  searchOnSubmit(e) {
    e.preventDefault();
    let body = { search: this.state.userInput };
    axios.post("flixmix/search", body).then(result => {
      this.setState({
        searchResults: result.data.results
      });
    });
  }

  // Playlist helper functions: add to/delete from playlist, reorder items up/down

  addToPlaylist(e) {
    let newPlaylist = this.state.playlist.slice();
    newPlaylist.push(e);

    this.setState({
      playlist: newPlaylist
    });
  }

  deleteFromPlaylist(index) {
    let playlistCopy = this.state.playlist.slice();
    let newPlaylist = [
      ...playlistCopy.slice(0, index),
      ...playlistCopy.slice(index + 1)
    ];

    this.setState({
      playlist: newPlaylist
    });
  }

  movePlaylistItemUp(array, index) {
    if (index === 0) {
      return array;
    } else {
      let modified = array.slice();
      let temp = modified[index];
      modified[index] = modified[index - 1];
      modified[index - 1] = temp;

      this.setState({
        playlist: modified
      });
    }
  }

  movePlaylistItemDown(array, index) {
    if (index === array.length - 1) {
      return array;
    } else {
      let modified = array.slice();
      let temp = modified[index];
      modified[index] = modified[index + 1];
      modified[index + 1] = temp;

      this.setState({
        playlist: modified
      });
    }
  }

  sendPlaylist() {
    console.log(
      "movies to send",
      this.state.playlist.map(e => e.original_title)
    );
    axios
      .post("/flixmix/createPlaylist", {
        movieArr: this.state.playlist,
        user_id: this.state.user_id,
        listname: this.state.listname
      })
      .then(c => {
        if (c.code) console.error("fix the models to throw errors here instead of res.sending them")
        else this.setState({generatedLink: c.data})
      })
  }

  handleHover() {
    this.setState({ loginHover: !this.state.loginHover });
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      playlist: arrayMove(this.state.playlist, oldIndex, newIndex)
    });
  }

  componentDidMount() {

    axios.get('/session')
    .then((result) => {
      console.log("Console logging result.data: ", result.data)
      this.setState({
        user_id: result.data.user_id,
        username: result.data.username,
        isLoggedIn: true
      })
    })

    axios.get('/session')
    .then((result) => {
      console.log("Console logging result.data: ", result.data)
      this.setState({
        user_id: result.data.user_id,
        username: result.data.username,
        isLoggedIn: true
      })
    })

    if (window.location.href.includes('code')) {
      this.setState({
        toggleView: 'playlist',
        playlistUrlEndpoint: window.location.href.slice(-6)
      });
    } else (
      this.setState({
        toggleView: 'create'
      })
    )
  }
  closeModal(){
    this.setState({generatedLink: null})
  }
  renderCreate(){
    return (
      <div>
      {this.state.generatedLink ?
      (<ShareModal url={this.state.generatedLink} close={this.closeModal}/>) :
      null}
    <Login
      login={this.login}
      signup={this.signup}
      hover={this.state.loginHover}
    />
    <div className="NavBar" />
    <div className="columns">
      <div className="column is-ancestor is-6">
        <Search
          userInput={this.state.userInput}
          updateUserInput={this.updateUserInput}
          searchOnSubmit={this.searchOnSubmit}
        />
        <div
          style={{
            marginBottom: "10px"
          }}
        />
        <SearchResults
          movies={this.state.searchResults}
          add={this.addToPlaylist}
        />
      </div>
      <div className="column is-ancestor is-6 field has-addons">
        <div className="control column is-child is-8">
          <input onChange={(e) => this.setState({listname: e.target.value})}  type="text" placeholder="Name your playlist!"  className="input is-primary fa" />
          <div
            style={{
              marginBottom: "10px"
            }}
          />
          <SortableComponent
            movies={this.state.playlist.map(obj =>
              String(`${obj.original_title} - (${obj.release_date})`)
            )}
            onSortEnd={this.onSortEnd}
            deletePlaylist={this.deleteFromPlaylist}
          />{" "}

          <button
            disabled={
              this.state.playlist.length > 0 && this.state.listname.length > 0 ?
              false :
              true
            }
            onClick={this.sendPlaylist}
            className="button is-warning is-large"
          >
            <span
              className="icon is large"
              style={{
                marginRight: "5px"
              }}
            >
              <i className="fa fa-share" />
            </span>
            Create playlist
          </button>
        </div>
        <div>
          <div className="control" style={{ marginTop: "10px" }} />
          <div
            style={{
              marginBottom: "10px"
            }}
          />
        </div>
      </div>
    </div>
    </div>)  }
  
  renderExplore(){
    this.setState({toggleView: "explore"})
  }
  renderPlaylist(){
    return (<PlayListViewer endpoint={this.state.playlistUrlEndpoint} user_id={this.state.user_id}/>)
  }
  renderLogic(){
    if(this.state.toggleView === 'explore'){
      return (<ExplorePlaylist/>);
    } else if (this.state.toggleView === 'playlist'){
      return this.renderPlaylist();
    } else {
      return this.renderCreate()
    }
  }
  render() {
    return (
      <div>
        <Navbar handleHover={this.handleHover} toggleExplore={this.renderExplore} />
        {this.renderLogic()}
      </div>
    );
  }
}

export default App;

// Note for styling: there are <center> tags throughout
// Feel free to remove as you add classNames to components

// Profile component temporarily removed - can add back with <Profile />
