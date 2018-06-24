import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './css/Albums.css'

class Albums extends Component {

  constructor(props) {
      super(props);
      this.musicKit = window.MusicKit.getInstance();
  }

  formatMillis(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
  }

  formatArtworkUrl(url, width, height) {
    return window.MusicKit.formatArtworkURL(url, width, height);
  }

  prepareQueue(song) {
    this.props.queue(
      {
        items: this.props.albums.map(i => {
          return {
            attributes: i.attributes,
            id: i.id,
            container: {
              id: i.id,
              name: 'library-albums'
            }
          }
        }),
        startPosition: this.props.albums.indexOf(song)
      }
    );
  }

  render() {
    var albums = this.props.albums;
    console.log(albums);
    return (
      <Container fluid={true}>
        <h4 className='display-4 title'>Albums</h4>
        <hr className='my-2' />
        <div className='albums'>
          {
            albums.map((album, index) => {
              return (
                <div className='album' key={index}>
                  <img className='artwork' src={this.formatArtworkUrl(album.attributes.artwork)} alt='' />
                  <span className="albumTitle">{album.attributes.name}</span>
                  <span className="artist">{album.attributes.artistName}</span>
                </div>
              )
            })
          }
        </div>
      </Container>
    );
  }

}

export default Albums;
