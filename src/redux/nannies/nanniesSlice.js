import { fetchNannies } from "../api/api";
import { createSlice } from "@reduxjs/toolkit";

const nanniesSlice = createSlice({
  name: "nannies",
  initialState: {
    items: [],
    total: 0,
    loading: false,
    loadingMore: false,
    page: 1,
    perPage: 3,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNannies.pending, (state, action) => {
        state.error = null;
        if (action.meta.arg?.page > 1) {
          state.loadingMore = true;
        } else {
          state.loading = true;
        }
      })
      .addCase(fetchNannies.fulfilled, (state, action) => {
        if (action.meta.arg?.page > 1) {
          state.items = [...state.items, ...action.payload.items];
          state.page = action.meta.arg.page;
          state.loadingMore = false;
        } else {
          state.items = action.payload.items;
          state.total = action.payload.total;
          state.page = 1;
          state.loading = false;
        }
      })
      .addCase(fetchNannies.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.loadingMore = false;
      });
  },
});

export const nanniesReducer = nanniesSlice.reducer;
