export const tilePositionData = [
  [
    { positionX: -53.5, positionZ: -53.5 },
    { positionX: 0, positionZ: -53.5 },
    { positionX: 53.5, positionZ: -53.5 },
  ],
  [
    { positionX: -53.5, positionZ: 0 },
    { positionX: 0, positionZ: 0 },
    { positionX: 53.5, positionZ: 0 },
  ],
  [
    { positionX: -53.5, positionZ: 53.5 },
    { positionX: 0, positionZ: 53.5 },
    { positionX: 53.5, positionZ: 53.5 },
  ],
];

export const startingTileData: {
  [key: string]: {
    positionX: number;
    positionZ: number;
    yRotationInDegrees: number;
  };
} = {
  tileA: {
    positionX: tilePositionData[0][0].positionX,
    positionZ: tilePositionData[0][0].positionZ,
    yRotationInDegrees: 180,
  },
  tileB: {
    positionX: tilePositionData[0][1].positionX,
    positionZ: tilePositionData[0][1].positionZ,
    yRotationInDegrees: 180,
  },
  tileC: {
    positionX: tilePositionData[0][2].positionX,
    positionZ: tilePositionData[0][2].positionZ,
    yRotationInDegrees: 180,
  },
  tileD: {
    positionX: tilePositionData[1][0].positionX,
    positionZ: tilePositionData[1][0].positionZ,
    yRotationInDegrees: 180,
  },
  tileE: {
    positionX: tilePositionData[1][1].positionX,
    positionZ: tilePositionData[1][1].positionZ,
    yRotationInDegrees: 180,
  },
  tileF: {
    positionX: tilePositionData[1][2].positionX,
    positionZ: tilePositionData[1][2].positionZ,
    yRotationInDegrees: 180,
  },
  tileG: {
    positionX: tilePositionData[2][0].positionX,
    positionZ: tilePositionData[2][0].positionZ,
    yRotationInDegrees: 180,
  },
  tileH: {
    positionX: tilePositionData[2][1].positionX,
    positionZ: tilePositionData[2][1].positionZ,
    yRotationInDegrees: 180,
  },
};

export const startingTilePositionMatrix = [
  ["A", "B", "C"],
  ["D", "E", "F"],
  ["G", "H", ""],
];
export const acceptableTileLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
