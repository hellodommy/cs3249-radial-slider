import React from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const currTemperature = this.props.currTemperature;
    return (
      <FormControl>
        <Input
          type="number"
          id="current-temperature-input"
          value={currTemperature}
          onChange={this.handleChange}
          endAdornment={<InputAdornment position="end">°F</InputAdornment>}
          aria-describedby="current-temperature-input-helper-text"
          inputProps={{
            "aria-label": "currTemp",
          }}
        />
        <FormHelperText id="current-temperature-input-helper-text">
          Current Temperature (testing purposes)
        </FormHelperText>
      </FormControl>
    );
  }
}

export default TemperatureInput;
