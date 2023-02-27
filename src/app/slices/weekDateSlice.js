import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weekDate: [],
  toNext: false,
  toBefore: false,
};

const weekDateSlice = createSlice({
  name: "weekDate",
  initialState,
  reducers: {
    setWeekDate: (state, action) => ({
      ...state,
      weekDate: action.payload,
    }),
    setToNext: (state, action) => ({
      ...state,
      toNext: action.payload,
    }),
    setToBefore: (state, action) => ({
      ...state,
      toBefore: action.payload,
    }),
  },
});

export const { setWeekDate, setToBefore, setToNext } = weekDateSlice.actions;

export default weekDateSlice.reducer;
