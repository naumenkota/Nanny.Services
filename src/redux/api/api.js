import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, child } from "firebase/database";
import { database } from "../../services/firebase.js";

export const fetchNannies = createAsyncThunk("nannies/fetchAll", async () => {
  const dbRef = ref(database);
  const result = await get(child(dbRef, "nannies"));
  if (result.exists()) {
    return result.val();
  } else {
    return [];
  }
});
