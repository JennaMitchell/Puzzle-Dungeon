import { tilePositionData } from "../../../assets/models/tile-puzzle/data/title-puzzle-data";
import { acceptableTileLetters } from "../../../assets/models/tile-puzzle/data/title-puzzle-data";
export const tilePositionFinder = (
  tileLetter: string,
  currentTileMatrix: string[][]
) => {
  if (acceptableTileLetters.includes(tileLetter)) {
    for (let rowIndex = 0; rowIndex < tilePositionData.length; rowIndex++) {
      const row = rowIndex;
      for (
        let columnIndex = 0;
        columnIndex < tilePositionData[row].length;
        columnIndex++
      ) {
        const column = columnIndex;

        if (tileLetter === currentTileMatrix[row][column]) {
          return {
            column: column,
            row: row,
          };
        }
      }
    }
  }

  return {
    column: null,
    row: null,
  };
};
