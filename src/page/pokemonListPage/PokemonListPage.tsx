// External imports (libraries)
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// -- Material-UI components --
import { Container, Grid, Pagination } from '@mui/material';

// Internal imports (project files)
import { RootState } from '../../app/store';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchPokemonListAsync } from '../../reducers/feautres/pokemonListSlice';
import { PokemonCard } from '../../components/pokemonCard/PokemonCard';
import { Loading } from '../../components/loading/Loading';
import { getPokemonListWithImages } from '../../api/client';

// Relative imports
import { PAGE_LIMIT, INITIAL_OFFSET } from '../../utils/constant';

// PokemonListPage component
export const PokemonListPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const [offset, setOffset] = useState(INITIAL_OFFSET); // State to track the pagination offset
	const { pokemonList } = useSelector((state: RootState) => state.pokemonList); // Using useSelector hook to access the pokemonList state from the Redux store
	const { showLoading } = useSelector((state: RootState) => state.loading);

	useEffect(() => {
		// It dispatches an action to fetch the Pokemon list asynchronously
		dispatch(fetchPokemonListAsync({ limit: PAGE_LIMIT, offset }));
		getPokemonListWithImages({ limit: PAGE_LIMIT, offset });
	}, [dispatch, offset]);

	// Function to handle page change in the Pagination component
	const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
		// Calculate the new offset based on the new page number
		const newOffset = (newPage - 1) * PAGE_LIMIT;
		// Set the new offset
		setOffset(newOffset);
	};

	return (
		<React.Fragment>
			<Container>
				{!showLoading ? (
					<React.Fragment>
						{/* Displaying Pokemon Cards in a grid layout. */}
						<Grid container spacing={4} pt={2}>
							{/* Mapping through the list of Pokemon to render each Pokemon card. */}
							{pokemonList.results.map((pokemon, index) => (
								<React.Fragment key={index}>
									<Grid item xs={12} sm={6} md={4} lg={3}>
										<PokemonCard image={pokemon.image} name={pokemon.name} />
									</Grid>
								</React.Fragment>
							))}
						</Grid>

						{/* Display Pokémon list Pagination content here */}
						<Grid container pt={4}>
							<Grid item xs={12} container direction="row" justifyContent="center" alignItems="center">
								{/* Add Pagination component for pagination */}
								<Pagination
									color="primary"
									shape="rounded"
									showFirstButton
									showLastButton
									count={Math.ceil(pokemonList.count / PAGE_LIMIT)} // Calculate the number of pages based on the total number of Pokémon
									page={offset / PAGE_LIMIT + 1} // Calculate the current page number based on the offset
									onChange={handlePageChange} // Event handler for pagination
								/>
							</Grid>
						</Grid>
					</React.Fragment>
				) : null}

				{/* The loading status indicator component. */}
				<Loading />
			</Container>
		</React.Fragment>
	);
};
