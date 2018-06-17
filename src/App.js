import React, { Component } from 'react';
import Player from './components/Player.js';
import Login from './components/Login.js';
import SecretInfo from './secret/SecretInfo.js';

class App extends Component {

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

      this.onAuthorize = this.musicKit.authorize();
      this.onUnauthorize = this.musicKit.unAuthorize();
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
        return <Player />
      } else {
        return <Login />
      }
    } else {
      return (
        'In development...'
      );
    }
  }
}

export default App;
