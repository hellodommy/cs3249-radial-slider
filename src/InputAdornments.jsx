import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

function InputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    currTemp: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <FormControl
        className={clsx(
          classes.margin,
          classes.withoutLabel,
          classes.textField
        )}
      >
        <Input
          id="standard-adornment-weight"
          value={values.currTemp}
          onChange={handleChange("currTemp")}
          endAdornment={<InputAdornment position="end">°F</InputAdornment>}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            "aria-label": "currTemp",
          }}
        />
        <FormHelperText id="standard-weight-helper-text">
          Current Temperature (testing purposes)
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default InputAdornments