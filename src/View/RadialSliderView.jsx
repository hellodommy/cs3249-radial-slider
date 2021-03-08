import React from "react";
import { Machine, interpret } from "xstate";

import { calculateTargetTemp } from '../Model/RadialSlider.Model'
import thermostatMachine from "../ThermostatMachine";

function degToRad(deg) {
  /**
   * Helper function to convert degree to radians
   */
  return (deg * Math.PI) / 180;
}

function getKnobCoords(mouseCoords) {
  /**
   * Calculates where the knob should be based on mouse coordinates
   */
  const rad = Math.atan2(mouseCoords[1], mouseCoords[0]);
  return [200 - Math.cos(rad) * 200, 200 - Math.sin(rad) * 200];
}

class RadialSliderView extends React.Component {

  service = interpret(thermostatMachine).onTransition((current) =>
    this.setState({ current })
  );
  
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
      xknob: 200 - Math.cos(degToRad(174)) * 200,
      yknob: 200 - Math.sin(degToRad(174)) * 200,
      xcord: 0,
      ycord: 0,
      isMouseDown: false,
      current: thermostatMachine.initialState,
    };
  }

  componentDidMount() {
    this.service.start();   
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    this.service.stop();
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    /**
     * Recalculate coordinates of horizontal centre of circle when window is resized
     */
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  handleMouseMove(e) {
    this.setState({ xcord: e.pageX, ycord: e.pageY });
    if (this.state.isMouseDown) {
      const centreX = this.state.windowWidth / 2; // circle is in horizontal centre of page
      const centreY = 250; // 50px margin and 200px radius
      const distFromX = centreX - this.state.xcord;
      const distFromY = centreY - this.state.ycord;
      const targetTemperature = calculateTargetTemp([distFromX, distFromY]);
      this.props.onTemperatureChange(targetTemperature);
      const knobCoords = getKnobCoords([distFromX, distFromY]);
      this.setState({ xknob: knobCoords[0], yknob: knobCoords[1] });
      this.service.send({
        type: "TARGET_TEMP_CHANGE",
        targetTemp: targetTemperature,
      });
    }
  }

  handleMouseDown(e) {
    this.setState({ isMouseDown: true });
  }

  handleMouseUp(e) {
    this.setState({ isMouseDown: false });
  }

  render() {
    const targetTemperature = this.state.current.context.targetTemp;
    const mode = this.state.current.value;
    const colour = this.state.current.context.colour;
    const xknob = this.state.xknob;
    const yknob = this.state.yknob;
    const { currTemperature } = this.props;
    return (
      <div>
        <svg width="400px" height="400px" overflow="visible">
          <circle
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            fill={colour}
            cx="200"
            cy="200"
            r="200"
          />
          <circle
            fill="#9CA3AF"
            cx={xknob}
            cy={yknob}
            r="16"
            fillOpacity="0.2"
          />
          <circle
            fill="#F9FAFB"
            cx={xknob}
            cy={yknob}
            r="10"
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            style={{ cursor: "pointer" }}
          />
          <text x="200" y="200" text-anchor="middle" fontSize="3rem">
            {targetTemperature}°F
          </text>
          <text x="200" y="250" text-anchor="middle" fontSize="1rem">
            Current: {currTemperature}°F
          </text>
        </svg>
        <p>Mode: {mode}</p>
      </div>
    );
  }
}

export default RadialSliderView;
