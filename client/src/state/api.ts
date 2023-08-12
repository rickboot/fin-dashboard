import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK createApi defines hooks to corresponding endpoints to fetch/transform redux state
// RTK fetchBaseQuery is a wrapper around fetch that simplifies requests
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),

  reducerPath: 'main',

  tagTypes: ['Kpis'],

  endpoints: (build) => ({
    getKpis: build.query<void, void>({
      query: () => 'kpi/kpis',

      providesTags: ['Kpis'],
    }),
  }),
});

export const { useGetKpisQuery } = api;
