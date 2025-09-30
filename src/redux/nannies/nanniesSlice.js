import { fetchNannies } from "../api/api";
import { createSlice } from "@reduxjs/toolkit";

const nanniesSlice = createSlice({
  name: "nannies",
  initialState: {
    items: {},
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
      .addCase(fetchNannies.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchNannies.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchNannies.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const nanniesReducer = nanniesSlice.reducer;
