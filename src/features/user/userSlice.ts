import apiSlice from "../../api/apiSlice";

export const searchUserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSearchResult: builder.query({
      query: (q) => `users/search?q=${q}`,
    }),
    getUser: builder.query({
      query: (q) => `users/${q}`,
    }),
    getTopUsers: builder.query({
      query: () => `users/top`,
    }),
    uploadProfilePic: builder.mutation({
      query: (profilePicture) => ({
        url: `users/update-profile-picture`,
        method: 'POST',
        body: profilePicture
      })
    }),
    followUser: builder.mutation({
      query: (id) => ({
        url: `follow-unfollow/follow/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Followers"]
    }),
    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `follow-unfollow/unfollow/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Followers"]
    }),
    getFollower: builder.query({
      query: (id) => `follow-unfollow/followers/${id}`,
      providesTags: ["Followers"],
    }),
  }),
});

export const {
  useLazyGetSearchResultQuery,
  useGetUserQuery,
  useGetTopUsersQuery,
  useFollowUserMutation,
  useGetFollowerQuery,
  useUnfollowUserMutation,
  useUploadProfilePicMutation
} = searchUserApiSlice;
