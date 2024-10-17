import { setMyProfile, setrefreshToken, setUser } from "../redux/slice/authSlice";
import { setIsAuthenticated } from "../redux/slice/globalSlice";
import { store } from "../redux/store";
;
import { ROUTES } from "../utils/apiRoutes";
import baseService from "./baseService";

export const userRegister = async (userData) => {
    try {
        const res = await baseService.post(ROUTES.AUTH.REGISTER, userData);
        store.dispatch(setUser(res.data.data))
        return res.data;
    } catch (err) {
        return err;
    }
};
export const verifyOtp = async (Data) => {
    try {
        const res = await baseService.post(ROUTES.AUTH.VERIFYOTP, Data);
        return res.data;
    } catch (err) {
        return err;
    }
};

export const login = async (userData) => {
    try {
        const res = await baseService.post(ROUTES.AUTH.LOGIN, userData);
        if (res) {
            store.dispatch(setIsAuthenticated(true));
            store.dispatch(setUser(res.data.data))
            store.dispatch(setrefreshToken(res?.data?.data?.access_token))
        }

        return res.data;
    } catch (err) {
        return err;
    }
};
export const resendOtp = async (Data) => {
    try {
        const res = await baseService.post(ROUTES.AUTH.RESENDOTP, Data);
        return res.data;
    } catch (err) {
        return err;
    }
};

export const forgetPassword = async (Data) => {
    try {
        const res = await baseService.post(ROUTES.AUTH.FORGETPASSWORD, Data);
        return res.data;
    } catch (err) {
        return err;
    }
};
export const resetPassword = async (Data) => {
    try {
        const res = await baseService.post(ROUTES.AUTH.RESETPASSWORD, Data);
        return res.data;
    } catch (err) {
        return err;
    }
};

export const socialAuth = async (Data) => {
    try {
        const res = await baseService.post(ROUTES.AUTH.SOCIALAUTH, Data);
        if (res) {
            store.dispatch(setIsAuthenticated(true));
            store.dispatch(setrefreshToken(res?.data?.data?.access_token))
            store.dispatch(setUser(res.data.data))
        }
        return res.data;
    } catch (err) {
        return err;
    }
};

export const myProfile = async () => {
    const token = store.getState().auth.token;
    try {
        const res = await baseService.post(ROUTES.AUTH.MYPROFILE, null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        store.dispatch(setMyProfile(res?.data?.data))

        return res.data;
    } catch (err) {
        return err;
    }
};
export const editProfile = async (data) => {
    const token = store.getState().auth.token;
    try {
        const res = await baseService.post(ROUTES.AUTH.EDITPROFILE, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        store.dispatch(setMyProfile(res?.data?.data))
        return res.data;
    } catch (err) {
        return err;
    }
};
export const changePassword = async (data) => {
    const token = store.getState().auth.token;
    try {
        const res = await baseService.post(ROUTES.AUTH.CHANGEPASSWORD, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (err) {
        return err;
    }
};
export const mobileVerify = async (data) => {
    try {
        const res = await baseService.post(ROUTES.AUTH.MOBILEVERIFY, data);
        return res.data;
    } catch (err) {
        return err;
    }
};