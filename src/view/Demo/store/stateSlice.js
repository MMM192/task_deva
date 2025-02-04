import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'DemoList/state',
    initialState: {
        deleteConfirmation: false,
        selectedDemo: '',
        newDialog: false,
        cnt:'',
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedDemo: (state, action) => {
            state.selectedDemo = action.payload
        },
        toggleNewDialog: (state, action) => {
            state.newDialog = action.payload
        },
        cntRe: (state, action) => {
            state.cnt = action.payload;
        },
    },
})

export const { toggleDeleteConfirmation, setSelectedDemo, toggleNewDialog,cntRe } =
    stateSlice.actions

export default stateSlice.reducer


