import React from "react";
import Slider from "@material-ui/core/Slider";

class LinearSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.props.onTemperatureChange(value)
  }

  render() {
    const targetTemperature = this.props.targetTemperature;

    return (
      <div>
        <Slider
          value={targetTemperature}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
          min={50}
          max={80}
        />
      </div>
    );
  }
}

export default LinearSlider;
