import apiSlice from "../../api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getUserPost: builder.query({
      query: (userId) => `posts/${userId}`
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
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    dislikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/dislike`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    commentOnPost: builder.mutation({
      query: ({ id, commentData }) => {
        console.log(commentData)
        return {
         url: `/posts/${id}/comment`,
          method: "POST",
          body: commentData,
        }
      },
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getPostComments: builder.query({
      query: ({postId}) => `posts/${postId}/comment`
    })
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
  useCommentOnPostMutation,
  useGetPostCommentsQuery
} = postsApiSlice;
