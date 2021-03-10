import React from "react";
import { Machine, interpret } from "xstate";

import thermostatMachine from "../ThermostatMachine";
import Thermometer from "../Thermometer";

/**
 * Radial Slider View-Model Component
 */
function getAngle(windowWidth, mouseX, mouseY) {
  /**
   * Get angle of rotation
   */
  const centreX = windowWidth / 2; // circle is in horizontal centre of page
  const centreY = 250; // 50px margin and 200px radius
  const distFromX = centreX - mouseX;
  const distFromY = centreY - mouseY;
  const deg = radToDeg(Math.atan2(distFromY, distFromX));
  return deg;
}

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
      throw new Error("Unkown mode");
  }
}

const multiple = 270 / 31; // angle range of each fahrenheit

function getScrollDeg(angle, deltaY) {
  /**
   * Determines the angle achieved from scrolling on the slider
   */
  let deg = angle + deltaY * 0.05;
  if (deg >= 180) {
    deg = deg - 360;
  } else if (deg <= -180) {
    deg = 180 + deltaY * 0.05;
  }
  return deg;
}

function calculateTargetTemp(deg) {
  /**
   * Determines the target temperature depending on the angle
   */
  const normalisedDeg = normaliseDeg(deg);
  const targetTemperature = Math.floor(normalisedDeg / multiple) + 50;
  return targetTemperature;
}

function normaliseDeg(deg) {
  /**
   * Helper function to adjust the angle to relative axis starting at -45deg
   */
  if (deg >= -45 && deg <= 180) {
    return deg + 45;
  } else {
    return deg + 405;
  }
}

function degToRad(deg) {
  /**
   * Helper function to convert degree to radians
   */
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  /**
   * Helper function to convert radians to degree
   */
  return (rad * 180) / Math.PI;
}

class RadialSliderView extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleCurrTempChange = this.handleCurrTempChange.bind(this);
    this.updateTarget = this.updateTarget.bind(this);
    this.handleRotationDrag = this.handleRotationDrag.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.state = {
      angle: 12 * multiple + 45,
      windowWidth: window.innerWidth,
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
    window.addEventListener("rotationDrag", this.handleRotationDrag);
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    this.service.stop();
    window.removeEventListener("updateTarget", this.updateTarget);
    window.removeEventListener("rotationDrag", this.handleRotationDrag);
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

  handleRotationDrag(e) {
    const deg = e.detail.deg;
    if ((deg >= -45) || (deg < -135 && deg > -180)) {
      // if angle is in valid zone
      this.setState({ angle: deg });

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

  handleScroll(e) {
    e.preventDefault();
    const deg = getScrollDeg(this.state.angle, e.deltaY);
    var rotationDrag = new CustomEvent("rotationDrag", {
      detail: {
        deg: deg,
      },
    });
    window.dispatchEvent(rotationDrag);
  }

  handleMouseMove(e) {
    if (this.state.isMouseDown) {
      const deg = getAngle(this.state.windowWidth, e.pageX, e.pageY);
      var rotationDrag = new CustomEvent("rotationDrag", {
        detail: {
          deg: deg,
        },
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
    const xknob = getKnobCoords(this.state.angle)[0];
    const yknob = getKnobCoords(this.state.angle)[1];

    /**
     * Radial Slider View Component
     */
    return (
      <div>
        <svg width="400px" height="400px" overflow="visible">
          <circle
            id="slider-body"
            onWheel={this.handleScroll}
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

        {/* External UI (for testing) */}
        <p>
          <Thermometer
            currTemperature={currTemperature}
            onTemperatureChange={this.handleCurrTempChange}
          />
        </p>
      </div>
    );
  }
}

export default RadialSliderView;
