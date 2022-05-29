import Api from './api';

export function searchMovies(title) {
	return Api(`/search/movie`, `&query=${title}`).get();
}


export function searchTrailer(title) {
	return Api(`/movie/${title}/videos`).get();
}

