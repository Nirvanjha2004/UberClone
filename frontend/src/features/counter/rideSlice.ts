import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentRide: null,
  error : false
}

export const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    currentRideSuccess(state, action){
      state.currentRide = action.payload;
      state.error= false;
  },

  currentRideFailure(state, action){
      state.error= action.payload
  },
  rideStarted(state){
      state.currentRide = null;
      state.error= false;
  },
  rideCompleted(state, action){
      state.currentRide= action.payload;
      state.error= false;
  },
  rideCancelled(state, action){
    state.currentRide= action.payload;
    state.error= false;
},
  },
})

// Action creators are generated for each case reducer function
export const { rideCancelled,rideCompleted, currentRideFailure, currentRideSuccess, rideStarted } = rideSlice.actions

export default rideSlice.reducer