import axiosInstance from "../utils/axiosInstance";

export const getAllPosts = () => axiosInstance.get('/posts');
export const getPost = (id) => axiosInstance.get(`/posts/${id}`);
export const createPost = (postData) => axiosInstance.post('/posts', postData);
export const likePost = (id) => axiosInstance.post(`/posts/${id}/like`);
export const dislikePost = (id) => axiosInstance.post(`/posts/${id}/dislike`);
export const commentOnPost = (id, commentData) =>
  axiosInstance.post(`/posts/${id}/comment`, commentData);
export const getCommentOnPost = (id, commentData) =>
  axiosInstance.post(`/posts/${id}/comment`, commentData);