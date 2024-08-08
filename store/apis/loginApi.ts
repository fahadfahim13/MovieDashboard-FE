import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/api/auth/login`,
        method: 'POST',
        body
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;