import React from "react";
import Slider from "@material-ui/core/Slider";

class RadialSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { targetTemperature: 72 };
  }

  handleChange(targetTemperature) {
    this.setState({ targetTemperature });
  }

  render() {
    const targetTemperature = this.state.targetTemperature;

    return (
      <div>
        <Slider
          defaultValue={targetTemperature}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          min={50}
          max={80}
        />
      </div>
    );
  }
}

export default RadialSlider;