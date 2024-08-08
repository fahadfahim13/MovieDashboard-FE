import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tvSeriesApi = createApi({
  reducerPath: 'tvSeriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  } }),
  endpoints: (builder) => ({
    getTvSeriesList: builder.mutation({
      query: (body) => ({
        url: `/api/tv-series/get`,
        method: 'POST',
        body,
      }),
    }),
    createTvSeries: builder.mutation({
      query: (body) => ({
        url: `/api/tv-series/create`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetTvSeriesListMutation,
  useCreateTvSeriesMutation
 } = tvSeriesApi;