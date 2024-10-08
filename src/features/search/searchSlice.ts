import apiSlice from "../../api/apiSlice";

export const searchUserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSearchResult: builder.query({
      query: (q) => `users/search?q=${q}`,
    }),
  }),
});


export const {
  useLazyGetSearchResultQuery
} = searchUserApiSlice