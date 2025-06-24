import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamGeoApi = createApi({
  reducerPath: 'shazamGeoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '2b7d4de218mshe5edf9ae9a65cc1p1edd23jsn61304727db5c');
      headers.set('X-RapidAPI-Host', 'shazam.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAroundYouSongs: builder.query({
      query: (countryCode) => `songs/list-geo?country_code=${countryCode}&limit=20`,
    }),
  }),
});

export const { useGetAroundYouSongsQuery } = shazamGeoApi;
