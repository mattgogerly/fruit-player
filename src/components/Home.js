import React, { Component } from 'react';
import { Container, Row, Col, Nav, NavLink, Button } from 'reactstrap';
import Player from './Player.js';
import Songs from './Songs.js';
import Albums from './Albums.js';
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
      case 'albums':
        this.getContent('albums');
        break;
      case 'artists':
        this.getContent('artists');
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
    } else if (type === 'albums') {
      var albums = [];

      let getAlbums = (start = 0) => {
        this.api.albums(null, {
          offset: start,
          limit: 100
        }).then((grouped) => {
          albums = albums.concat(grouped);

          if (!this.state.results) {
            this.setState({
              results: {
                type: 'albums',
                albums: albums
              }
            });
          } else {
            this.setState({
              results: {
                type: 'albums',
                albums: albums
              }
            });
          }

          this.setState({loading: 'false'});

          if (grouped.length === 100) {
            getAlbums(start + 100);
            this.setState({loading: 'true'});
          }
        });
      }

      getAlbums();
    } else if (type === 'artists') {
      var artists = [];

      let getArtists = (start = 0) => {
        this.api.artists(null, {
          offset: start,
          limit: 100
        }).then((grouped) => {
          artists = artists.concat(grouped);

          if (!this.state.results) {
            this.setState({
              results: {
                type: 'artists',
                artists: artists
              }
            });
          } else {
            this.setState({
              results: {
                type: 'artists',
                artists: artists
              }
            });
          }

          this.setState({loading: 'false'});

          if (grouped.length === 100) {
            getArtists(start + 100);
            this.setState({loading: 'true'});
          }
        });
      }

      getArtists();
    }
  }

  showContent() {
    if (this.state.loading === 'true') {
      return (
        <div className="spinner">
          <img src={spinner} alt='loading' />
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
        } else if (type === 'albums') {
          if (this.state.results.albums) {
            var albums = this.state.results.albums;
            return (
              <Albums albums={albums} queue={this.queue} />
            )
          }
        } else if (type === 'artists') {
          if (this.state.results.artists) {
            var artists = this.state.results.artists;
            return (
              // TODO
              <div></div>
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
                <NavLink href="#" onClick={e => this.getContentType(e, 'albums')}>Albums</NavLink>
                <NavLink href="#" onClick={e => this.getContentType(e, 'artists')}>Arists</NavLink>
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
