import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  startPoint: null,
  endPoint: null,
  error : false
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    startPointSuccess(state, action){
      state.startPoint = action.payload;
      state.error= false;
  },

  endPointSuccess(state, action){
    state.endPoint = action.payload;
    state.error= false;
},

  startPointFailure(state, action){
      state.error= action.payload
  },
  endPointFailure(state, action){
      state.error= action.payload
  },

  },
})

// Action creators are generated for each case reducer function
export const { startPointSuccess, endPointSuccess, startPointFailure, endPointFailure } = mapSlice.actions

export default mapSlice.reducer