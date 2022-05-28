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
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    add: (state) => {
      state.movies.push({
        url: `https://via.placeholder.com/80x120/0000FF/808080`,
        title: 'my title',
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const basicUrl = `https://image.tmdb.org/t/p/w92`
      const movies = action.payload.map( item => {
        item.poster_path = item.poster_path ? `${basicUrl}${item.poster_path}` : `./not_available.jpeg`
        return item;
      })
      state.movies = movies;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.movies = [];
    });
  },
})

// Action creators are generated for each case reducer function
export const { add } = movieSlice.actions

export default movieSlice.reducer