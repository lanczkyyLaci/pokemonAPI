import React from 'react';
import { render, screen } from '@testing-library/react';
import { PokemonListPage } from './page';

test('renders learn react link', () => {
	render(<PokemonListPage />);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
