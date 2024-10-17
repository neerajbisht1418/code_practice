import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   contact:[]
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContact: (state, action) => {
            state.contact = action.payload
        },
        clearContact: (state, action) => {
            state.inquiry = {}
        },
    }
})

export const { setContact,clearContact } = contactSlice.actions

export default contactSlice.reducer