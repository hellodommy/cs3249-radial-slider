import React from "react";

function radToDegree(rad) {
  return rad * 180 / Math.PI;
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
      xknob: 186.7,
      yknob: 50,
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
    this.setState({ xcord: e.pageX, ycord: e.pageY });
    if (this.state.isMouseDown) {
      const centreX = this.state.windowWidth / 2; // because circle is in horizontal centre of page
      const centreY = 110; // 10px margin and 100px radius
      const distFromX = centreX - this.state.xcord;
      const distFromY = centreY - this.state.ycord;
      const radians = Math.atan2(distFromY, distFromX);
      const tempX = Math.cos(radians) * 100;
      const tempY = Math.sin(radians) * 100;
      this.setState({xknob: 100 - tempX});
      this.setState({yknob: 100 - tempY});
      console.log(radToDegree(radians))
    }
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
    const xknob = this.state.xknob;
    const yknob = this.state.yknob;
    const isMouseDown = this.state.isMouseDown;
    const windowWidth = this.state.windowWidth;

    return (
      <div>
        <svg width="200px" height="200px" overflow="visible">
          <circle
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            fill="#9CA3AF"
            cx="100px"
            cy="100px"
            r="100px"
          />
          <circle
            fill="#ffafaf"
            cx={xknob}
            cy={yknob}
            r="10px"
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            style={{ cursor: "pointer" }}
          />
        </svg>
        <p>X-Coord: {xcord}</p>
        <p>Y-Coord: {ycord}</p>
        <p>Is mouse down?: {isMouseDown ? "true" : "false"}</p>
        <p>Window width: {windowWidth}</p>
      </div>
    );
  }
}

export default RadialSlider;
