import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCheck, faPlus, faClock, faList } from '@fortawesome/free-solid-svg-icons';
import './css/Songs.css';

library.add(faHeart, faCheck, faPlus, faClock, faList);

class Songs extends Component {

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
        items: this.props.songs.map(i => {
          return {
            attributes: i.attributes,
            id: i.id,
            container: {
              id: i.id,
              name: 'library-songs'
            }
          }
        }),
        startPosition: this.props.songs.indexOf(song)
      }
    );
  }

  prependQueue(song) {
    // submitted to apple
    this.musicKit.player.queue.prepend(new window.MusicKit.MediaItem(song));
  }

  getLibraryIcon(song) {
    if (song.type === 'library-songs') {
      return (
        <FontAwesomeIcon icon={['fas', 'check']} />
      )
    } else {
      return (
        <FontAwesomeIcon icon={['fas', 'plus']} />
      )
    }
  }

  render() {
    var songs = this.props.songs;

    return (
      <Container fluid={true}>
        <h4 className="display-4 title">Songs</h4>
        <Table hover>
          <thead>
            <tr>
              <th className="tableImg"></th>
              <th className="tableTitle">Title</th>
              <th className="tableArtist">Artist</th>
              <th className="tableAlbum">Album</th>
              <th className="tableDuration"><FontAwesomeIcon icon={faClock} /></th>
              <th className="tableLibrary">Library</th>
              <th className="tableQueue">Queue</th>
            </tr>
          </thead>
          <tbody>
            {
              songs.map((song, index) => {
                return (
                  <tr key={index}>
                    <td><img src={this.formatArtworkUrl(song.attributes.artwork, 40, 40)} alt="" /></td>
                    <td className="tableTitle" onClick={() => this.prepareQueue(song)}>{song.attributes.name}</td>
                    <td className="tableArtist">{song.attributes.artistName}</td>
                    <td className="tableAlbum">{song.attributes.albumName}</td>
                    <td className="tableDuration">{this.formatMillis(song.attributes.durationInMillis)}</td>
                    <td className="tableLibrary">{this.getLibraryIcon(song)}</td>
                    <td className="tableQueue" onClick={() => this.prependQueue(song)}><FontAwesomeIcon icon='list' /></td>
                  </tr>
                )
              }
            )}
          </tbody>
        </Table>
      </Container>
    );
  }

}

export default Songs;
