import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Ana',
      joined_at: '', 
      password: '', 
      bio: 'Fan of horror & chic', 
      profile_pic_path: 'https://picsum.photos/200/300/?random'
    }
  }

  setLoginState(e) {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({[name]: val})
  }


  render() {
    return (
      <div>
        <h2>{this.state.username}</h2>
        <p>About: {this.state.bio}</p>
        <img src={this.state.profile_pic_path}/>
      </div>
      )
  }
}

export default Profile;