import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { searchMovies, searchTrailer } from '../services/MovieApi'

export const fetchMovies = createAsyncThunk(
  'movie/searchMovie',
  async (title, thunkAPI) => {
    const response = await searchMovies(title)
    return response.results
  }
)


export const fetchVideo = createAsyncThunk(
  'movie/fetchTrailer',
  async (id, thunkAPI) => {
    const response = await searchTrailer(id)
    return response.results
  }
)


const initialState = {
  movies: [],
  favorites: [],
  watchLater: [],
  tab: 'search',
  isLoading: false,
  isLoadingTrailer: false,
  trailer: {},
  modal: false
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    tabSelection: (state, action) => {
      state.tab = action.payload;
    },
    toggleModal: (state, action) => {
      state.modal = !state.modal;
    },
    addFavorite: (state, action) => {
      const existInList = state.favorites.find( item => item.id === action.payload.id );
      if(!existInList) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = state.favorites.filter(item => item.id !== action.payload.id)
      }
    },
    addWatchLater: (state, action) => {
      const existInList = state.watchLater.find( item => item.id === action.payload.id );
      if(!existInList) {
        state.watchLater.push(action.payload);
      } else {
        state.watchLater = state.watchLater.filter(item => item.id !== action.payload.id)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVideo.pending, (state, action) => {
      state.isLoadingTrailer = true;
      state.trailer = {};
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const basicUrl = `https://image.tmdb.org/t/p/w92`
      const movies = action.payload.map( item => {
        item.poster_path = item.poster_path ? `${basicUrl}${item.poster_path}` : `./not_available.jpeg`
        return item;
      })
      state.movies = movies;
      state.isLoading = false;
    });
    builder.addCase(fetchVideo.fulfilled, (state, action) => {
      state.isLoadingTrailer = false;
      state.trailer = action.payload.shift();
      state.modal = true;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.movies = [];
      state.isLoading = false;
    });
    builder.addCase(fetchVideo.rejected, (state, action) => {
      state.isLoadingTrailer = false;
      state.trailer = {};
    });
  },
})

// Action creators are generated for each case reducer function
export const { addFavorite, addWatchLater, tabSelection, toggleModal } = movieSlice.actions

export default movieSlice.reducer