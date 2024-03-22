import React from 'react';
import { RouteObject } from 'react-router-dom';
import { PAGE } from '../utils/constant';
import { RootLayout } from './RootLayout';
import { PokemonListPage, PokemonPageByIdPage } from '../page';

export const routes: RouteObject[] = [
	{
		path: PAGE.HOME_PAGE,
		element: <RootLayout />,
		children: [
			{
				path: PAGE.HOME_PAGE,
				element: <PokemonListPage />,
			},
			{
				path: PAGE.POKEMON_PAGE_BY_ID,
				element: <PokemonPageByIdPage />,
			},
		],
	},
];
