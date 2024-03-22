// External imports (libraries)
import React from 'react';
import { useSelector } from 'react-redux';
// -- Material-UI components --
import { Backdrop, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// Import RootState type from the store file
import { RootState } from '../../app/store';

// Define Loading component as a functional component
export const Loading: React.FC = () => {
	// Retrieve the loading state from Redux store
	const { showLoading } = useSelector((state: RootState) => state.loading);

	// Log the loading state for debugging purposes
	console.log(showLoading);

	// Render the Loading component
	return (
		<React.Fragment>
			<Box className="footer">
				{/* Loading popup */}
				<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoading}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</Box>
		</React.Fragment>
	);
};
