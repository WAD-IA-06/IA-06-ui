
import axios from "axios";

let accessToken = "";

export const setAccessToken = (token) => {
    accessToken = token;
};

export const clearAccessToken = () => {
    accessToken = "";
};

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.warn("No refresh token, logging out...");
                clearAccessToken();
                return Promise.reject(error);
            }

            try {
                const res = await axios.post("http://localhost:3000/user/refresh-token", {
                    refreshToken,
                });

                accessToken = res.data.accessToken;
                localStorage.setItem("refreshToken", res.data.refreshToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.warn("Refresh token expired => logout");
                clearAccessToken();
                localStorage.removeItem("refreshToken");
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

