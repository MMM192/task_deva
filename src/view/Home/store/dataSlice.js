import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://deva-backend.onrender.com";

// API Endpoints
const ADD_ENDPOINT = `${BASE_URL}/add`;
const REPORTS_ENDPOINT = `${BASE_URL}/records`;

// Async Thunks
export const addData = createAsyncThunk(
  "designation/addData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(ADD_ENDPOINT, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchReports = createAsyncThunk(
  "designation/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(REPORTS_ENDPOINT);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  loading: false,
  datalll: [],
  error: null,
};

const dataSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addData.fulfilled, (state, action) => {
    
      })
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.datalll = action.payload;
         
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;

 