export const tilePositionData = [
  [
    {
      positionX: -62.5,
      positionZ: -28.5,
      positionY: 320,
      rotationX: 10,
    },
    {
      positionX: -8.5,
      positionZ: -28.5,
      positionY: 320,
      rotationX: 10,
    },
    {
      positionX: 45.5,
      positionZ: -28.5,
      positionY: 320,
      rotationX: 10,
    },
  ],
  [
    {
      positionX: -62.5,
      positionZ: 24.5,
      positionY: 310,
      rotationX: 10,
    },
    {
      positionX: -8.5,
      positionZ: 24.5,
      positionY: 310,
      rotationY: 0,
      rotationX: 10,
    },
    {
      positionX: 45.5,
      positionZ: 24.5,
      positionY: 310,
      rotationX: 10,
    },
  ],
  [
    {
      positionX: -62.5,
      positionZ: 78.5,
      positionY: 300,
      rotationX: 10,
    },
    {
      positionX: -8.5,
      positionZ: 78.5,
      positionY: 300,
      rotationX: 10,
    },
    {
      positionX: 45.5,
      positionZ: 78.5,
      positionY: 300,
      rotationX: 10,
    },
  ],
];

export const startingTileData: {
  [key: string]: {
    positionX: number;
    positionZ: number;
    positionY: number;
    yRotationInDegrees: number;
    xRotationInDegrees: number;
  };
} = {
  tileA: {
    positionX: tilePositionData[0][0].positionX,
    positionZ: tilePositionData[0][0].positionZ,
    positionY: tilePositionData[0][0].positionY,
    yRotationInDegrees: 180,
    xRotationInDegrees: tilePositionData[0][0].rotationX,
  },
  tileB: {
    positionX: tilePositionData[0][1].positionX,
    positionZ: tilePositionData[0][1].positionZ,
    positionY: tilePositionData[0][1].positionY,
    yRotationInDegrees: 180,
    xRotationInDegrees: tilePositionData[0][1].rotationX,
  },
  tileC: {
    positionX: tilePositionData[0][2].positionX,
    positionZ: tilePositionData[0][2].positionZ,
    positionY: tilePositionData[0][2].positionY,
    yRotationInDegrees: 180,
    xRotationInDegrees: tilePositionData[0][2].rotationX,
  },
  tileD: {
    positionX: tilePositionData[1][0].positionX,
    positionZ: tilePositionData[1][0].positionZ,
    positionY: tilePositionData[1][0].positionY,
    yRotationInDegrees: 180,
    xRotationInDegrees: tilePositionData[1][0].rotationX,
  },
  tileE: {
    positionX: tilePositionData[1][1].positionX,
    positionZ: tilePositionData[1][1].positionZ,
    positionY: tilePositionData[1][1].positionY,
    yRotationInDegrees: 0,
    xRotationInDegrees: tilePositionData[1][1].rotationX,
  },
  tileF: {
    positionX: tilePositionData[1][2].positionX,
    positionZ: tilePositionData[1][2].positionZ,
    positionY: tilePositionData[1][2].positionY,
    yRotationInDegrees: 180,
    xRotationInDegrees: tilePositionData[1][2].rotationX,
  },
  tileG: {
    positionX: tilePositionData[2][0].positionX,
    positionZ: tilePositionData[2][0].positionZ,
    positionY: tilePositionData[2][0].positionY,
    yRotationInDegrees: 0,
    xRotationInDegrees: tilePositionData[2][0].rotationX,
  },
  tileH: {
    positionX: tilePositionData[2][1].positionX,
    positionZ: tilePositionData[2][1].positionZ,
    positionY: tilePositionData[2][1].positionY,
    yRotationInDegrees: 180,
    xRotationInDegrees: tilePositionData[2][1].rotationX,
  },
};

export const startingTilePositionMatrix = [
  ["A", "B", "C"],
  ["D", "E", "F"],
  ["G", "H", ""],
];
export const acceptableTileLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
