import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FirstPageIcon from '@mui/icons-material/FirstPage';

export const ButtonAppBar: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isHomePage = location.pathname === '/';

	const handleGoBack = () => {
		navigate(-1);
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{!isHomePage && (
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							onClick={handleGoBack}
							sx={{ mr: 2 }}
						>
							<FirstPageIcon />
						</IconButton>
					)}

					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Pokemons
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
