import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Player from './Player.js';
import './css/Player.css'

class Home extends Component {

  constructor(props) {
    super(props);
    this.musicKit = window.MusicKit.getInstance();
  }

  render() {
    return (
      <Container fluid={true}>
        <Container fluid={true} className="playbackControls">
          <Player />
        </Container>
      </Container>
    )
  }
}

export default Home;
