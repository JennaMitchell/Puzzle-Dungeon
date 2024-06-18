import { createSlice } from "@reduxjs/toolkit";
import { startingTilePositionMatrix } from "../assets/models/tile-puzzle/data/title-puzzle-data";
type TilePuzzleStoreType = {
  selectedTile: string | null;
  previousSelectedTile: string | null;
  tilePositionMatrix: string[][];
};

const initialState: TilePuzzleStoreType = {
  selectedTile: null,
  previousSelectedTile: null,
  tilePositionMatrix: startingTilePositionMatrix,
};

export const tilePuzzleStoreSlice = createSlice({
  name: "Tile Puzzle Store",
  initialState: initialState,
  reducers: {
    setSelectedTile(state, { payload }) {
      state.selectedTile = payload;
    },
    setPreviousSelectedTile(state, { payload }) {
      state.previousSelectedTile = payload;
    },
    setTilePositionMatrix(state, { payload }) {
      state.tilePositionMatrix = payload;
    },
  },
});

export const tilePuzzleStoreActions = tilePuzzleStoreSlice.actions;
