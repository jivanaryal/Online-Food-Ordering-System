import axios from "axios";
import { API_URL } from "../constants/constant";
const axiosInstance = axios.create({
  baseURL: API_URL,
  // baseURL: "https://192.168.16.240:5005/",
  withCredentials: true, // Include credentials for cross-origin requests
});

// Add a request interceptor
import { InternalAxiosRequestConfig } from "axios";

interface AxiosError {
  // Define the properties you need from the AxiosError
  message: string;
  [key: string]: any;
}

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return config; // Return the modified config
  },
  (error: AxiosError) => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default axiosInstance;
