import { combineReducers } from "@reduxjs/toolkit";
import envSlice from "./env/envSlice";
import userSlice from './env/authSlice'

const rootReducer = combineReducers({
  env: envSlice,
  user: userSlice,
});

export default rootReducer;
