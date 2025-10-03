import { configureStore } from "@reduxjs/toolkit";
import { nanniesReducer } from "./nannies/nanniesSlice";
import { filtersReducer } from "./filter/filterSlice";

export const store = configureStore({
  reducer: {
    nannies: nanniesReducer,
    filters: filtersReducer,
  },
});
