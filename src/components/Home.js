import React, { Component } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import Player from './Player.js';
import './css/Home.css'

class Home extends Component {

  constructor(props) {
    super(props);
    this.musicKit = window.MusicKit.getInstance();
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col xs="2" className="sideBar">
            <h5 className="display-5">Search</h5>
            <hr className="my-2" />
            <Nav vertical>
              <NavLink href="">Lorem ipsum</NavLink>
            </Nav>
            <h5 className="display-5">Browse</h5>
            <hr className="my-2" />
            <Nav vertical>
              <NavLink href="">Home</NavLink>
              <NavLink href="">Recommended for you</NavLink>
            </Nav>
            <h5 className="display-5">Library</h5>
            <hr className="my-2" />
            <Nav vertical>
              <NavLink href="">Songs</NavLink>
              <NavLink href="">Albums</NavLink>
              <NavLink href="">Arists</NavLink>
            </Nav>
            <h5 className="display-5">Playlists</h5>
            <hr className="my-2" />
            <Nav vertical>
              <NavLink href="">Lorem ipsum</NavLink>
              <NavLink href="">Lorem ipsum</NavLink>
            </Nav>
          </Col>
          <Col xs="9">
          </Col>
        </Row>
        <Row>
          <Container fluid={true} className="playbackControls">
            <Player />
          </Container>
        </Row>
      </Container>
    )
  }
}

export default Home;
