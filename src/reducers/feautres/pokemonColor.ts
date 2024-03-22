// Import AxiosError from axios to handle errors
import { AxiosError } from 'axios';

// Import createSlice and createAsyncThunk from Redux Toolkit for Redux state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import getPokemonColor function from the API client to fetch Pokemon list data
import { getPokemonColor } from '../../api/client';

// Import setLoading function from common/loading module to handle loading state
import { setLoading } from '../common/loading';

// Import PokemonListResponse interface from types/types for defining the structure of Pokemon Color data
import { PokemonColorResponse, FetchBeerByNameParam } from '../../types/types';

export const fetchPokemonColorAsync = createAsyncThunk(
	'pokemonColor/fetchPokemonColor',
	async (param: FetchBeerByNameParam, { dispatch, rejectWithValue }) => {
		try {
			// Set loading state to true before fetching data
			dispatch(setLoading(true));
			// Fetch the Pokemon color with the provided name
			const name = param;
			const response = await getPokemonColor(name);
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
const initialState: { pokemonColor: PokemonColorResponse } = {
	// IMPORTANT If these variables (`name:''`) are not initialized,
	// IMPORTANT: TypeScript will throw errors when attempting to map over them.

	pokemonColor: {
		// IMPORTANT: Initialize the pokemonColor object with the expected structure to prevent TypeScript errors when accessing its properties later.
		color: {
			name: '',
		},
	},
};
// Create a slice for handling the pokemon Color state
const pokemonColorSlice = createSlice({
	name: 'pokemonColor', // Specify the name of the slice
	initialState, // Provide the initial state for the slice
	reducers: {}, // No reducers defined
	extraReducers: (builder) => {
		// Handle the fulfilled action of fetchPokemonColorAsync
		builder.addCase(fetchPokemonColorAsync.fulfilled, (state, action) => {
			state.pokemonColor = action.payload; // Update the pokemon coloer state with the fetched data
		});
	},
});

export default pokemonColorSlice.reducer; // Export the pokemon color reducer
