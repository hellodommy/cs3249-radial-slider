import React from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

class Thermometer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
    this.state = { error: false };
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  handleClickAway(e) {
    if (this.props.currTemperature >= 32 && this.props.currTemperature <= 100) {
      this.setState({ error: false });
    } else {
      console.log(this.props.currTemperature);
      this.setState({ error: true });
    }
  }

  render() {
    const currTemperature = this.props.currTemperature;
    const error = this.state.error;

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <FormControl>
          <Input
            error={error}
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
            Current Temperature
          </FormHelperText>
        </FormControl>
      </ClickAwayListener>
    );
  }
}

export default Thermometer;
