
import axiosInstance, { setAccessToken } from "./axiosInstance";

export const authAPI = {
  login: async (data) => {
    const res = await axiosInstance.post("/user/login", data);
    setAccessToken(res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    return res.data;
  },

  register: async (data) => {
    const res = await axiosInstance.post("/user/register", data);
    return res.data;
  },

  logout: () => {
    setAccessToken("");
    localStorage.removeItem("refreshToken");
  },

  profile: () => axiosInstance.get("/user/profile"),
};
