import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Player extends Component {

  render() {
    return (
      <Button outline color="info" size="lg" block onClick={this.props.onUnauthorize}>Sign out</Button>
    )
  }
}

export default Player;
