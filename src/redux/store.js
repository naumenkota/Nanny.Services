import { configureStore } from "@reduxjs/toolkit";
import { nanniesReducer } from "./nannies/nanniesSlice";
import { filtersReducer } from "./filter/filterSlice";
import { authReducer } from "./auth/authSlice";
import { favoritesReducer } from "./favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    nannies: nanniesReducer,
    filters: filtersReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});
