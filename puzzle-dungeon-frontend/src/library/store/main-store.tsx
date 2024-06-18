import { configureStore } from "@reduxjs/toolkit";
import { navStoreSlice } from "./nav-store";
import { themeStoreSlice } from "./theme-store";
import { tilePuzzleStoreSlice } from "./tile-puzzle-store";
import { puzzlePageStoreSlice } from "./puzzle-page-store";
import { popupStoreSlice } from "./popup-store";
const store = configureStore({
  reducer: {
    nav: navStoreSlice.reducer,
    theme: themeStoreSlice.reducer,
    tilePuzzle: tilePuzzleStoreSlice.reducer,
    puzzlePage: puzzlePageStoreSlice.reducer,
    popups: popupStoreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// used to set it so our usestate perfectly match what is in the store
export type AppDispatch = typeof store.dispatch;
// dispatch is used to type or dispatch actions

export default store;
