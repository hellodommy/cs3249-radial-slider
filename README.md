# CS3249 Assignment 3 (Individual) - Custom UI Component

This is a smart thermostat user interface developed in React JS with XState.

[Live Demo](http://www.dominiqueng.com/cs3249-radial-slider/)

Target temperature range: 50°F to 80°F
Current temperature range (for testing): 32°F to 100°F

To use, run `npm install` to get the necessary packages.

## Folder description
| Folder/File            | Description                                                                   |
|------------------------|-------------------------------------------------------------------------------|
| View                   | View components of thermostat UI                                              |
| View/MainPanelView.jsx | View component of MainPanel                                                   |
| View/RadialSliderView  | View and View-Model components of RadialSlider, View component of Thermometer |
| Thermometer.jsx        | View-Model and Model component of Thermometer                                 |
| ThermostatMachine.jsx  | Model component of RadialSliderView (state machine implemented in XState)     |

## Tasks
Develop a smart thermostat user interface to control cooling and heating. 
- When it is hot, the thermostat should run the air conditioner (AC) to cool
- When it is cold, it should run the heater to heat
- When it is within a comfortable temperature range, neither AC or heater should be on. 

## References
- Form component - [Material UI](https://material-ui.com/components/text-fields/)
- Handling state - [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)
- Getting onMouseMove events from React - [Stack Overflow](https://stackoverflow.com/questions/42182481/getting-mouse-coordinates-in-react-and-jquery)
- Mouse Events - [SyntheticEvent](https://reactjs.org/docs/events.html#mouse-events)
- Getting responsive height and width of window to calculate centre of circle - [Stack Overflow](https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs)
- Introduction to XState - [YouTube](https://youtu.be/73Ch_EL4YVc)
  