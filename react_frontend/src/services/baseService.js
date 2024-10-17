import axios from "axios";
import { store } from "../redux/store";
import { clearAuth, setrefreshToken } from "../redux/slice/authSlice"
const BASE_URL = import.meta.env.VITE_API_URL;
const baseService = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        'ngrok-skip-browser-warning': '1'
    },
});
const refreshTokenService = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

refreshTokenService.interceptors.response.use(
    response => response,
    error => {
        store.dispatch(clearAuth());
        return Promise.reject(error);
    }
);

baseService.interceptors.response.use(
    response => response,
    async error => {
        const { response, config } = error;
        if (response && response.status === 400) {
            const { auth } = store.getState();
            try {
                const refreshResponse = await refreshTokenService.get('/refreshToken', {
                    headers: {
                        'x-auth-token': auth.refreshToken,
                    },
                });
                store.dispatch(setrefreshToken(refreshResponse?.data?.data));
                config.headers['x-auth-token'] = refreshResponse?.data?.data.token;
                config.baseURL = undefined;

                return baseService.request(error.config);
            } catch (refreshError) {
                store.dispatch(clearAuth());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
export default baseService;
