// External imports (libraries)
import { createSlice } from '@reduxjs/toolkit';

// Define initial state for the loading slice
const initialState = {
	showLoading: false,
};

// Define the loading slice using createSlice
const loadingSlice = createSlice({
	name: 'loading', // Specify the name of the slice
	initialState, // Provide the initial state for the slice
	// Define reducers for the slice
	reducers: {
		// Reducer to update the loading state
		setLoading(state, action) {
			state.showLoading = action.payload;
		},
	},
});

export const { setLoading } = loadingSlice.actions; // Export the setLoading action creator
export default loadingSlice.reducer; // Export the loading reducer
