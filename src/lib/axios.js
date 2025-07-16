import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:8000/api" : "https://tycoontactics.onrender.com/api",
    withCredentials: true,
});