export const degreesToRadians = (degrees: number) => {
  const radians = degrees * (Math.PI / 180);
  return radians.toFixed(2);
};
