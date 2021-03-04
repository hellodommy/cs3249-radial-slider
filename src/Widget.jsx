import React from "react";
import Thermometer from "./Thermometer";
import LinearSlider from "./LinearSlider";
import Grid from "@material-ui/core/Grid";
import RadialSlider from "./RadialSlider";

const dT = 2;
const dTCool = 1.5;
const dTHeat = 1.5;

function getMode(currTemperature, targetTemperature) {
  if (currTemperature < targetTemperature - dT - dTHeat) {
    return "heating";
  } else if (currTemperature > targetTemperature + dT + dTCool) {
    return "cooling";
  } else {
    return "off";
  }
}

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.handleCurrTempChange = this.handleCurrTempChange.bind(this);
    this.handleTargetTempChange = this.handleTargetTempChange.bind(this);
    this.state = { currTemperature: 72, targetTemperature: 72, mode: "off" };
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
    const mode = getMode(currTemperature, targetTemperature);

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
            <p>Mode: {mode}</p>
          </Grid>
          <Grid>
            <RadialSlider />
          </Grid>
          <Grid item xs={4} style={{ width: "100%" }}>
            <LinearSlider
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
