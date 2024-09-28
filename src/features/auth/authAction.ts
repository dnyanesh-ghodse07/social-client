import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { Credentials } from "../../type";
interface LoginResponse {
  token: string;
  user?: {
    id: string;
    name: string;
  };
}

export const loginUser = createAsyncThunk<LoginResponse, Credentials>("auth/login", async (credentials) => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", credentials);
  localStorage.setItem("token", response?.data?.token);

  return response.data;
});

export const registerUser = createAsyncThunk<LoginResponse, Credentials>(
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
