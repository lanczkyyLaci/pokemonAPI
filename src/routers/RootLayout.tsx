import React from 'react';
import { Outlet } from 'react-router-dom';
import { ButtonAppBar } from '../components/navigationBar/NavigationBar';

export const RootLayout: React.FC = () => {
	return (
		<React.Fragment>
			<ButtonAppBar />
			<Outlet />
		</React.Fragment>
	);
};
