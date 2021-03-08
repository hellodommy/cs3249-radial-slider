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
