import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error : false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinSuccess(state, action){
      state.currentUser = action.payload;
      state.error= false;
  },

  signinFailure(state, action){
      state.error= action.payload
  },
  signOut(state){
      state.currentUser = null;
      state.error= false;
  },
  updatedData(state, action){
      state.currentUser= action.payload;
      state.error= false;
  },
  },
})

// Action creators are generated for each case reducer function
export const { signinFailure, signinSuccess, signOut, updatedData } = userSlice.actions

export default userSlice.reducer