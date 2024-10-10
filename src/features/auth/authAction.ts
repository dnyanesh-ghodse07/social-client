import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { Credentials } from "../../type";
interface LoginResponse {
  token: string;
  username: string;
  userId: string;
}

export const loginUser = createAsyncThunk<LoginResponse, Credentials>(
  "auth/login",
  async (credentials) => {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    localStorage.setItem("token", response?.data?.token);
    localStorage.setItem("username", response?.data?.username);
    localStorage.setItem("userId", response?.data?.userId);

    return {
      token: response.data.token,
      userId: response?.data?.userId,
      username: response.data.username,
    };
  }
);

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
  localStorage.removeItem("user");
  return {};
});
