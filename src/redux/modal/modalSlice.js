import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerOpen: false,
  loginOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openRegister(state) {
      state.registerOpen = true;
    },
    closeRegister(state) {
      state.registerOpen = false;
    },
    openLogin(state) {
      state.loginOpen = true;
    },
    closeLogin(state) {
      state.loginOpen = false;
    },
  },
});

export const { openRegister, closeRegister, openLogin, closeLogin } =
  modalSlice.actions;
export const modalReducer = modalSlice.reducer;
