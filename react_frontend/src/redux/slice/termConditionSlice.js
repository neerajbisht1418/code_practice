import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    term: [],
}

const termConditionSlice = createSlice({
    name: 'term',
    initialState,
    reducers: {
        setTerm: (state, action) => {
            state.term = action.payload
        },
        clearTerm: (state, action) => {
            state.term = []
        },
    }
})

export const { setTerm, clearTerm } = termConditionSlice.actions

export default termConditionSlice.reducer