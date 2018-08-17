import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  setLoginState(e) {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    })
  }

  render() {
    return (
      <div>
          <form>
            <input type="text" name="username" value={this.state.username} onChange={(e) => {this.setLoginState(e)}}/>
            <input type="text" name="password" value={this.state.password} onChange={(e) => {this.setLoginState(e)}}/>
            <button onClick={(e) => {
              this.props.login(e, this.state.username, this.state.password)
              this.setState({
                username: '',
                password: ''
              })
              }}>Login</button>
          </form>
      </div>
      )
  }
}

export default Signup;