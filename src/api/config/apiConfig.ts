import axios from 'axios';

// Extract the base URL for the Pokemon API from environment variables
const { REACT_APP_POKEMON_BASE_URL } = process.env;

// Define headers for the GET request
const getHeaders = {
	'Content-Type': 'application/json',
};

// Create a custom Axios instance with default configurations
export const axiosInstance = axios.create({
	baseURL: REACT_APP_POKEMON_BASE_URL, // Set the base URL from the environment variable
	headers: getHeaders, // Set headers for the GET request
});
