import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    steps: 0,
}

const visualizerSlice = createSlice({
    name: 'visualizer',
    initialState,
    reducers: {
        setSteps: (state, action) => {
            state.steps = action.payload
        },
        clearSteps: (state, action) => {
            state.steps = 0
        },
    }
})

export const { setSteps, clearSteps } = visualizerSlice.actions

export default visualizerSlice.reducer