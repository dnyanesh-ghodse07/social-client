import apiSlice from "../../api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getSavePosts: builder.query({
      query: (userId) => `/posts/saved/${userId}`,
      providesTags: ["Post"],
    }),
    savePost: builder.mutation({
      query: (postId) => ({ url: `/posts/save/${postId}`, method: "POST" }),
      invalidatesTags: ['Post']
    }),
    unSavePost: builder.mutation({
      query: (postId) => ({ url: `/posts/unsave/${postId}`, method: "POST" }),
      invalidatesTags: ['Post']
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({ url: `/posts/${id}`, method: "DELETE" }),
      invalidatesTags: ["Post"],
    }),
    getUserPost: builder.query({
      query: (userId) => `posts/user/${userId}`,
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
    dislikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/dislike`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
    commentOnPost: builder.mutation({
      query: ({ id, commentData }) => {
        console.log(commentData);
        return {
          url: `/posts/${id}/comment`,
          method: "POST",
          body: commentData,
        };
      },
      invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
    getPostComments: builder.query({
      query: ({ postId }) => `posts/${postId}/comment`,
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useGetUserPostQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
  useCommentOnPostMutation,
  useGetPostCommentsQuery,
  useDeletePostMutation,
  useSavePostMutation,
  useGetSavePostsQuery,
  useUnSavePostMutation
} = postsApiSlice;
