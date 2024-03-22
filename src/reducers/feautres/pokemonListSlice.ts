// Import AxiosError from axios to handle errors
import { AxiosError } from 'axios';

// Import createSlice and createAsyncThunk from Redux Toolkit for Redux state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import getPokemonList function from the API client to fetch Pokemon list data
import { getPokemonListWithImages } from '../../api/client';

// Import setLoading function from common/loading module to handle loading state
import { setLoading } from '../common/loading';

// Import PokemonListResponse interface from types/types for defining the structure of Pokemon list data
import { PokemonListWithDetails, PaginationParams } from '../../types/types';

/**
 * //FUNCTION-DESCRIPTION: Asynchronous function for fetching a list of Pokemon!
 *
 * This function fetches a list of Pokemon based on pagination parameters
 * including limit and offset, utilizing the Redux Thunk API object.
 *
 * @param {PaginationParams} params - The pagination parameters including limit and offset.
 * @param {ThunkApiConfig} api - The Redux Thunk API object.
 * @returns {Promise<PokemonListWithDetails | AxiosError>} The response containing the list of Pokemon, or an error value.
 */
export const fetchPokemonListAsync = createAsyncThunk(
	'pokemonList/fetchPokemonList',
	async ({ limit, offset }: PaginationParams, { dispatch, rejectWithValue }) => {
		try {
			// Set loading state to true before fetching data
			dispatch(setLoading(true));
			// Fetch the Pokemon list with the provided limit and offset values
			const response = await getPokemonListWithImages({ limit, offset });
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

// Initial state for the pokemon list slice
const initialState: { pokemonList: PokemonListWithDetails } = {
	// IMPORTANT If these variables (`count: 0`, `next: null`, `previous: null`, `results: []`) are not initialized,
	// IMPORTANT: TypeScript will throw errors when attempting to map over them.

	pokemonList: {
		// IMPORTANT: Initialize the pokemonList object with the expected structure to prevent TypeScript errors when accessing its properties later.
		count: 0,
		next: null,
		previous: null,
		results: [],
	},
};

// Create a slice for handling the pokemon list state
const pokemonSlice = createSlice({
	name: 'pokemonList', // Specify the name of the slice
	initialState, // Provide the initial state for the slice
	reducers: {}, // No reducers defined
	extraReducers: (builder) => {
		// Handle the fulfilled action of fetchPokemonListAsync
		builder.addCase(fetchPokemonListAsync.fulfilled, (state, action) => {
			state.pokemonList = action.payload; // Update the pokemon list state with the fetched data
		});
	},
});

export default pokemonSlice.reducer; // Export the pokemonList reducer
