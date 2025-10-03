import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const nanny = action.payload;

      if (!state.items.find((item) => item.uniqueKey === nanny.uniqueKey)) {
        state.items.push(nanny);
      }
    },
    removeFavorite(state, action) {
      const uniqueKey = action.payload;
      state.items = state.items.filter((item) => item.uniqueKey !== uniqueKey);
    },
    toggleFavorite(state, action) {
      const nanny = action.payload;
      const exists = state.items.find(
        (item) => item.uniqueKey === nanny.uniqueKey
      );
      if (exists) {
        state.items = state.items.filter(
          (item) => item.uniqueKey !== nanny.uniqueKey
        );
      } else {
        state.items.push(nanny);
      }
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
