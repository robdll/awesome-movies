import Api from './api';

export function searchMovies(title) {
	return Api(`/search/movie`, `&query=${title}`).get();
}