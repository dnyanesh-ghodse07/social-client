import apiSlice from "../../api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatMessages: builder.query({
      query: ({ user1Id, user2Id }) => `chat/${user1Id}/${user2Id}`,
      providesTags: ["Chat"],
    }),
    sendMessage: builder.mutation({
      query: (messageContent) => ({
        url: `chat/message`,
        method: "POST",
        body: messageContent,
      }),
      invalidatesTags: ["Chat"],
    }),
    getAllChats: builder.query({
      query: ({ userId }) => `chat/${userId}`,
      // providesTags: ["Chat"],
    }),
  }),
});

export const { useGetChatMessagesQuery, useSendMessageMutation, useGetAllChatsQuery } = chatApiSlice;
