import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import './css/Songs.css'

class Song extends Component {

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
              name: 'library-song'
            }
          }
        }),
        startPosition: this.props.songs.indexOf(song)
      }
    );
  }

  render() {
    var songs = this.props.songs;
    return (
      <Container fluid={true}>
        <h4 className="display-4 title">Songs</h4>
        <hr className="my-2" />
        <Table hover>
          <thead>
            <tr>
              <th className="tableImg"></th>
              <th className="tableTitle">Title</th>
              <th className="tableOther">Artist</th>
              <th className="tableOther">Album</th>
              <th className="tableDuration"><FontAwesome name="clock" /></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => {
              return(
                <tr key={index} onClick={() => this.prepareQueue(song)}>
                  <td><img src={this.formatArtworkUrl(song.attributes.artwork, 40, 40)} alt="" /></td>
                  <td>{song.attributes.name}</td>
                  <td>{song.attributes.artistName}</td>
                  <td>{song.attributes.albumName}</td>
                  <td className="tableDuration">{this.formatMillis(song.attributes.durationInMillis)}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    );
  }

}

export default Song;
