import axios from "axios";
import { config } from "dotenv";
import useAuthStore from "../store/authStore";

const API_URL = "https://mentorship-api-2-cg33.onrender.com/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// intercepter to add the authorization bearer

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
