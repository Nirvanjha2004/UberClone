import { combineReducers } from '@reduxjs/toolkit'
import  userSliceReducer from '../features/counter/userSlice';
import rideSliceReducer from '../features/counter/rideSlice';
import placeSliceReducer from '../features/counter/placeSlice';

const rootReducer = combineReducers({
	user : userSliceReducer,
	rides: rideSliceReducer,
	place: placeSliceReducer
})

export default rootReducer;