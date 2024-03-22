// External imports (libraries)
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

// -- Material-UI components --
import { Card, CardHeader, Typography, Avatar, CardMedia } from '@mui/material';
import { CardActionArea } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

// Internal imports (project files)
import { getAvatarContent, capitalizeFirstLetter } from '../../utils/fromate'; // Importing helper functions
import { PokemonCard as PokemonCardInterface } from '../../types/types'; // Assuming this file contains the PokemonCard interface

// CSS import
import './pokemonCard.scss';

// Define props interface for PokemonCard component
interface PokemonCardProps extends PokemonCardInterface {}

// PokemonCard component
export const PokemonCard: React.FC<PokemonCardProps> = ({ image, name }) => {
	const formattedName = capitalizeFirstLetter(name); // Format the name to start with an uppercase letter using the helper function

	// Click event handler function to handle when a Pokemon card is clicked
	const handleCardClick = () => {
		// Do something with the clicked Pokemon's data, e.g., log it to the console
		console.log('Clicked Pokemon:', { image, name });
	};

	// Rendering the component
	return (
		<React.Fragment>
			<Link to={`/pokemon/${name}`} style={{ textDecoration: 'none' }}>
				<Card id="pokemonCard" onClick={handleCardClick} sx={{ width: 'auto' }}>
					<CardActionArea>
						<CardHeader
							avatar={<Avatar className="avatar">{getAvatarContent(name)}</Avatar>}
							action={<CatchingPokemonIcon color="warning" />}
							title={
								<Typography variant="subtitle1" color="primary" style={{ fontWeight: 500 }}>
									{formattedName}
								</Typography>
							}
							subheader={
								<Typography variant="caption" gutterBottom style={{ color: '#ed6c02', fontWeight: 400 }}>
									Pokemon
								</Typography>
							}
						/>
						<CardMedia component="img" height="195" image={image} alt="Paella dish" />
					</CardActionArea>
				</Card>
			</Link>
		</React.Fragment>
	);
};
