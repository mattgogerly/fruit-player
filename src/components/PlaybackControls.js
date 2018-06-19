import React, { Component } from 'react';
import { Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import './css/PlaybackControls.css';

class PlaybackControls extends Component {
  constructor(props) {
    super(props);

    this.musicKit = window.MusicKit.getInstance();
    this.state = {
      playbackState: window.MusicKit.PlaybackStates.none
    }

    this.playbackStateDidChange = this.playbackStateDidChange.bind(this);
    this.musicKit.addEventListener(window.MusicKit.Events.playbackStateDidChange, this.playbackStateDidChange);
  }

  playbackStateDidChange = (event) => {
    this.setState({playbackState: event.state});
  }

  play = () => {
    this.musicKit.player.play();
  }

  pause = () => {
    this.musicKit.player.pause();
  }

  previous = () => {
    this.musicKit.player.skipToPreviousItem();
  }

  next = () => {
    this.musicKit.player.skipToNextItem();
  }

  getPlayPause = () => {
    if (this.state.playbackState !== window.MusicKit.PlaybackStates.playing) {
      return (
          <Button className="control" onClick={this.play}><FontAwesome name="play" size="2x"/></Button>
      )
    } else {
      return (
          <Button className="control" onClick={this.pause}><FontAwesome name="pause" size="2x"/></Button>
      )
    }
  }

  render() {
    return (
      <div className="controls">
        <span className="time">{this.props.formatTime(this.props.currentPlaybackTime)}</span>
        <Button className="control" onClick={this.previous}><FontAwesome name="backward" size="2x" /></Button>
        {this.getPlayPause()}
        <Button className="control" onClick={this.next}><FontAwesome name="forward" size="2x"/></Button>
        <span className="time-right">{this.props.formatTime(this.props.currentPlaybackDuration)}</span>
      </div>
    )
  }
}

export default PlaybackControls;
