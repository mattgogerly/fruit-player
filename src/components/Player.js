import React, { Component } from 'react';
import PlaybackControls from './PlaybackControls.js';
import { Container, Row, Col, Progress } from 'reactstrap';
import './css/Player.css'

class Player extends Component {

  constructor(props) {
    super(props);

    this.musicKit = window.MusicKit.getInstance();

    this.state = {
      mediaItem: this.musicKit.player.nowPlayingItem,
      playbackTime: {
        currentPlaybackDuration: this.musicKit.player.currentPlaybackDuration,
        currentPlaybackTime: this.musicKit.player.currentPlaybackTime,
        currentPlaybackTimeRemaining: this.musicKit.player.currentPlaybackTimeRemaining
      },
      hover: false,
      tooltipLeft: 0
    }

    this.mediaPlaybackError = this.mediaPlaybackError.bind(this);
    this.musicKit.addEventListener(window.MusicKit.Events.mediaPlaybackError, this.mediaPlaybackError);
    this.mediaItemDidChange = this.mediaItemDidChange.bind(this);
    this.musicKit.addEventListener(window.MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange);
    this.playbackTimeDidChange = this.playbackTimeDidChange.bind(this);
    this.musicKit.addEventListener(window.MusicKit.Events.playbackTimeDidChange, this.playbackTimeDidChange);

    this.formatTime = this.formatTime.bind(this);

    this.search("taylor swift enchanted").then(items => {
      this.queue(items.songs.data);
    });
  }

  mediaPlaybackError = (event) => {
    console.error(event);
  }

  mediaItemDidChange = (event) => {
    this.setState({mediaItem: event.item});
  }

  playbackTimeDidChange = (event) => {
    this.setState({playbackTime: event});
  }

  search(string) {
    return this.musicKit.api.search(string, null);
  }

  formatURL(url, height, width) {
    return window.MusicKit.formatArtworkURL(url, height, width);
  }

  queue(descriptor) {
    this.musicKit.setQueue(descriptor).then(items => {
      items.items.forEach(i => i.sourceId = i.id);
      this.musicKit.player.changeToMediaItem(items.item(descriptor.startPosition || 0));
    });
  }

  getNowPlaying() {
    if (this.state.mediaItem) {
      return (
        <div className="nowPlaying">
          <div>
            <img className="artwork" src={this.formatURL(this.state.mediaItem.attributes.artwork)} alt="" />
          </div>
          <div>
            <span className="songTitle">{this.state.mediaItem.title}</span>
            <span className="artistName">{this.state.mediaItem.attributes.artistName}</span>
          </div>
        </div>
      )
    } else {
      return "Placeholder";
    }
  }

  calculateTimeAsPercentage(xDim) {
    var screenWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth,
                        document.body.offsetWidth,
                        document.documentElement.offsetWidth,
                        document.documentElement.clientWidth
                      );
    return Math.floor(xDim / screenWidth * this.state.playbackTime.currentPlaybackDuration);
  }

  formatTime(value) {
    var minutes = Math.floor(value / 60);
    var seconds = value - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }

  skipToTime(e) {
    e.persist();
    let widthClicked = e.pageX;
    var calc = this.calculateTimeAsPercentage(widthClicked);
    this.musicKit.player.seekToTime(calc);
  }

  handleMouseIn(e) {
    e.persist();

    this.setState({ hover: true, tooltipLeft: e.pageX });
  }

  handleMouseOut(e) {
    e.persist();
    this.setState({ hover: false });
  }

  handleMouseMove(e) {
    e.persist();
    this.setState({ tooltipLeft: e.pageX });
  }

  render() {
    const tooltipStyle = {
      position: 'relative',
      bottom: '6px',
      left: (this.state.tooltipLeft - 30) + 'px', // subtract 50% of width + padding
      display: this.state.hover ? 'inline-block' : 'none'
    }

    return (
      <Container fluid={true}>
        <div className="progressBar"
          onMouseOver={e => this.handleMouseIn(e)}
          onMouseOut={e => this.handleMouseOut(e)}
          onMouseMove={e => this.handleMouseMove(e)}
          onClick={e => this.skipToTime(e)}
        >
          <div className="seekerTooltip" style={tooltipStyle}>
            <span>{this.formatTime(this.calculateTimeAsPercentage(this.state.tooltipLeft))}</span>
          </div>
          <Progress
            color="danger"
            value={this.state.playbackTime.currentPlaybackTime / this.state.playbackTime.currentPlaybackDuration * 100}
          />
        </div>
        <Row>
          <Col xs="2">
            {this.getNowPlaying()}
          </Col>
          <Col xs="8">
            <div>
              <PlaybackControls
                currentPlaybackTime={this.state.playbackTime.currentPlaybackTime}
                currentPlaybackDuration={this.state.playbackTime.currentPlaybackDuration}
                formatTime={this.formatTime}
              />
            </div>
          </Col>
          <Col xs="2">

          </Col>
        </Row>
      </Container>
    )
  }
}

export default Player;
