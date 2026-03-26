import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fotwo.bizmailo.com/api",
  //https://fotwo.bizmailo.com/api
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;