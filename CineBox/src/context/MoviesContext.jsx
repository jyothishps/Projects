import { createContext, useContext, useEffect, useState } from "react";
import { fetchGenres, fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies } from "../services/api";

const MoviesContext = createContext();
export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            setLoading(true);
            try {
                const results = await Promise.allSettled([
                    fetchTrendingMovies(),
                    fetchPopularMovies(),
                    fetchTopRatedMovies(),
                    fetchGenres(),
                ]);

                const [trendingResult, popularResult, topRatedResult, genresResult] = results;

                if (trendingResult.status === 'fulfilled') setTrendingMovies(trendingResult.value);
                else console.error("Failed to fetch trending movies:", trendingResult.reason);

                if (popularResult.status === 'fulfilled') setPopularMovies(popularResult.value);
                else console.error("Failed to fetch popular movies:", popularResult.reason);

                if (topRatedResult.status === 'fulfilled') setTopRatedMovies(topRatedResult.value);
                else console.error("Failed to fetch top rated movies:", topRatedResult.reason);

                if (genresResult.status === 'fulfilled') setGenres(genresResult.value);
                else console.error("Failed to fetch genres:", genresResult.reason);

            } catch (error) {
                console.error("Critical error in fetching movie data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieData();
    }, []);

    const openMovieDetails = (movieId) => {
        setSelectedMovieId(movieId);
        document.body.style.overflow = 'hidden';
    }

    const closeMovieDetails = () => {
        setSelectedMovieId(null);
        document.body.style.overflow = '';
    }

    return <MoviesContext.Provider value={{
        trendingMovies, popularMovies, topRatedMovies, genres,
        loading, error, selectedMovieId, openMovieDetails, closeMovieDetails
    }}>{children}</MoviesContext.Provider>
};