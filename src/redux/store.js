import { configureStore } from "@reduxjs/toolkit";
import sharedContactsReducer from "./slices/sharedContactsSlice";

const store = configureStore({
  reducer: {
    sharedContacts: sharedContactsReducer,
  },
});

export default store;
