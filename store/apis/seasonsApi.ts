import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const seasonsApi = createApi({
  reducerPath: "seasonsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }),
  endpoints: (builder) => ({
    // getTvSeriesList: builder.mutation({
    //   query: (body) => ({
    //     url: `/api/tv-series/get`,
    //     method: "POST",
    //     body,
    //   }),
    // }),
    getSeasonDetails: builder.mutation({
      query: (id: string) => ({
        url: `/api/seasons/get`,
        method: "POST",
        body: {
          id,
        },
      }),
    }),
    createSeason: builder.mutation({
      query: (body) => ({
        url: `/api/seasons/create`,
        method: "POST",
        body,
      }),
    }),
    createEpisode: builder.mutation({
      query: (body) => ({
        url: `/api/episodes/create`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateSeasonMutation,
  useGetSeasonDetailsMutation,
  useCreateEpisodeMutation
} = seasonsApi;
