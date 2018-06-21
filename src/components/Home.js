import React, { Component } from 'react';
import { Container, Row, Col, Nav, NavLink, Button } from 'reactstrap';
import Player from './Player.js';
import Songs from './Songs.js';
import './css/Home.css';
import spinner from '../spinner.gif';

class Home extends Component {

  constructor(props) {
    super(props);

    this.musicKit = window.MusicKit.getInstance();
    this.api = this.musicKit.api.library;
    this.state = {
      loading: 'false',
      results: {
        type: null
      },
      content: null
    }

    this.getContent = this.getContent.bind(this);
    this.queue = this.queue.bind(this);
  }

  queue(descriptor) {
    this.musicKit.setQueue(descriptor).then((items) => {
      items.items.forEach(i => i.sourceId = i.id);
      // prepare to play instead so it doesn't restart current song?
      this.musicKit.player.changeToMediaItem(items.item(descriptor.startPosition || 0)).then(() => null, (err) => alert("This item isn't available in your country, sorry!"));
    }, (err) => {
      console.error(err);
    });
  }

  getContentType = (e, type) => {
    e.preventDefault();
    this.setState({loading: 'true'});

    switch (type) {
      case 'songs':
        this.getContent('songs');
        break;
      default:
        break;
    }
  }

  getContent = (type) => {
    this.setState({
      results: null
    })

    if (type === 'songs') {
      var songs = [];

      let getSongs = (start = 0) => {
        this.api.songs(null, {
          offset: start,
          limit: 100
        }).then((grouped) => {
          songs = songs.concat(grouped);

          if (!this.state.results) {
            this.setState({
              results: {
                type: 'songs',
                songs: songs
              }
            });
          } else {
            this.setState({
              results: {
                type: 'songs',
                songs: songs
              }
            });
          }

          this.setState({loading: 'false'});

          if (grouped.length === 100) {
            getSongs(start + 100);
            this.setState({loading: 'true'});
          }
        });
      }

      getSongs();
    }
  }

  showContent() {
    if (this.state.loading === 'true') {
      return (
        <div className="spinner">
          <img src={spinner} alt='' />
        </div>
      )
    } else {
      if (this.state.results) {
        var type = this.state.results.type;

        if (type === 'songs') {
          if (this.state.results.songs) {
            var songs = this.state.results.songs;
            return (
              <Songs songs={songs} queue={this.queue} />
            )
          }
        }
      }
    }
  }

  render() {
    return (
      <div>
      <Container fluid={true} className="wrapper">
        <Row>
          <Col xs="2" className="column">
            <div className="sidebar">
              <h5 className="display-5">Search</h5>
              <hr className="my-2" />
              <Nav vertical>
                <NavLink href="#">Lorem ipsum</NavLink>
              </Nav>
              <h5 className="display-5">Browse</h5>
              <hr className="my-2" />
              <Nav vertical>
                <NavLink href="#">Home</NavLink>
                <NavLink href="#">Recommended for you</NavLink>
              </Nav>
              <h5 className="display-5">Library</h5>
              <hr className="my-2" />
              <Nav vertical>
                <NavLink href="#" onClick={e => this.getContentType(e, 'songs')}>Songs</NavLink>
                <NavLink href="#">Albums</NavLink>
                <NavLink href="#">Arists</NavLink>
              </Nav>
              <h5 className="display-5">Playlists</h5>
              <hr className="my-2" />
              <Nav vertical>
                <NavLink href="#">Lorem ipsum</NavLink>
                <NavLink href="#">Lorem ipsum</NavLink>
              </Nav>

              <div className="logout">
                <Button color="danger" onClick={this.props.onUnauthorize}>Sign out of Apple Music</Button>
              </div>
            </div>
          </Col>
          <Col xs="9" className="mainContent">
            {this.showContent()}
          </Col>
        </Row>
      </Container>
      <div className="playbackControls">
        <Player />
      </div>
      </div>
    )
  }
}

export default Home;
