import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { KpiData, ProductData, TransactionData } from './types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'api',

  tagTypes: ['Kpis', 'Products', 'Transactions'],

  endpoints: (build) => ({
    getKpis: build.query<Array<KpiData>, void>({
      query: () => 'kpi/kpis',
      providesTags: ['Kpis'],
    }),

    getProducts: build.query<Array<ProductData>, void>({
      query: () => 'product/products',
      providesTags: ['Products'],
    }),

    getTransactions: build.query<Array<TransactionData>, void>({
      query: () => 'transaction/transactions',
      providesTags: ['Transactions'],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
  api;
