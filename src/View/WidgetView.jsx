import React from "react";
import Grid from "@material-ui/core/Grid";
import Thermometer from '../Thermometer';
import RadialSliderView from './RadialSliderView';
import { calculateMode } from "../Model/RadialSlider.Model";

class WidgetView extends React.Component {
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
    const mode = calculateMode([currTemperature, targetTemperature]);

    return (
      <div>
        <Grid
          container
          direction="column"
          spacing={3}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={4} style={{ width: "100%", marginTop: "50px" }}>
            <RadialSliderView
              onTemperatureChange={this.handleTargetTempChange}
              targetTemperature={targetTemperature}
              currTemperature={currTemperature}
            />
          </Grid>
          <Grid item xs={4}>
            <p>Mode: {mode}</p>
            <p>Current temperature: {currTemperature}°F</p>
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

export default WidgetView;
