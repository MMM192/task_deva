import { combineReducers } from "@reduxjs/toolkit";
import state from "./stateSlice";
import data from "./dataSlice";

const Home = combineReducers({
  state,
  data,
});

export default Home;
