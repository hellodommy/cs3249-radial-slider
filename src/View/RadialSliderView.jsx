import React from "react";
import { Machine, interpret } from "xstate";

import { calculateTargetTemp, getAngle, degToRad, multiple } from '../Model/RadialSliderModel'
import thermostatMachine from "../ThermostatMachine";
import Thermometer from "../Thermometer";

/**
 * Radial Slider View-Model Component
 */
function getKnobCoords(deg) {
  /**
   * Calculates where the knob should be based on angle
   */
  const rad = degToRad(deg);
  return [200 - Math.cos(rad) * 200, 200 - Math.sin(rad) * 200];
}

function getColour(mode) {
  /**
   * Determines colour of radial slider depending on mode
   */
  switch (mode) {
    case "off":
      return "#E5E7EB";
    case "cooling":
      return "#BFDBFE";
    case "heating":
      return "#FECACA";
    default:
      throw "Unkown mode"
  }
}

const xknobStart = 200 - Math.cos(degToRad((72 - 50) * multiple - 45)) * 200;
const yknobStart = 200 - Math.sin(degToRad((72 - 50) * multiple - 45)) * 200;

class RadialSliderView extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleCurrTempChange = this.handleCurrTempChange.bind(this);
    this.updateTarget = this.updateTarget.bind(this);
    this.rotationDrag = this.rotationDrag.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.state = {
      windowWidth: window.innerWidth,
      xknob: xknobStart,
      yknob: yknobStart,
      isMouseDown: false,
      current: thermostatMachine.initialState,
    };
  }

  service = interpret(thermostatMachine).onTransition((current) =>
    this.setState({ current })
  );

  componentDidMount() {
    this.service.start();
    this.updateWindowDimensions();
    window.addEventListener("updateTarget", this.updateTarget);
    window.addEventListener("rotationDrag", this.rotationDrag);
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    this.service.stop();
    window.removeEventListener("updateTarget", this.updateTarget);
    window.removeEventListener("rotationDrag", this.rotationDrag);
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

  updateTarget(e) {
    /**
     * Update target temperature in state machine
     */
    this.service.send({
      type: "TARGET_TEMP_CHANGE",
      targetTemp: e.detail.targetTemp,
    });
  }

  handleCurrTempChange(currTemperature) {
    /**
     * Update current temperature in state machine
     */
    this.service.send({
      type: "CURR_TEMP_CHANGE",
      currTemp: currTemperature,
    });
  }

  rotationDrag(e) {
    const deg = getAngle(
      this.state.windowWidth,
      e.detail.mouseX,
      e.detail.mouseY
    );
    if (deg >= -45 || deg <= -135) { // if angle is in valid zone
      const knobCoords = getKnobCoords(deg);
      this.setState({ xknob: knobCoords[0], yknob: knobCoords[1] });

      const newTargetTemp = calculateTargetTemp(deg);
      if (newTargetTemp !== this.state.current.context.targetTemp) {
        var updateTarget = new CustomEvent("updateTarget", {
          detail: {
            targetTemp: newTargetTemp,
          },
        });
        window.dispatchEvent(updateTarget);
      }
    }
  }

  handleMouseMove(e) {
    if (this.state.isMouseDown) {
      var rotationDrag = new CustomEvent("rotationDrag", {
        detail: {
          mouseX: e.pageX,
          mouseY: e.pageY,
        }
      });
      window.dispatchEvent(rotationDrag);
    }
  }

  handleMouseDown(e) {
    this.setState({ isMouseDown: true });
  }

  handleMouseUp(e) {
    this.setState({ isMouseDown: false });
  }

  render() {
    /**
     * Values taken from XState Context
     */
    const currTemperature = this.state.current.context.currTemp;
    const targetTemperature = this.state.current.context.targetTemp;
    const mode = this.state.current.value;
    const colour = getColour(mode);

    /**
     * Values taken from React State
     */
    const xknob = this.state.xknob;
    const yknob = this.state.yknob;

    /**
     * Radial Slider View Component
     */
    return (
      <div>
        <svg width="400px" height="400px" overflow="visible">
          <circle
            id="slider-body"
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            fill={colour}
            cx="200"
            cy="200"
            r="200"
          />
          <circle
            id="knob-shadow"
            fill="#9CA3AF"
            cx={xknob}
            cy={yknob}
            r="16"
            fillOpacity="0.2"
          />
          <circle
            id="knob"
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

        {/* External UI (for testing) */}
        <Thermometer
          currTemperature={currTemperature}
          onTemperatureChange={this.handleCurrTempChange}
        />
      </div>
    );
  }
}

export default RadialSliderView;
