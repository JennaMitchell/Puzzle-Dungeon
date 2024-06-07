import { createSlice } from "@reduxjs/toolkit";

type NavStoreStatesType = {
  navMenuAnimationDirection: string;
  navMenuActive: boolean;
  activePage: string;
};

const initialState: NavStoreStatesType = {
  navMenuAnimationDirection: "",
  navMenuActive: false,
  activePage: "home",
};

export const navStoreSlice = createSlice({
  name: "Portfolio Nav Store",
  initialState: initialState,
  reducers: {
    setNavMenuAnimationDirection(state, { payload }) {
      state.navMenuAnimationDirection = payload;
    },
    setNavMenuActive(state, { payload }) {
      state.navMenuActive = payload;
    },
    setActivePage(state, { payload }) {
      state.activePage = payload;
    },
  },
});

export const navStoreActions = navStoreSlice.actions;
