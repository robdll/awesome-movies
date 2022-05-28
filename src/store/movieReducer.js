import { createSlice } from '@reduxjs/toolkit'


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
})

// Action creators are generated for each case reducer function
export const { add } = movieSlice.actions

export default movieSlice.reducer