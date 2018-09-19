import React from 'react';

export default class CountdownTimer extends React.Component {
    constructor() {
      super();
      this.state = { time: {}, seconds: 3};
      this.timer = 0;
      this.countDown = this.countDown.bind(this);

    }
    componentDidMount() {
      this.countDown();
      this.setState({ time: this.convert(this.state.seconds)});
      if (this.timer === 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }

    convert(second){
      let minutes = Math.floor(second % (60 * 60) / 60);
      let seconds = Math.ceil(second % (60 * 60) % 60) - 1;

      return {"minute": minutes, "second": seconds};
    }


    countDown() {
      let seconds = this.state.seconds - 1;
      this.setState({time: this.convert(this.state.seconds), seconds: seconds});
      if (seconds === 0) {
        clearInterval(this.timer);
      }
    }

    renderText(){
      return "Time out. You lost.";
    }

    render() {
      return(
        <div className="time">
          Time Left: {this.state.time.minute}m {this.state.time.second}s
          <p>{this.state.seconds === 0?this.renderText() : ""}</p>
        </div>
      );
    }
  }
