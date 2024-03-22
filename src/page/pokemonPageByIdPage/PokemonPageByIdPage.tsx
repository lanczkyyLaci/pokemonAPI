// External imports (libraries)
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// -- Material-UI components --
import { Container, Grid } from '@mui/material';

// Internal imports (project files)
import { RootState } from '../../app/store';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchPokemonByIdAsync } from '../../reducers/feautres/pokemonByIdSlice';
import { fetchPokemonColorAsync } from '../../reducers/feautres/pokemonColor';
import { FetchBeerByNameParam } from '../../types/types';
import { PokemonById } from '../../components/pokemonById/PokemonById';
import { Loading } from '../../components/loading/Loading';

// Style import
import './pokemonPageById.scss';

// PokemonPageById component
export const PokemonPageByIdPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const params: any = useParams(); // Using the useParams hook to capture URL parameters
	const name: FetchBeerByNameParam = params.id; // Assuming 'id' is the parameter name
	const { pokemonData } = useSelector((state: RootState) => state.pokemonData); // Extracts Pokemon data from the Redux store using useSelector.
	const { showLoading } = useSelector((state: RootState) => state.loading); // Extracts loading state from the Redux store using useSelector.
	const { pokemonColor } = useSelector((state: RootState) => state.pokemonColor); // Extracts pokemonColor state from the Redux store using useSelector.

	// Effect to fetch Pokemon data when the component mounts or 'name' changes
	useEffect(() => {
		// Dispatching an action to fetch the Pokemon data asynchronously
		dispatch(fetchPokemonByIdAsync(name));
		dispatch(fetchPokemonColorAsync(name));
	}, [dispatch, name]);

	return (
		<Container>
			<Grid container>
				<Grid item xs={12}>
					{showLoading ? (
						<Loading />
					) : (
						<PokemonById
							name={pokemonData.name}
							img={pokemonData.sprites.other['official-artwork'].front_default}
							height={pokemonData.height}
							weight={pokemonData.weight}
							stats={pokemonData.stats}
							color={pokemonColor.color.name}
						/>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};
