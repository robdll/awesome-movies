const ApiConfig = (url, baseConfig) => ({
	get: (config) => fetch(url, {  ...baseConfig, ...config, method: "GET" })
		.then((response) => response.json())
		.catch((err) => console.log('ERR is: ',err)),
	post: (config) => fetch(url, {  ...baseConfig, ...config, method: "POST" })
		.then((response) => response.json())
		.catch((err) => console.log('ERR is: ',err)),
});

const DOMAIN = `https://api.themoviedb.org/`;
const VERSION = `3`;
const APIKEY = `?api_key=5b22a10bb7349a0914d536d28d20547a`

const Api = (endpoint = '', query = '') => {
	const headers = { 'Content-Type': 'application/json' };
	return ApiConfig(`${DOMAIN}${VERSION}${endpoint}${APIKEY}${query}`, { headers })
}

export default Api;