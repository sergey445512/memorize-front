import axios from "axios";
import { IAuthData } from "../models/IAuthData";

export const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    try {
      const originalRequest = error.config;
      console.log(originalRequest);
      if (error.response.status == 401 && !error.config._isRetry) {
        originalRequest._isRetry = true;
        const response = await axios.get<IAuthData>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return api.request(originalRequest);
      }
    } catch (e) {
      console.log(e);
    }
    throw error;
  }
);

export default api;
