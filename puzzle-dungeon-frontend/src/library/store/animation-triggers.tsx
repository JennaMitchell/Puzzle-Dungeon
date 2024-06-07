import { createSlice } from "@reduxjs/toolkit";

type AnimaationStoreStatesType = {
  // firstRenderMouseEnteredViewportTrigger: boolean;
  // firstRenderAnimationTimeStamp: number;
  // firstAnimationActiveStep: number;
  starBackgroundAnimationRerenderActive: boolean;
  starBackgroundAnimationViewPortWidth: number;
  starBackgroundAnimationViewPortHeight: number;
};

const initialState: AnimaationStoreStatesType = {
  // firstRenderMouseEnteredViewportTrigger: false,
  // firstRenderAnimationTimeStamp: 0,
  // firstAnimationActiveStep: 0,
  starBackgroundAnimationRerenderActive: false,
  starBackgroundAnimationViewPortWidth: 0,
  starBackgroundAnimationViewPortHeight: 0,
};

export const animationStoreSlice = createSlice({
  name: "Portfolio Animations Store",
  initialState: initialState,
  reducers: {
    setStarBackgroundAnimationRerenderActive(state, { payload }) {
      state.starBackgroundAnimationRerenderActive = payload;
    },
    setStarBackgroundAnimationViewPortWidth(state, { payload }) {
      state.starBackgroundAnimationViewPortWidth = payload;
    },
    setStarBackgroundAnimationViewPortHeight(state, { payload }) {
      state.starBackgroundAnimationViewPortHeight = payload;
    },
  },
});

export const animationStoreActions = animationStoreSlice.actions;
