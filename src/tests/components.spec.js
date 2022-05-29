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
    backdrop_path: '/6jz8ayHiRNt0s1wiSdxemLfzGAX.jpg',
    id: 15165,
    title: 'Barbie as The Princess & the Pauper',
}

// We use msw to intercept the network request during the test,
// and return few movie in the response after 150ms
export const handlers = [
    rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
        return res(ctx.json([
            movie, movie, movie
        ]), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
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
        expect(inputNode.value).toEqual('as')
    })

    it('Should search for movies and populate display result table', async () => {
        render(<Provider store={store}><App /></Provider>);
        const inputNode = screen.getByTestId('search-input')
        fireEvent.change(inputNode, {target: {value: 'as'}})
        const searchIcon = screen.getByTestId('search-icon')
        await act(()=> {
            fireEvent.click(searchIcon)
            const resultTable = screen.getByTestId('result-table')
            expect(resultTable).toBeInTheDocument();
        })    
    })

})
