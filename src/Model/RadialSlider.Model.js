// TODO: Clean up conditional statement
export function calculateTargetTemp(coords) {
  /**
   * Determines the target temperature depending on the mouse coordinates
   */
  const distFromX = coords[0];
  const distFromY = coords[1];
  const rad = Math.atan2(distFromY, distFromX);
  let adjRad = 0;
  if (rad <= 180 && rad > -Math.PI / 2) {
    adjRad = rad + Math.PI / 2;
  } else if (rad >= 0 && rad < Math.PI / 2) {
    adjRad = rad + Math.PI / 2;
  } else if (rad >= Math.PI / 2 && rad <= Math.PI) {
    adjRad = rad + Math.PI / 2;
  } else {
    adjRad = rad + 2.5 * Math.PI;
  }
  const targetTemperature = Math.floor(adjRad / (Math.PI / 15) + 50); // mathpi / 15 = 1 fahrenheit
  return targetTemperature;
}

export function calculateMode(temp) {
  /**
   * Determines the mode of the thermostat depending on the current and target temperature
   */
	const currTemp = temp[0];
	const targetTemp = temp[1];
	const dT = 2;
	const dTCool = 1.5;
	const dTHeat = 1.5;
	if (currTemp < targetTemp - dT - dTHeat) {
    return "heating";
  } else if (currTemp > targetTemp + dT + dTCool) {
    return "cooling";
  } else {
    return "off";
  }
}
