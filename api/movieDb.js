import axios from 'axios';
import { apiKey } from '../constants';
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMovieEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

const apiCall = async (endpoint,params)=>{
    const options= {
        method:'GET',
        url:endpoint,
        params: params? params:{}
    }
    try {
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log(error);
        return {};
    }
}

export const fetchTrendingMovies = async ()=>{
    return  apiCall(trendingMovieEndpoint);
}

export const fetchUpcomingMovies = async () => {
  return  apiCall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = async () => {
  return  apiCall(topRatedMoviesEndpoint);
};