import React from "react";
/*
              {this.state.isLoggedIn ? 
        (<div>Welcome back, {this.state.username}!<p /></div>) : 
        (<div>
          <div>Please log in or sign up!<Login login={this.login} signup={this.signup}/></div>
        </div>)
      }

      login={this.login} signup={this.signup}
      /times-circle
      */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginHover: false
    };
    this.componentPersist = this.componentPersist.bind(this)
  }


  setLoginState(e) {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  componentPersist(){
    //disable on mouse enter
  }

  render() {
    return (
      <div className="navbar is-warning animated slideInDown" style={{
      }}>
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <i className="fa fa-film" style={{ fontSize: "48px" }} />
            <center>
              <font className="title is-1" size="72">
                FLIXMIX
              </font>
            </center>
          </a>
          <a className="navbar-item" href="/">
            <font className="subtitle is-3">/ create</font>
          </a>
          <a className="navbar-item" href="#" onClick={this.props.toggleExplore}>
            <font className="subtitle is-3">/ explore</font>
          </a>
          <a className="navbar-item" href="https://github.com/Kingdom-of-Gondor/Flixmix">
            <font className="subtitle is-3">/ about</font>
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
          <a className="navbar-item" onMouseEnter={this.props.handleHover} onClick={this.componentPersist}  style={{ left: "80%" }} href="#">
            <i className="fa fa-key" style={{ fontSize: "20px" }} />
            <font className="subtitle is-3" > login</font>
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
