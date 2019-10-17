import React, { Component } from 'react';

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.myVideo = React.createRef();
  }
  render() {
    return (
      <div>
        <video ref={this.myVideo} width="320" height="176" controls>
          <source src="desafio-2030.mp4" type="video/mp4" />
        </video>
        <div>
          <button onClick={() => {
            this.myVideo.current.play();
          }}>
            Play
          </button>
          <button onClick={() => {
            this.myVideo.current.pause();
          }}>
            Pause
          </button>
        </div>
      </div>
    );
  }
}
