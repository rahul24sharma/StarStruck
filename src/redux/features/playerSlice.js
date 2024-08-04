import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      state.currentSongs = action.payload?.data?.tracks?.hits || 
                            action.payload?.data?.tracks || 
                            action.payload.data || [];
      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      const nextIndex = action.payload;
      if (state.currentSongs[nextIndex]) {
        state.activeSong = state.currentSongs[nextIndex]?.track || state.currentSongs[nextIndex];
        state.currentIndex = nextIndex;
        state.isActive = true;
      }
    },

    prevSong: (state, action) => {
      const prevIndex = action.payload;
      if (state.currentSongs[prevIndex]) {
        state.activeSong = state.currentSongs[prevIndex]?.track || state.currentSongs[prevIndex];
        state.currentIndex = prevIndex;
        state.isActive = true;
      }
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
