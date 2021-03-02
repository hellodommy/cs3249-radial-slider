import React from "react";
import Thermometer from "./Thermometer";
import RadialSlider from "./RadialSlider";
import Grid from "@material-ui/core/Grid";

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.handleCurrTempChange = this.handleCurrTempChange.bind(this);
    this.handleTargetTempChange = this.handleTargetTempChange.bind(this);
    this.state = { currTemperature: 72, targetTemperature: 72 };
  }

  handleCurrTempChange(currTemperature) {
    this.setState({ currTemperature });
  }

  handleTargetTempChange(targetTemperature) {
      this.setState({ targetTemperature });
  }

  render() {
    const currTemperature = this.state.currTemperature;
    const targetTemperature = this.state.targetTemperature;

    return (
      <div>
        <Grid
          container
          direction="column"
          spacing={3}
          justify="center"
          alignItems="center"
          style={{ marginTop: "2rem" }}
        >
          <Grid item xs={4}>
            <p>Target temperature: {targetTemperature}°F</p>
            <p>Current temperature: {currTemperature}°F</p>
          </Grid>
          <Grid item xs={4} style={{ width: "100%" }}>
            <RadialSlider
              targetTemperature={targetTemperature}
              onTemperatureChange={this.handleTargetTempChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Thermometer
              currTemperature={currTemperature}
              onTemperatureChange={this.handleCurrTempChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Widget;
