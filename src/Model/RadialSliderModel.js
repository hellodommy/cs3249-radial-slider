export const multiple = 270 / 31; // angle range of each fahrenheit

export function calculateTargetTemp(deg) {
  /**
   * Determines the target temperature depending on the angle
   */
  const normalisedDeg = normaliseDeg(deg)
  const targetTemperature = Math.floor(normalisedDeg / multiple) + 50;
  return targetTemperature;
}

export function getAngle(windowWidth, mouseX, mouseY) {
  /**
   * Get angle of rotation
   */
  const centreX = windowWidth / 2; // circle is in horizontal centre of page
  const centreY = 250; // 50px margin and 200px radius
  const distFromX = centreX - mouseX;
  const distFromY = centreY - mouseY;
  const deg = radToDeg(Math.atan2(distFromY, distFromX));
  return deg;
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

function normaliseDeg(deg) {
  /**
   * Adjusts the angle to relative axis starting at -45deg
   */
  if (deg >= -45 && deg <= 180) {
    return deg + 45;
  } else {
    return deg + 405;
  }
}
