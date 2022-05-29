import React from 'react'
import ReactDOM from 'react-dom/client';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen } from './test-utils'
import App from '../components/App/App'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { store } from '../store/store'

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

// We use msw to intercept the network request during the test,
// and return few movie in the response after 150ms
export const handlers = [
    rest.get('/search/movie', (req, res, ctx) => {
        return res(ctx.json([
            movie, movie, movie
        ]), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

let container;

// Reset any runtime request handlers we may add during the tests.
beforeEach(() => {
    container = document.createElement('Provider');
    document.body.appendChild(container);
})


// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
    document.body.removeChild(container);
    container = null;
    return server.resetHandlers()
});

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Components test', () => {
    it('Should render a title', async () => {
        render(<App />)
        expect(screen.getByText(/AwesomeMovies/i)).toBeInTheDocument()
    })

    it('Should rendere an input with a placeholder', async () => {
        render(<App />)
        const inputNode = screen.getByPlaceholderText('Search for a movie title')
        expect(inputNode).toBeInTheDocument()
    })
    
    it('Should change input value', async () => {
        render(<App />)
        const inputNode = screen.getByPlaceholderText('Search for a movie title')
        fireEvent.change(inputNode, {target: {value: 'as'}})
        console.log(inputNode.value)
        expect(inputNode.value).toEqual('as')
    })

    it('Should search for movies', async () => {
        act(() => {
            ReactDOM.createRoot(container).render(<Provider store={store}><App /></Provider>);
        });

        const inputNode = screen.getByTestId('search-input')
        fireEvent.change(inputNode, {target: {value: 'as'}})
        const searchIcon = screen.getByTestId('search-icon')
        act(()=> {
            fireEvent.click(searchIcon)
            const resultTable = screen.getByTestId('result-table')
            expect(resultTable).toBeInTheDocument();
        })
        
    })
      
})
