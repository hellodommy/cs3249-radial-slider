import React from "react";

function radToDegree(rad) {
  /**
   * For testing purposes
   */
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
      targetTemp: 72
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
      const centreY = 150; // 10px margin and 100px radius
      const distFromX = centreX - this.state.xcord;
      const distFromY = centreY - this.state.ycord;
      const radians = Math.atan2(distFromY, distFromX);
      if (radians <= 180 && radians > -Math.PI / 2) {
        const adjRad = radians + Math.PI / 2;
        const tt = Math.floor(adjRad / (Math.PI / 15) + 50);
        this.setState({ targetTemp: tt })
      } else if (radians >=0 && radians < Math.PI / 2) {
        const adjRad = radians + Math.PI / 2;
        const tt = Math.floor(adjRad / (Math.PI / 15) + 50);
        this.setState({ targetTemp: tt });
      } else if (radians >= Math.PI / 2 && radians <= Math.PI) {
        const adjRad = radians + Math.PI / 2;
        const tt = Math.floor(adjRad / (Math.PI / 15) + 50);
        this.setState({ targetTemp: tt });
      } else {
        const adjRad = radians + (2.5 * Math.PI);
        const tt = Math.floor(adjRad / (Math.PI / 15) + 50);
        this.setState({ targetTemp: tt });
      }
      // mathpi / 15 = 1 fahrenheit
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

  // TODO: Fix starting point xknob and yknob error at 72F
  render() {
    const xknob = this.state.xknob;
    const yknob = this.state.yknob;
    const targetTemp = this.state.targetTemp;
    return (
      <div>
        <svg width="200px" height="200px" overflow="visible">
          <circle
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            fill="#D1D5DB"
            cx="100"
            cy="100"
            r="100"
          />
          <circle
            fill="#9CA3AF"
            cx={xknob}
            cy={yknob}
            r="10"
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            style={{ cursor: "pointer" }}
          />
          <text x="100" y="100" text-anchor="middle" class="small">
            My
          </text>
        </svg>
        <p>{targetTemp}</p>
      </div>
    );
  }
}

export default RadialSlider;
