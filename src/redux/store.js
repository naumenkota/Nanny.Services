import { configureStore } from "@reduxjs/toolkit";
import { nanniesReducer } from "./nannies/nanniesSlice";
import { filtersReducer } from "./filter/filterSlice";
import { authReducer } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    nannies: nanniesReducer,
    filters: filtersReducer,
    auth: authReducer,
  },
});
