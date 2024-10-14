import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDate: new Date().toDateString(),
  currentTime: new Date().toTimeString(),
  error: false,
};

export const pickUpTimeSlice = createSlice({
  name: "dateAndTime",
  initialState,
  reducers: {
    getDate(state, action) {
      state.currentDate = action.payload;
      state.error = false;
    },

    getDateFail(state){
        state.error= true;
    },

    getTime(state, action) {
      state.currentTime = action.payload;
      state.error = false;
    },

    getTimeFail(state){
        state.error = true
    }
  },
});

// Action creators are generated for each case reducer function
export const { getDate, getDateFail, getTime, getTimeFail } = pickUpTimeSlice.actions;

export default pickUpTimeSlice.reducer;
