import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    privacy: [],
}

const privacyPolicySlice = createSlice({
    name: 'privacy',
    initialState,
    reducers: {
        setPrivacy: (state, action) => {
            state.privacy = action.payload
        },
        clearPrivacy: (state, action) => {
            state.privacy = []
        },
    }
})

export const { setPrivacy, clearPrivacy } = privacyPolicySlice.actions

export default privacyPolicySlice.reducer