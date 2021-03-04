import React from "react";

function getRad(deg) {
  return deg / 180 * Math.PI
}



class RadialSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      xcord: 0,
      ycord: 0,
      isMouseDown: false,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  handleMouseMove(e) {
    this.setState({ xcord: e.screenX, ycord: e.screenY });
  }

  handleMouseDown(e) {
    this.setState({ isMouseDown: true });
  }

  handleMouseUp(e) {
    this.setState({ isMouseDown: false });
  }

  render() {
    const xcord = this.state.xcord;
    const ycord = this.state.ycord;
    const isMouseDown = this.state.isMouseDown;
    const windowWidth = this.state.windowWidth;

    return (
      <div>
        <p>X-Coord: {xcord}</p>
        <p>Y-Coord: {ycord}</p>
        <p>Is mouse down?: {isMouseDown ? "true" : "false"}</p>
        <p>Window width: {windowWidth}</p>
        <div>
          <svg width="200px" height="200px" overflow="visible">
            <circle
              onMouseDown={this.handleMouseDown}
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.handleMouseUp}
              strokeWidth="1rem"
              fill="#9CA3AF"
              stroke="#000000"
              cx="100px"
              cy="100px"
              r="100px"
            />
            <circle
              fill="#ffafaf"
              cx="186.7px"
              cy="50px"
              r="10px"
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default RadialSlider;
