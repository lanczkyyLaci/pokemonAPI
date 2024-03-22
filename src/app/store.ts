// External imports (libraries)
import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import pokemonListReducer from '../reducers/feautres/pokemonListSlice';
import pokemonByIdReducer from '../reducers/feautres/pokemonByIdSlice';
import pokemonColorReducer from '../reducers/feautres/pokemonColor';
import loadingReducer from '../reducers/common/loading';

// Configure Redux store with combined reducers
export const store = configureStore({
	reducer: {
		pokemonList: pokemonListReducer, // Reducer for managing Pokemon list state
		pokemonData: pokemonByIdReducer, // Reducer for managing Pokemon data
		pokemonColor: pokemonColorReducer, // Reducer for managing Pokemon color
		loading: loadingReducer, // Reducer for managing loading state
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
