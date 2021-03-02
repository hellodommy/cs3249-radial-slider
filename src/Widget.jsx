import React from "react";
import TemperatureInput from "./TemperatureInput";

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.handleTempChange = this.handleTempChange.bind(this);
    this.state = { currTemperature: 72 };
  }

  handleTempChange(currTemperature) {
    this.setState({ currTemperature });
  }

  render() {
    const currTemperature = this.state.currTemperature;

    return (
      <div>
        <p>Current temperature: {currTemperature}°F</p>
        <TemperatureInput
          currTemperature={currTemperature}
          onTemperatureChange={this.handleTempChange}
        />
      </div>
    );
  }
}

export default Widget;
