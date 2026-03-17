import axiosInstance from "./axiosInstance";

export const getPlans = async () => {
  const response = await axiosInstance.get("/plans");
  return response.data;
};