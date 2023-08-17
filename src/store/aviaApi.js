import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const aviaApi = createApi({
  reducerPath: 'aviaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
  }),

  endpoints: (builder) => ({
    getSearchId: builder.query({
      query: () => '/search',
    }),
    getTickets: builder.query({
      query: (searchId) => `/tickets?searchId=${searchId}`,
    }),
  }),
});

export default aviaApi;
