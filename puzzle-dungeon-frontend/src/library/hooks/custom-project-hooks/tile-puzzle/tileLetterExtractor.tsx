import { acceptableTileLetters } from "../../../assets/models/tile-puzzle/data/title-puzzle-data";

export const tileLetterExtrator = (tile: string): null | string => {
  const splitString = tile.split("");
  const tileLetter = splitString[splitString.length - 1];

  if (acceptableTileLetters.includes(tileLetter)) {
    return tileLetter;
  } else {
    return null;
  }
};
