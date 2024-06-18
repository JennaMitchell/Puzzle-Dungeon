import { createSlice } from "@reduxjs/toolkit";

type ThemeStoreStatesType = {
  themeMenuActive: boolean;
  darkModeActive: boolean;
};

const initialState: ThemeStoreStatesType = {
  themeMenuActive: false,
  darkModeActive: true,
};

export const themeStoreSlice = createSlice({
  name: "Puzzle Dungeon Theme Store",
  initialState: initialState,
  reducers: {
    setThemeMenuActive(state, { payload }) {
      state.themeMenuActive = payload;
    },
    setDarkModeActive(state, { payload }) {
      state.darkModeActive = payload;
    },
  },
});

export const themStoreActions = themeStoreSlice.actions;
