import { combineReducers, configureStore } from "@reduxjs/toolkit";
import weekDate from "./slices/weekDateSlice";

const rootReducer = combineReducers({
  weekDate,
});

export default store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
