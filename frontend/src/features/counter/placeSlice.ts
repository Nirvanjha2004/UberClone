import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPlace: null,
  error : false
}

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    ListofplacesExtracted(state, action){
      state.currentPlace = action.payload;
      state.error= false;
  },

  extractionFailure(state, action){
      state.error= action.payload
  },
  },
})

// Action creators are generated for each case reducer function
export const { ListofplacesExtracted, extractionFailure } = placeSlice.actions

export default placeSlice.reducer