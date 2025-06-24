import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { shazamGeoApi } from './services/shazamGeoApi';
import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamcore';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    [shazamGeoApi.reducerPath]: shazamGeoApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
