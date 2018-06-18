import React, { Component } from 'react';
import Player from './components/Player.js';
import Login from './components/Login.js';
import SecretInfo from './secret/SecretInfo.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.onAuthorize = this.onAuthorize.bind(this);
    this.onUnauthorize = this.onUnauthorize.bind(this);
  }

  onAuthorize() {
    this.musicKit.authorize().then(userToken => {
      this.setState({uToken: userToken});
    });
  }

  onUnauthorize() {
    this.musicKit.unauthorize().then(() => {
      this.forceUpdate();
    });
  }

  error() {
    console.log("error here");
  }

  render() {
    let initialize = () => {
      window.MusicKit.configure({
        developerToken: SecretInfo.developerToken,
        app: {
          name: 'Fruit Music',
          build: '0.0.1'
        }
      });

      this.musicKit = window.MusicKit.getInstance();
    }

    if (window.MusicKit) {
      initialize();
    } else {
      window.addEventListener('musickitloaded', () => {
        initialize();
      });
    }

    if (this.musicKit) {
      if (this.musicKit.isAuthorized) {
          return <Player onUnauthorize={this.onUnauthorize} />
      } else {
        return <Login onAuthorize={this.onAuthorize} />
      }
    } else {
      return (
        'In development...'
      );
    }
  }
}

export default App;
