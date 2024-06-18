import { createSlice } from "@reduxjs/toolkit";

type PopupStoreStatesType = {
  messagePopupActive: boolean;
  messagePopupData: {
    error: boolean;
    message: string | undefined;
  };
};

const initialState: PopupStoreStatesType = {
  messagePopupActive: false,
  messagePopupData: {
    error: false,
    message: "",
  },
};

export const popupStoreSlice = createSlice({
  name: "Puzzle Dungeon Popup Store",
  initialState: initialState,
  reducers: {
    setMessagePopupActive(state, { payload }) {
      state.messagePopupActive = payload;
    },
    setMessagePopupData(state, { payload }) {
      state.messagePopupData = payload;
    },
  },
});

export const popupStoreActions = popupStoreSlice.actions;
