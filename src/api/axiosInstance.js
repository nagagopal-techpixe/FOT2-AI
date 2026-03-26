import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// catch 403 PLAN_REQUIRED on every response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 403 &&
      error.response?.data?.code === "PLAN_REQUIRED"
    ) {
      window.dispatchEvent(new CustomEvent("plan:required")); // ← shows modal
      return Promise.resolve(null);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;