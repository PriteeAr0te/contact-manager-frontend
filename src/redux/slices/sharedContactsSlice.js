import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../lib/api";

// Fetch unseen shared contact status for red dot in header
export const fetchUnseenSharedStatus = createAsyncThunk(
  "sharedContacts/fetchUnseenStatus",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    const res = await API.get("/contacts/shared-status", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.hasUnseen;
  }
);

// Mark shared contacts as viewed when user visits the shared page
export const markSharedContactsAsViewedThunk = createAsyncThunk(
  "sharedContacts/markAllViewedThunk",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    await API.put("/contacts/shared/viewed", {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  }
);

const sharedContactsSlice = createSlice({
  name: "sharedContacts",
  initialState: {
    hasUnseen: false,
    loading: false,
  },
  reducers: {
    markAllViewed: (state) => {
      state.hasUnseen = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnseenSharedStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnseenSharedStatus.fulfilled, (state, action) => {
        state.hasUnseen = action.payload;
        state.loading = false;
      })
      .addCase(markSharedContactsAsViewedThunk.fulfilled, (state) => {
        state.hasUnseen = false;
      });
  },
});

export const { markAllViewed } = sharedContactsSlice.actions;
export default sharedContactsSlice.reducer;
