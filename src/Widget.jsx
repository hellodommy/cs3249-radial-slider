import React from "react";
import TemperatureInput from "./TemperatureInput";

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.handleTempChange = this.handleTempChange.bind(this);
    this.state = { temperature: "72" };
  }

  handleTempChange(temperature) {
    this.setState({ temperature });
  }

  render() {
    const temperature = this.state.temperature;

    return (
      <div>
        <p>Current temperature: {temperature}°F</p>
        <TemperatureInput
          temperature={temperature}
          onTemperatureChange={this.handleTempChange}
        />
      </div>
    );
  }
}

export default Widget;
