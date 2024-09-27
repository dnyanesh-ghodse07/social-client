import axiosInstance from "../utils/axiosInstance";

interface CommentData {
  id: string | number;
  commentData: { text: string };
}

export const getAllPosts = () => axiosInstance.get("/posts");
export const getPost = (id: string | number) =>
  axiosInstance.get(`/posts/${id}`);
export const createPost = (postData: { text: string }) =>
  axiosInstance.post("/posts", postData);
export const likePost = (id: string | number) =>
  axiosInstance.post(`/posts/${id}/like`);
export const dislikePost = (id: string | number) =>
  axiosInstance.post(`/posts/${id}/dislike`);
export const commentOnPost = (id: string | number, commentData: CommentData) =>
  axiosInstance.post(`/posts/${id}/comment`, commentData);
export const getCommentOnPost = (
  id: string | number,
  commentData: CommentData
) => axiosInstance.post(`/posts/${id}/comment`, commentData);
