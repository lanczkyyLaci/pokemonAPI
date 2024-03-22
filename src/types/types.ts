// types.ts - This file contains type definitions related to Pokemon

// Type for the API response containing the list of Pokemon
export interface PokemonListResponse {
	count: number; // Number of Pokémon in the API response
	next: string | null; // URL of the next page or null if there's no next page
	previous: string | null; // URL of the previous page or null if there's no previous page
	results: Pokemon[]; // Array of Pokémon
}

export interface PokemonDataResponse {
	id: number;
	name: string;
	height: number;
	weight: number;
	sprites: PokemonSprite; // Using the PokemonSprite interface here
	stats: Statistic[];
}

export interface PokemonListWithDetails {
	count: number; // Number of Pokémon in the API response
	next: string | null; // URL of the next page or null if there's no next page
	previous: string | null; // URL of the previous page or null if there's no previous page
	results: PokemonListWithImagesResponse[]; // Array of Pokémon
}

export interface PokemonListWithImagesResponse {
	name: string;
	image: string;
}

export interface PokemonColorResponse {
	color: {
		name: string;
	};
}

// Type for Pokémon containing its name and URL
export interface Pokemon {
	name: string; // Name of the Pokémon
	url: string; // URL of the Pokémon
}

// Interface defining the sprites structure
export interface PokemonSprite {
	front_default: string;
	front_shiny: string;
	other: {
		'official-artwork': {
			front_default: string;
		};
	};
}

// Type for PokemonCard containing the data of a Pokémon card
export interface PokemonCard {
	name: string; // Name of the Pokémon
	image: string; // URL of the Pokémon
}

// Interface defining the pagination parameters
export interface PaginationParams {
	limit: number; // The maximum number of items to fetch per page
	offset: number; // The starting index from which to fetch items
}

export interface FetchBeerByNameParam {
	name: string;
}

export interface PokemonDataProps {
	name: string;
	height: number;
	img: string;
	weight: number;
	stats: Statistic[];
	color: string;
}

interface Statistic {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
	};
}
