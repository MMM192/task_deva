// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import {
//   apiGetAllDesignation,
//   apipostDesignation,
//   apiputDesignation,
// } from "../../../services/DesignationServices";

// export const getDesignation = createAsyncThunk(
//   "designation/data/getDesignation",
//   async (data) => {
//     const response = await apiGetAllDesignation(data);
//     return response.data;
//   }
// );
// export const postDesignation = createAsyncThunk(
//   "designation/data/postDesignation",
//   async (data) => {
//     const response = await apipostDesignation(data);
//     return response.data;
//   }
// );
// export const putDesignation = createAsyncThunk(
//   "designation/data/putDesignation",
//   async (data) => {
//     const response = await apiputDesignation(data);
//     return response.data;
//   }
// );

// export const initialTableData = {
//   total: 0,
//   pageIndex: 1,
//   pageSize: 10,
//   query: "",
//   sort: {
//     order: "",
//     key: "",
//   },
// };

// export const initialFilterData = {
//   name: "",
//   category: ["bags", "cloths", "devices", "shoes", "watches"],
//   status: [0, 1, 2],
//   productStatus: 0,
// };

// const dataSlice = createSlice({
//   name: "designationList/data",
//   initialState: {
//     loading: false,
//     designationList: [],
//     tableData: initialTableData,
//     filterData: initialFilterData,
//   },
//   reducers: {
//     updateProductList: (state, action) => {
//       state.designationList = action.payload;
//     },
//     setTableData: (state, action) => {
//       state.tableData = { ...state.tableData, ...action.payload };
//     },

//     setFilterData: (state, action) => {
//       state.filterData = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getDesignation.fulfilled, (state, action) => {
//         state.loading = false;
//         state.designationList = action.payload;
//         state.tableData.total = action.payload.count;
//       })
//       .addCase(getDesignation.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(getDesignation.rejected, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(postDesignation.fulfilled, (state, action) => { })
//       .addCase(putDesignation.fulfilled, (state, action) => { });
//   },
// });

// export const { updateProductList, setTableData, setFilterData } =
//   dataSlice.actions;

// export default dataSlice.reducer;
