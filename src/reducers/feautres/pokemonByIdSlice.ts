// Import AxiosError from axios to handle errors
import { AxiosError } from 'axios';

// Import createSlice and createAsyncThunk from Redux Toolkit for Redux state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import getPokemonList function from the API client to fetch Pokemon list data
import { getPokemonByName } from '../../api/client';

// Import setLoading function from common/loading module to handle loading state
import { setLoading } from '../common/loading';

// Import PokemonListResponse interface from types/types for defining the structure of Pokemon list data
import { PokemonDataResponse, FetchBeerByNameParam } from '../../types/types';

/**
 * //FUNCTION-DESCRIPTION: Asynchronously fetches Pokemon data by ID.
 *
 * This function uses createAsyncThunk from Redux Toolkit to handle asynchronous
 * actions. It dispatches actions to set loading state before and after fetching data,
 * and handles errors gracefully by rejecting with a proper error value if the request fails.
 *
 * @param {FetchBeerByIdParam} param The parameter containing the ID of the Pokemon to fetch.
 * @returns {Promise<PokemonDataResponse>} A Promise resolving to the response containing the data of the Pokemon.
 */

export const fetchPokemonByIdAsync = createAsyncThunk(
	'pokemonById/fetchPokemonById',
	async (param: FetchBeerByNameParam, { dispatch, rejectWithValue }) => {
		try {
			// Set loading state to true before fetching data
			dispatch(setLoading(true));
			// Fetch the Pokemon data with the provided name
			const name = param;
			const response = await getPokemonByName(name);
			console.log(response);
			return response;
		} catch (err) {
			// Handle errors
			if (err instanceof AxiosError) {
				if (!err.response) {
					// If there is no response from the server, throw the error
					throw err;
				}
				// If there is a response, return the error response data
				return rejectWithValue(err.response.data);
			} else {
				// If it's not an AxiosError, throw the error
				throw err;
			}
		} finally {
			// Set loading state to false regardless of success or failure
			dispatch(setLoading(false));
		}
	}
);

// Initial state for the pokemon data slice
const initialState: { pokemonData: PokemonDataResponse } = {
	// IMPORTANT If these variables (`name:''`) are not initialized,
	// IMPORTANT: TypeScript will throw errors when attempting to map over them.

	pokemonData: {
		// IMPORTANT: Initialize the pokemonData object with the expected structure to prevent TypeScript errors when accessing its properties later.
		id: 0,
		name: '',
		height: 0,
		weight: 0,
		sprites: {
			front_default: '', // Initialize only the front_default property,
			front_shiny: '',
			other: {
				'official-artwork': {
					front_default: '',
				},
			},
		},

		stats: [{ base_stat: 0, effort: 0, stat: { name: '' } }], // Initialize with a single empty Statistic object
	},
};
// Create a slice for handling the pokemon list state
const pokemonDataSlice = createSlice({
	name: 'pokemonData', // Specify the name of the slice
	initialState, // Provide the initial state for the slice
	reducers: {}, // No reducers defined
	extraReducers: (builder) => {
		// Handle the fulfilled action of fetchPokemonListAsync
		builder.addCase(fetchPokemonByIdAsync.fulfilled, (state, action) => {
			state.pokemonData = action.payload; // Update the pokemon list state with the fetched data
		});
	},
});

export default pokemonDataSlice.reducer; // Export the pokemon data reducer
