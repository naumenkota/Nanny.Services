import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    sortBy: null,
    sortOrder: "asc",
    priceFilter: null,
  },
  reducers: {
    setSort(state, action) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setPriceFilter(state, action) {
      state.priceFilter = action.payload;
    },
    resetFilters(state) {
      state.sortBy = null;
      state.sortOrder = "asc";
      state.priceFilter = null;
    },
  },
});

export const { setSort, setPriceFilter, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
