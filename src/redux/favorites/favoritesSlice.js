import { createSlice } from "@reduxjs/toolkit";
import { logout, setUser } from "../auth/authSlice.js";

const getLocalFavorites = (uid) => {
  if (!uid) return [];
  return JSON.parse(localStorage.getItem(`favorites_${uid}`)) || [];
};

const saveLocalFavorites = (uid, items) => {
  if (!uid) return;
  localStorage.setItem(`favorites_${uid}`, JSON.stringify(items));
};

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const { nanny, uid } = action.payload;
      if (!uid) return;

      if (!state.items.find((item) => item.uniqueKey === nanny.uniqueKey)) {
        state.items.push(nanny);
        saveLocalFavorites(uid, state.items);
        console.log("Added favorite for UID:", uid, state.items);
      }
    },
    removeFavorite(state, action) {
      const { uniqueKey, uid } = action.payload;
      if (!uid) return;

      state.items = state.items.filter((item) => item.uniqueKey !== uniqueKey);
      saveLocalFavorites(uid, state.items);
      console.log("Removed favorite for UID:", uid, state.items);
    },
    toggleFavorite(state, action) {
      const { nanny, uid } = action.payload;
      if (!uid) return;

      const exists = state.items.find(
        (item) => item.uniqueKey === nanny.uniqueKey
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.uniqueKey !== nanny.uniqueKey
        );
        console.log("Toggled OFF favorite for UID:", uid, state.items);
      } else {
        state.items.push(nanny);
        console.log("Toggled ON favorite for UID:", uid, state.items);
      }

      saveLocalFavorites(uid, state.items);
    },
    clearFavorites(state, action) {
      state.items = [];
      if (action.payload?.uid) {
        localStorage.removeItem(`favorites_${action.payload.uid}`);
      }
    },
    setFavorites(state, action) {
      state.items = action.payload || [];
      console.log("Set favorites from storage:", state.items);
    },
  },
});

export const handleAuthActions = (action, dispatch) => {
  if (action.type === logout.type) {
    dispatch(favoritesSlice.actions.clearFavorites({}));
  }

  if (action.type === setUser.type && action.payload) {
    const stored = getLocalFavorites(action.payload.uid);
    console.log("Loading favorites for UID:", action.payload.uid, stored);
    dispatch(favoritesSlice.actions.setFavorites(stored));
  }
};

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
  setFavorites,
} = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
