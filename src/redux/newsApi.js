import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEWS_API_URL;
const apiKey = process.env.NEWS_API_KEY;
// const apiAuth = process.env.NEWS_API_AUTHORIZATION;a

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders:(headers)=>{
      headers.set('apikey',apiKey)
      headers.set('Authorization',`Bearer ${apiKey}`)
    }
  }),
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: () => "/News2?select=*",
    }),
    getNewsByCategory: builder.query({
      query: (category) => `/News2?or=(category.eq.${category},tags.cs.{${category}})&select=*`
  }),
    getAllNewsByCurrentAuthor: builder.query({
      query: (written_by) => `/News2?written_by=eq.${written_by}&select=*`,
    }),
    getNewsById:builder.query({
      query:(id)=>`/News2?id=eq.${id}&select=*`
    }),
    // sendNew: builder.mutation({
    //   query: (newContent) => ({
    //     url: "/News2",
    //     method: "POST",
    //     body: newContent,
    //   }),
    // }),
    // updateNews: builder.mutation({
    //   query: ({ id, update }) => ({
    //     url: `/News2?id=eq.${id}`,
    //     method: "PATCH",
    //     body: update,
    //   }),
    // }),
    // deleteNews: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/News2?id=eq.${id}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetAllNewsByCurrentAuthorQuery,
  useGetNewsByCategoryQuery,
  useGetNewsByIdQuery,
//   useSendNewMutation,
//   useUpdateNewsMutation,
//   useDeleteNewsMutation,
} = newsApi;
