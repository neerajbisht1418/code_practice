import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import globalSlice from "./slice/globalSlice";
import authSlice from "./slice/authSlice";
import ourServiceSlice from "./slice/ourServiceSlice";
import contactSlice from "./slice/contactSlice";
import faqSlice from "./slice/faqSlice";
import aboutSlice from "./slice/aboutSlice";
import privacyPolicySlice from "./slice/privacyPolicySlice";
import termConditionSlice from "./slice/termConditionSlice";
import visualizerSlice from "./slice/visualizerSlice";


export const persistConfig = {
    key: "demo",
    version: 1,
    storage,
};
const combinedReducer = combineReducers({
    global: globalSlice,
    auth: authSlice,
    service: ourServiceSlice,
    contact: contactSlice,
    faq: faqSlice,
    about: aboutSlice,
    privacy: privacyPolicySlice,
    term: termConditionSlice,
    visualizer: visualizerSlice
})

const rootReducer = (state, action) => {
    return combinedReducer(state, action)
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);