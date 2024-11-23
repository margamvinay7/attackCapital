import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  // Ensure the code is running on the client side
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      config.headers.Authorization = `Bearer ${storedToken}`;
    }
  }
  return config;
});

export default API;
