import axiosInstance from "./axiosInstance";

export const registerUser = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const requestOtp = async (data) => {
  const response = await axiosInstance.post("/auth/request-otp", data);
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await axiosInstance.post("/auth/verify-otp", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axiosInstance.post("/auth/reset-password", data);
  return response.data;
};