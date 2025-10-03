import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, child } from "firebase/database";
import { database } from "../../services/firebase.js";

export const fetchNannies = createAsyncThunk(
  "nannies/fetchAll",
  async ({ page = 1, perPage = 3, filters = {} }) => {
    const dbRef = ref(database);
    const result = await get(child(dbRef, "nannies"));
    if (result.exists()) {
      let allData = Object.values(result.val()).map((nanny, index) => ({
        ...nanny,
        uniqueKey: index,
      }));

      if (filters.sortBy) {
        allData.sort((a, b) => {
          if (filters.sortBy === "name") {
            return filters.sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          }
          if (filters.sortBy === "price_per_hour") {
            return filters.sortOrder === "asc"
              ? a.price_per_hour - b.price_per_hour
              : b.price_per_hour - a.price_per_hour;
          }
          if (filters.sortBy === "rating") {
            return filters.sortOrder === "asc"
              ? a.rating - b.rating
              : b.rating - a.rating;
          }
          return 0;
        });
      }

      if (filters.priceFilter) {
        allData = allData.filter((n) =>
          filters.priceFilter === "above10"
            ? n.price_per_hour > 10
            : n.price_per_hour <= 10
        );
      }

      const start = (page - 1) * perPage;
      const paginatedData = allData.slice(start, start + perPage);

      return { items: paginatedData, total: allData.length };
    } else {
      return [];
    }
  }
);
