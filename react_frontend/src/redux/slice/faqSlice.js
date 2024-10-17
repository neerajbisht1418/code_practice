import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   faq:[]
}

const faqSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {
        setFaq: (state, action) => {
            state.faq = action.payload
        },
        clearFaq: (state, action) => {
            state.faq = []
        },
    }
})

export const { setFaq,clearFaq } = faqSlice.actions

export default faqSlice.reducer