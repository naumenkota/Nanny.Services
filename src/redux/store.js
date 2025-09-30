import { configureStore } from "@reduxjs/toolkit";
import { nanniesReducer } from "./nannies/nanniesSlice";

export const store = configureStore({
  reducer: {
    nannies: nanniesReducer,
  },
});
