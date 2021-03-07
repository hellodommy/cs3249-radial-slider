import React from "react";

function radToDegree(rad) {
  /**
   * For testing purposes
   */
  return rad * 180 / Math.PI;
}

function degToRad(deg) {
  return deg * Math.PI / 180;
}

function getKnobCoords(rad) {
  return [100 - Math.cos(rad) * 100, 100 - Math.sin(rad) * 100];
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
      xknob: 100 - Math.cos(degToRad(174)) * 100,
      yknob: 100 - Math.sin(degToRad(174)) * 100,
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
        this.props.onTemperatureChange(tt);
      } else if (radians >=0 && radians < Math.PI / 2) {
        const adjRad = radians + Math.PI / 2;
        const tt = Math.floor(adjRad / (Math.PI / 15) + 50);
        this.props.onTemperatureChange(tt);
      } else if (radians >= Math.PI / 2 && radians <= Math.PI) {
        const adjRad = radians + Math.PI / 2;
        const tt = Math.floor(adjRad / (Math.PI / 15) + 50);
        this.props.onTemperatureChange(tt);
      } else {
        const adjRad = radians + (2.5 * Math.PI);
        const tt = Math.floor(adjRad / (Math.PI / 15) + 50);
        this.props.onTemperatureChange(tt);
      }
      // mathpi / 15 = 1 fahrenheit
      this.setState({ xknob: getKnobCoords(radians)[0] });
      this.setState({ yknob: getKnobCoords(radians)[1] });
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
    const targetTemperature = this.props.targetTemperature;

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
        <p>{targetTemperature}</p>
      </div>
    );
  }
}

export default RadialSlider;
