import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

let accessToken = null; 
export const getAccessToken = () => accessToken;
export const setAccessToken = (token) => (accessToken = token);

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest.__retry) {
            originalRequest.__retry = true;

            try {
                const refreshRes = await axios.post(
                    "http://localhost:3000/user/refresh-token",
                    { refreshToken: localStorage.getItem("refreshToken") },
                    { withCredentials: true }
                );

                const newAccess = refreshRes.data.accessToken;
                setAccessToken(newAccess);

                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                return api(originalRequest);
            } catch (error) {
                console.log("Refresh token expired. Logging out.");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
            }
        }

        return Promise.reject(err);
    }
);

export default api;
