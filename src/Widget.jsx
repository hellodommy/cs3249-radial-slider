import React from "react";
import TemperatureInput from "./TemperatureInput";
import RadialSlider from "./RadialSlider";
import Grid from "@material-ui/core/Grid";

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
        <Grid
          container
          spacing={3}
          justify={"center"}
          style={{ marginTop: "5rem" }}
        >
          <Grid item xs={4}>
            <RadialSlider />
          </Grid>
          <Grid item xs={12}>
            <p>Current temperature: {currTemperature}°F</p>
            <TemperatureInput
              currTemperature={currTemperature}
              onTemperatureChange={this.handleTempChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Widget;
