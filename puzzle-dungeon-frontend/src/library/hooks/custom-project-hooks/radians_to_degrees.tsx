export const radiansToDegrees = (radian: number) => {
  const degrees = radian * (180 / Math.PI);
  return degrees.toFixed(2);
};
