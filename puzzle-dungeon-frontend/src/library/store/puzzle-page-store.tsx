import { createSlice } from "@reduxjs/toolkit";

type PuzzlePageStoreType = {
  selectedPuzzle: string;
};

const initialState: PuzzlePageStoreType = {
  selectedPuzzle: "Tile",
};

export const puzzlePageStoreSlice = createSlice({
  name: "Puzzle Page Store",
  initialState: initialState,
  reducers: {
    setSelectedPuzzle(state, { payload }) {
      state.selectedPuzzle = payload;
    },
  },
});

export const puzzlePageStoreActions = puzzlePageStoreSlice.actions;
