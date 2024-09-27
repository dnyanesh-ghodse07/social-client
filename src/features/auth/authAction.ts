import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);

  localStorage.setItem("token", response?.data?.token);

  return response.data;
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials) => {
    const response = await axiosInstance.post("/auth/register", credentials);

    localStorage.setItem("token", response?.data?.token);

    return response.data;
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  // Optionally handle any server-side logout logic
  localStorage.removeItem("token");
  return {};
});
