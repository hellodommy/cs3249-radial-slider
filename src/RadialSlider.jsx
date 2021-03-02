import React from "react";
import Slider from "@material-ui/core/Slider";

class RadialSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { targetTemperature: '72' };
  }

  handleChange(event, value) {
    this.setState({ targetTemperature: value });
  }

  render() {
    const targetTemperature = this.state.targetTemperature;

    return (
      <div>
        <Slider
          value={targetTemperature}
          onChange={this.handleChange}
          valueLabelDisplay="on"
          min={50}
          max={80}
        />
        <p>Target temperature: {targetTemperature}°F</p>
      </div>
    );
  }
}

export default RadialSlider;