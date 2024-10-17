import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    inquiry: {},
    package: [],
    packageUser: []
} 

const ourServiceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setInquiry: (state, action) => {
            state.inquiry = action.payload
        },
        setPackage: (state, action) => {
            state.package = action.payload
        },
        setPackageUser: (state, action) => {
            state.packageUser = action.payload
        },
        clearService: (state, action) => {
            state.inquiry = {}
        },
    }
})

export const { setInquiry, setPackage, setPackageUser, clearInquiry } = ourServiceSlice.actions

export default ourServiceSlice.reducer