// Importing axios for making HTTP requests and types for Pokemon list response and pagination parameters.
import { AxiosError } from 'axios';
import { axiosInstance } from './config/apiConfig';
import {
	PokemonListResponse,
	PaginationParams,
	PokemonDataResponse,
	FetchBeerByNameParam,
	PokemonColorResponse,
	PokemonListWithDetails,
} from '../types/types';

// /**
//  * //FUNCTION-DESCRIPTION: Fetches a list of Pokemon from the API!
//  *
//  * @param {PaginationParams} params - The pagination parameters including limit and offset.
//  * @returns {Promise<PokemonListResponse>} The response containing the list of Pokemon.
//  */

// export const getPokemonList = async ({ limit, offset }: PaginationParams): Promise<PokemonListResponse> => {
// 	try {
// 		// Validate limit and offset parameters
// 		if (typeof limit !== 'number' || typeof offset !== 'number' || limit <= 0 || offset < 0) {
// 			throw new Error('Invalid limit or offset parameters');
// 		}

// 		// Make a GET request to the Pokemon API with the provided limit and offset
// 		const response = await axiosInstance.get(`pokemon/?limit=${limit}&offset=${offset}`);

// 		// Check if the response status is OK
// 		if (response.status !== 200) {
// 			throw new Error(`Request failed with status ${response.status}`);
// 		}

// 		// Return the response data containing the list of Pokemon
// 		return response.data;
// 	} catch (err) {
// 		const error = err as AxiosError;
// 		// Log and rethrow any errors that occur during the request
// 		console.error('Error making GET request:', error);

// 		if (error.response) {
// 			// The request was made and the server responded with a status code
// 			// that falls out of the range of 2xx
// 			console.log(error.response.data);
// 			console.log(error.response.status);
// 			console.log(error.response.headers);
// 		} else if (error.request) {
// 			// The request was made but no response was received
// 			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
// 			// http.ClientRequest in node.js
// 			console.log(error.request);
// 		} else {
// 			// Something happened in setting up the request that triggered an Error
// 			console.log('Error', error.message);
// 		}
// 		console.log(error.config);

// 		throw error;
// 	}
// };

/**
 * //FUNCTION-DESCRIPTION: Fetches Pokemon data by ID from the API!
 *
 * @param {string} name The name of the Pokemon to fetch.
 * @returns {Promise<PokemonDataResponse>} The response containing the data of the Pokemon.
 */

export const getPokemonByName = async (name: FetchBeerByNameParam): Promise<PokemonDataResponse> => {
	try {
		// Make a GET request to the Pokemon API with the provided limit and offset
		const response = await axiosInstance.get(`pokemon/${name}`);

		// Check if the response status is OK
		if (response.status !== 200) {
			throw new Error(`Request failed with status ${response.status}`);
		}

		// Return the response data containing the list of Pokemon
		return response.data;
	} catch (err) {
		const error = err as AxiosError;
		// Log and rethrow any errors that occur during the request
		console.error('Error making GET request:', error);

		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		console.log(error.config);

		throw error;
	}
};

/**
 * //FUNCTION-DESCRIPTION: Fetches the color information of a Pokémon by its name from the API.
 *
 * @param {string} name The name of the Pokémon to fetch the color information for.
 * @returns {Promise<PokemonColorResponse>} A promise that resolves with the color information of the Pokémon.
 */
export const getPokemonColor = async (name: FetchBeerByNameParam): Promise<PokemonColorResponse> => {
	try {
		const response = await axiosInstance.get(`pokemon-species/${name}`);

		// Check if the response status is OK
		if (response.status !== 200) {
			throw new Error(`Request failed with status ${response.status}`);
		}

		// Return the response data containing the color information of the Pokémon
		return response.data;
	} catch (err) {
		const error = err as AxiosError;
		// Log and rethrow any errors that occur during the request
		console.error('Error making GET request:', error);

		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		console.log(error.config);

		throw error;
	}
};

/**
 *  //FUNCTION-DESCRIPTION: Fetches a list of Pokemon from the API with their images!
 *
 * @param {PaginationParams} params - The pagination parameters including limit and offset.
 * @returns {Promise<PokemonListWithDetails>} The response containing the list of Pokemon with their images.
 */
export const getPokemonListWithImages = async ({
	limit,
	offset,
}: PaginationParams): Promise<PokemonListWithDetails> => {
	try {
		// Validate limit and offset parameters
		if (typeof limit !== 'number' || typeof offset !== 'number' || limit <= 0 || offset < 0) {
			throw new Error('Invalid limit or offset parameters');
		}

		// Make a GET request to the Pokemon API with the provided limit and offset
		const response = await axiosInstance.get(`pokemon/?limit=${limit}&offset=${offset}`);

		// Check if the response status is OK
		if (response.status !== 200) {
			throw new Error(`Request failed with status ${response.status}`);
		}

		// Extract the list of Pokemon from the response data

		// console.log('1213', response.data.count);
		const pokemonList = response.data.results;

		// console.log('asdasdasdasd', pokemonList.data);

		// Fetch the details for each Pokemon to get their images
		const pokemonDetailsPromises = pokemonList.map(async (pokemon: any) => {
			const pokemonDetailResponse = await axiosInstance.get(pokemon.url);
			return pokemonDetailResponse.data;
		});

		// Wait for all requests to complete
		const pokemonDetails = await Promise.all(pokemonDetailsPromises);

		// Combine the original list of Pokemon with their details including images
		const pokemonListWithImages = pokemonList.map((pokemon: any, index: number) => ({
			name: pokemon.name,
			image: pokemonDetails[index].sprites.other['dream_world'].front_default,
		}));

		// Return the response containing the list of Pokemon with their images
		console.log(pokemonListWithImages);

		const pokemonListWithDetails = {
			count: response.data.count,
			next: response.data.next,
			previous: response.data.previous,
			results: pokemonListWithImages,
		};

		console.log('sdbfasbdfhjwAF', pokemonListWithDetails);

		return pokemonListWithDetails;
	} catch (err) {
		const error = err as AxiosError;
		// Log and rethrow any errors that occur during the request
		console.error('Error making GET request:', error);

		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		console.log(error.config);

		throw error;
	}
};
