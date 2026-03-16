import { showSuccess, showError } from "../utils/toast";
import * as authApi from "../api/auth";
import { useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const register = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.registerUser(data);
      showSuccess(res.message);
      return res;
    } catch (err) {
      showError(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.loginUser(data);
      localStorage.setItem("token", res.token);
       localStorage.setItem("userId", res.user.id);
        localStorage.setItem("username", res.user.username);
        localStorage.setItem("email", res.user.email);


      showSuccess(res.message || "Login successful");
      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unexpected error occurred";
      showError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const requestOtp = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.requestOtp(data);
      showSuccess(res.message || "OTP sent to email");
      return res;
    } catch (err) {
      showError(err.response?.data?.message || "Failed to send OTP");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.verifyOtp(data);
      showSuccess(res.message || "OTP verified");
      return res;
    } catch (err) {
      showError(err.response?.data?.message || "Invalid OTP");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.resetPassword(data);
      showSuccess(res.message || "Password updated successfully");
      return res;
    } catch (err) {
      showError(err.response?.data?.message || "Password reset failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    requestOtp,
    verifyOtp,
    resetPassword,
    loading
  };
};