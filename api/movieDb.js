import axios from 'axios';
import { apiKey, bearerToken } from '../constants';
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMovieEndpoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

export const image500 = path=> path? `https://image.tmdb.org/t/p/w500${path}`:null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;
const apiCall = async (endpoint, params = {}) => {
  try {
    // Convert params to query string
    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = queryString ? `${endpoint}?${queryString}` : endpoint;
    console.log(urlWithParams)
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json', // Ensure JSON response
        Authorization: `Bearer ${bearerToken}`, // Add the bearer token
      },
    };

    // Make the fetch request
    const response = await fetch(urlWithParams, options);

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return {};
  }
};


export const fetchTrendingMovies = async ()=>{
    return apiCall(trendingMovieEndpoint);
}

export const fetchUpcomingMovies = async () => {
  return  apiCall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = async () => {
  return  apiCall(topRatedMoviesEndpoint);
};