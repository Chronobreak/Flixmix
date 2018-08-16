import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  setLoginState(e) {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  render() {
    let Style = this.props.hover
      ? { position: "absolute", visibility: "visible", zIndex: "9" }
      : { visibility: "hidden", position: "absolute" };
    let secondStyle = this.props.hover
      ? { visibility: "visible" }
      : { visibility: "hidden" };
    let classes2 = this.props.hover
      ? "column is-parent is-vertical field animate slideInDown"
      : "column is-ancestor is-4 is-offset-8";

    return (
      <div className="column is-ancestor is-4 is-offset-8" style={Style}>
        <div className={classes2} style={secondStyle}>
          <p className="control has-icons-left column is-parent is-vertical arrow_box">
            <input
              value={this.state.username}
              name="username"
              onChange={e => {
                this.setLoginState(e);
              }}
              className="input fa column is-child"
              type="email"
              placeholder="&#xf0e0; Username"
              style={{
                fontFamily: "Arial, FontAwesome",
                marginBottom: "5px"
              }}
            />
            <input
              className="input fa column is-child"
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => {
                this.setLoginState(e);
              }}
              placeholder="&#xf0c1; Password"
              style={{
                fontFamily: "Arial, FontAwesome",
                marginBottom: "5px"
              }}
            />
            <button
              className="button is-success"
              onClick={e => {
                this.props.login(e, this.state.username, this.state.password);
                this.setState({
                  username: "",
                  password: ""
                });
              }}
              style={{
                marginRight: "5px"
              }}
            >
              {" "}
              Log in{" "}
            </button>
            <button
              className="button is-info"
              onClick={e => {
                this.props.signup(e, this.state.username, this.state.password);
                this.setState({
                  username: "",
                  password: ""
                });
              }}
            >
              {" "}
              Sign Up{" "}
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;

// <div>
// <form>
//   <input type="text" name="username" value={this.state.username} onChange={(e) => {this.setLoginState(e)}}/>
//   <input type="password" name="password" value={this.state.password} onChange={(e) => {this.setLoginState(e)}}/>
//   <button className="button is-success" onClick={(e) => {
//     this.props.login(e, this.state.username, this.state.password)
//     this.setState({
//       username: '',
//       password: ''
//     })
//     }}>Login</button>
//   <button className="button is-success" onClick={(e) => {
//     this.props.signup(e, this.state.username, this.state.password)
//     this.setState({
//       username: '',
//       password: ''
//     })
//   }}>Signup</button>
// </form>
// </div>
