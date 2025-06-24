import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '2b7d4de218mshe5edf9ae9a65cc1p1edd23jsn61304727db5c');
      headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
      return headers;
    },
    credentials: 'omit',
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (countryCode) => `v1/charts/world?country_code=${countryCode}`,
    }),
    getSongsByGenre: builder.query({
      query: ({ genre, countryCode }) =>
        `v1/charts/genre-world?genre_code=${genre}&country_code=${countryCode}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `v2/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `v2/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) =>
        `v1/charts/country?country_code=${countryCode}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
