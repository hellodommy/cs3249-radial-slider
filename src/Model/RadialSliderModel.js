export const multiple = 270 / 31; // angle range of each fahrenheit

export function calculateTargetTemp(coords) {
  /**
   * Determines the target temperature depending on the mouse coordinates
   */
  const distFromX = coords[0];
  const distFromY = coords[1];
  const rad = Math.atan2(distFromY, distFromX);
  const normaliseDeg = radToDeg(normaliseRad(rad));
  const targetTemperature = Math.floor(normaliseDeg / multiple) + 50;
  return targetTemperature;
}

export function degToRad(deg) {
  /**
   * Helper function to convert degree to radians
   */
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad) {
  /**
   * Helper function to convert radians to degree
   */
  return (rad * 180) / Math.PI;
}

function normaliseRad(rad) {
  /**
   * Adjusts the angle to relative axis starting at -45deg
   */
  if (rad >= -Math.PI / 4 && rad <= Math.PI) {
    return rad + Math.PI / 4;
  } else {
    return rad + 2.25 * Math.PI;
  }
}
