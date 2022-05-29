import {store} from '../store/store'
import movieReducer, { addFavorite, addWatchLater, tabSelection} from '../store/movieReducer'

const movie = {
    adult: false,
    backdrop_path: '/6jz8ayHiRNt0s1wiSdxemLfzGAX.jpg',
    genre_ids: [
      16,
      10751,
      35
    ],
    id: 15165,
    original_language: 'en',
    original_title: 'Barbie as The Princess & the Pauper',
    overview: 'In her first animated musical featuring seven original songs, Barbie comes to life in this modern re-telling of a classic tale of mistaken identity and the power of friendship. Based on the story by Mark Twain,',
    popularity: 85.652,
    poster_path: 'https://image.tmdb.org/t/p/w92/xHYsUwUe4MaNc6mbNBGTkqZSnPk.jpg',
    release_date: '2004-09-28',
    title: 'Barbie as The Princess & the Pauper',
    video: false,
    vote_average: 7.5,
    vote_count: 1206
}
  
describe('Run redux tests', () => {
    const state = store.getState().movieState
    
    it('Should initially set movies to an empty array', () => {
        expect(state.movies).toEqual([])
    })
    
    it('Should initially set favorites to an empty array', () => {
        expect(state.favorites).toEqual([])
    })
    
    it('Should initially set watchlist to an empty array', () => {
        const state = store.getState().movieState
        expect(state.watchLater).toEqual([])
    })
    
    it('Should initially set tab equal to the string "search"', () => {
        expect(state.tab).toEqual("search")
    })
    
    it('Should initially set isLoading to a false boolean', () => {
        expect(state.isLoading).toEqual(false)
    })

    it('Should handle a movie to being added to favorite empty list', () => {
        expect(movieReducer(state, addFavorite(movie))).toEqual({
            movies: [],
            favorites: [
                movie
            ],
            watchLater: [],
            tab: 'search',
            isLoading: false
        })
    })

    it('Should handle a movie to being removed from favorite if already exist', () => {
        const prevState = { ...state, favorites: [movie] }
        expect(movieReducer(prevState, addFavorite(movie))).toEqual({
            movies: [],
            favorites: [],
            watchLater: [],
            tab: 'search',
            isLoading: false
        })
    })


    it('Should handle a movie to being added to watchlist empty list', () => {
        expect(movieReducer(state, addWatchLater(movie))).toEqual({
            movies: [],
            watchLater: [
                movie
            ],
            favorites: [],
            tab: 'search',
            isLoading: false
        })
    })

    it('Should handle a movie to being removed from watchlist if already exist', () => {
        const prevState = { ...state, watchLater: [movie] }
        expect(movieReducer(prevState, addWatchLater(movie))).toEqual({
            movies: [],
            watchLater: [],
            favorites: [],
            tab: 'search',
            isLoading: false
        })
    })


    it('Should handle tab change', () => {
        expect(movieReducer(state, tabSelection('favorites'))).toEqual({
            movies: [],
            watchLater: [],
            favorites: [],
            tab: 'favorites',
            isLoading: false
        })
    })

})