import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    about: [],
}

const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        setAbout: (state, action) => {
            state.about = action.payload
        },
        clearAbout: (state, action) => {
            state.about = {}
        },
    }
})

export const { setAbout, clearAbout } = aboutSlice.actions

export default aboutSlice.reducer