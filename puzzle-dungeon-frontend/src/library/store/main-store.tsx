import { configureStore } from "@reduxjs/toolkit";
import { navStoreSlice } from "./nav-store";
import { animationStoreSlice } from "./animation-triggers";
import { themeStoreSlice } from "./theme-store";
const store = configureStore({
  reducer: {
    nav: navStoreSlice.reducer,
    animations: animationStoreSlice.reducer,
    theme: themeStoreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// used to set it so our usestate perfectly match what is in the store
export type AppDispatch = typeof store.dispatch;
// dispatch is used to type or dispatch actions

export default store;
