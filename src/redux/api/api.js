import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, child } from "firebase/database";
import { database } from "../../services/firebase.js";

export const fetchNannies = createAsyncThunk(
  "nannies/fetchAll",
  async ({ page = 1, perPage = 3 } = {}) => {
    const dbRef = ref(database);
    const result = await get(child(dbRef, "nannies"));
    if (result.exists()) {
      const allData = Object.values(result.val());
      const start = (page - 1) * perPage;
      const paginatedData = allData.slice(start, start + perPage);

      return { items: paginatedData, total: allData.length };
    } else {
      return [];
    }
  }
);
