import { combineReducers } from '@reduxjs/toolkit'
import  userSliceReducer from '../features/counter/userSlice';
import rideSliceReducer from '../features/counter/rideSlice';
import placeSliceReducer from '../features/counter/placeSlice';
import mapSliceReducer from '../features/counter/mapSlice';
import  pickUpTimeSlice  from '../features/counter/pickUpTimeSlice';

const rootReducer = combineReducers({
	user : userSliceReducer,
	rides: rideSliceReducer,
	place: placeSliceReducer,
	map: mapSliceReducer, 
	pickupTime: pickUpTimeSlice
})

export default rootReducer;