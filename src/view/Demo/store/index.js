import { combineReducers } from "@reduxjs/toolkit";
import state from "./stateSlice";
import data from "./dataSlice";

const Demo = combineReducers({
  state,
  // data,
});

export default Demo;
