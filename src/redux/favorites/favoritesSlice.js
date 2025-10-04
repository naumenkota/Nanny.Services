import { createSlice } from "@reduxjs/toolkit";

const localFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
const initialState = {
  items: localFavorites,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const nanny = action.payload;

      if (!state.items.find((item) => item.uniqueKey === nanny.uniqueKey)) {
        state.items.push(nanny);
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    removeFavorite(state, action) {
      const uniqueKey = action.payload;
      state.items = state.items.filter((item) => item.uniqueKey !== uniqueKey);
      localStorage.setItem("favorites", JSON.stringify(state.items));
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
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    clearFavorites(state) {
      state.items = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
