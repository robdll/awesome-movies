import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { searchMovies } from '../services/MovieApi'

export const fetchMovies = createAsyncThunk(
  'movie/searchMovie',
  async (title, thunkAPI) => {
    const response = await searchMovies(title)
    return response.results
  }
)


const initialState = {
  movies: [],
  favorites: [],
  watchLater: [],
  tab: 'search',
  isLoading: false,
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    tabSelection: (state, action) => {
      state.tab = action.payload;
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
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const basicUrl = `https://image.tmdb.org/t/p/w92`
      const movies = action.payload.map( item => {
        item.poster_path = item.poster_path ? `${basicUrl}${item.poster_path}` : `./not_available.jpeg`
        return item;
      })
      state.movies = movies;
      state.isLoading = false;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.movies = [];
      state.isLoading = false;
    });
  },
})

// Action creators are generated for each case reducer function
export const { addFavorite, addWatchLater, tabSelection } = movieSlice.actions

export default movieSlice.reducer