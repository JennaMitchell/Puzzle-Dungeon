type currentTilePositionType = {
  row: number;
  column: number;
};

export type tileMoveFunctionType = {
  moveSuccess: boolean;
  errorMessage: string;
  direction: string | null;
  newTilePoisition: {
    zeroBasedColumn: number | null;
    zeroBasedRow: number | null;
  };
};

function tileAboveTest(
  currentTilePosition: currentTilePositionType,
  tilePositionMatrix: string[][]
) {
  // Finding out what tile is above the current tile

  if (currentTilePosition.row === 0) {
    return "Wall";
  } else {
    const rowToCheck = currentTilePosition.row - 1;

    const columnToCheck = currentTilePosition.column;

    return tilePositionMatrix[rowToCheck][columnToCheck];
  }
}

function tileBelowTest(
  currentTilePosition: currentTilePositionType,
  tilePositionMatrix: string[][]
) {
  // Finding out what tile is below the current tile

  if (currentTilePosition.row === tilePositionMatrix.length - 1) {
    return "Wall";
  } else {
    const rowToCheck = currentTilePosition.row + 1;

    const columnToCheck = currentTilePosition.column;

    return tilePositionMatrix[rowToCheck][columnToCheck];
  }
}

function tileLeftTest(
  currentTilePosition: currentTilePositionType,
  tilePositionMatrix: string[][]
) {
  // Finding out what tile is left the current tile

  if (currentTilePosition.column === 0) {
    return "Wall";
  } else {
    const rowToCheck = currentTilePosition.row;

    const columnToCheck = currentTilePosition.column - 1;

    return tilePositionMatrix[rowToCheck][columnToCheck];
  }
}

function tileRightTest(
  currentTilePosition: currentTilePositionType,
  tilePositionMatrix: string[][]
) {
  // Finding out what tile is right the current tile

  if (currentTilePosition.column === 2) {
    return "Wall";
  } else {
    const rowToCheck = currentTilePosition.row;

    const columnToCheck = currentTilePosition.column + 1;

    return tilePositionMatrix[rowToCheck][columnToCheck];
  }
}

export default function tilePuzzleMoveHandler(
  keyPress: string,
  tilePositionMatrix: string[][],
  currentTileTitle: string
) {
  let currentTilePosition: null | currentTilePositionType = null;

  for (let rowIndex = 0; rowIndex < tilePositionMatrix.length; rowIndex++) {
    const selectedMatrixRow = tilePositionMatrix[rowIndex];

    for (
      let columnIndex = 0;
      columnIndex < selectedMatrixRow.length;
      columnIndex++
    ) {
      if (currentTileTitle === selectedMatrixRow[columnIndex]) {
        currentTilePosition = { row: rowIndex, column: columnIndex };
      }
    }
  }

  if (currentTilePosition) {
    const surrondingTiles = {
      tileAbove: tileAboveTest(currentTilePosition, tilePositionMatrix),
      tileBelow: tileBelowTest(currentTilePosition, tilePositionMatrix),
      tileLeft: tileLeftTest(currentTilePosition, tilePositionMatrix),
      tileRight: tileRightTest(currentTilePosition, tilePositionMatrix),
    };

    switch (keyPress) {
      case "ArrowLeft":
        if (surrondingTiles.tileLeft === "") {
          return {
            moveSuccess: true,
            errorMessage: "",
            direction: "Left",
            newTilePoisition: {
              zeroBasedColumn: currentTilePosition.column - 1,
              zeroBasedRow: currentTilePosition.row,
            },
          };
        } else {
          return {
            moveSuccess: false,
            errorMessage: "Invalid Move",
            direction: "Left",
            newTilePoisition: {
              zeroBasedColumn: null,
              zeroBasedRow: null,
            },
          };
        }

      case "ArrowRight":
        if (surrondingTiles.tileRight === "") {
          return {
            moveSuccess: true,
            errorMessage: "",
            direction: "Right",
            newTilePoisition: {
              zeroBasedColumn: currentTilePosition.column + 1,
              zeroBasedRow: currentTilePosition.row,
            },
          };
        } else {
          return {
            moveSuccess: false,
            errorMessage: "Invalid Move",
            direction: "Right",
            newTilePoisition: {
              zeroBasedColumn: null,
              zeroBasedRow: null,
            },
          };
        }

      case "ArrowUp":
        if (surrondingTiles.tileAbove === "") {
          console.log(currentTilePosition.column);
          return {
            moveSuccess: true,
            errorMessage: "",
            direction: "Up",
            newTilePoisition: {
              zeroBasedColumn: currentTilePosition.column,
              zeroBasedRow: currentTilePosition.row - 1,
            },
          };
        } else {
          return {
            moveSuccess: false,
            errorMessage: "Invalid Move",
            direction: "Up",
            newTilePoisition: {
              zeroBasedColumn: null,
              zeroBasedRow: null,
            },
          };
        }

      case "ArrowDown":
        if (surrondingTiles.tileBelow === "") {
          return {
            moveSuccess: true,
            errorMessage: "",
            direction: "Down",
            newTilePoisition: {
              zeroBasedColumn: currentTilePosition.column,
              zeroBasedRow: currentTilePosition.row + 1,
            },
          };
        } else {
          return {
            moveSuccess: false,
            errorMessage: "Invalid Move",
            direction: "Down",
            newTilePoisition: {
              zeroBasedColumn: null,
              zeroBasedRow: null,
            },
          };
        }

      default:
        return {
          moveSuccess: false,
          errorMessage: "Invalid Input",
          direction: "",
          newTilePoisition: {
            zeroBasedColumn: null,
            zeroBasedRow: null,
          },
        };
    }
  } else {
    return {
      moveSuccess: false,
      errorMessage: "Invalid Input",
      direction: "",
      newTilePoisition: {
        zeroBasedColumn: null,
        zeroBasedRow: null,
      },
    };
  }
}
