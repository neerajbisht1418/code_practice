import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    current_language: "en",
    is_authenticated: false
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setCurrentLanguage: (state, action) => {
            state.current_language = action.payload
        },
        setIsAuthenticated: (state, action) => {
            state.is_authenticated = action.payload
        }
    }
})

export const { setCurrentLanguage, setIsAuthenticated } = globalSlice.actions

export default globalSlice.reducer