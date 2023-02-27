import { combineReducers, configureStore } from "@reduxjs/toolkit";
import selected from "./slices/selectedSlice";

const rootReducer = combineReducers({
  selected,
});

export default store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
