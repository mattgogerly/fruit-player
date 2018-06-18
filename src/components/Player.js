import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import './css/Player.css'

class Player extends Component {

  render() {
    return (
      <Container fluid={true}>
        <Container fluid={true} className="playbackControls">
          <p>Placeholder</p>
        </Container>
      </Container>
    )
  }
}

export default Player;
