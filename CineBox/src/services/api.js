const API_KEY = "c35323a6faf095bb12979fa6cf00e085";
const BASE_URL = "https://api.themoviedb.org/3";
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.json();
    return data.results; 

  } catch (error) {
    console.error("Error fetching trending movies",error);
    return [];
  }
}; 

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    const data = await response.json();
    return data.results; 

  } catch (error) {
    console.error("Error fetching popular movies",error);
    return [];
  }
}; 

export const fetchTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );

    const data = await response.json();
    return data.results; 

  } catch (error) {
    console.error("Error fetching top rated movies",error);
    return [];
  }
}; 

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=1`
    );

    const data = await response.json();
    return data.results; 

  } catch (error) {
    console.error("Error fetching movies by genre",error);
    return [];
  }
}; 

export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.json();
    return data.genres; 

  } catch (error) {
    console.error("Error fetching genres",error);
    return [];
  }
}; 

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.json();
    return data; 

  } catch (error) {
    console.error("Error fetching movie details",error);
    return null;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.json();
    return data.cast || []; 

  } catch (error) {
    console.error("Error fetching movie credits",error);
    return [];
  }
}; 

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );

    const data = await response.json();
    return data.results; 

  } catch (error) {
    console.error("Error searching movies",error);
    return [];
  }
}; 

export const getImageURL = (path, size = "original") => {
    if(!path)
        return "https://via.placeholder.com/400x600?text=No+Image+Available";
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

// Watchlist API Functions
export const getWatchlist = async () => {
    const res = await axios.get(`${BACKEND_URL}/watchlist`, getAuthHeaders());
    return res.data;
};

export const addToWatchlist = async (movie) => {
    const res = await axios.post(`${BACKEND_URL}/watchlist/add`, {
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
    }, getAuthHeaders());
    return res.data;
};

export const removeFromWatchlist = async (movieId) => {
    const res = await axios.delete(`${BACKEND_URL}/watchlist/remove/${movieId}`, getAuthHeaders());
    return res.data;
};

export const checkWatchlistStatus = async (movieId) => {
    const res = await axios.get(`${BACKEND_URL}/watchlist/check/${movieId}`, getAuthHeaders());
    return res.data;
};