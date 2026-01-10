import React, { useEffect, useState } from 'react';
import { getWatchlist, removeFromWatchlist, getImageURL } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Watchlist() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            loadWatchlist();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadWatchlist = async () => {
        try {
            setLoading(true);
            const data = await getWatchlist();
            setMovies(data);
        } catch (err) {
            setError("Failed to load watchlist");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (movieId) => {
        try {
            await removeFromWatchlist(movieId);
            setMovies(movies.filter(m => m.movie_id !== movieId));
        } catch (err) {
            console.error("Failed to remove movie", err);
        }
    };

    if (loading) return <div className="text-white text-center mt-20">Loading Watchlist...</div>;
    if (!user) return <div className="text-white text-center mt-20">Please login to view your watchlist.</div>;
    if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

    return (
        <div className="min-h-screen bg-neutral-900 pt-20 px-4 md:px-8">
            <h1 className="text-3xl font-bold text-white mb-8">My Watchlist</h1>

            {movies.length === 0 ? (
                <p className="text-neutral-400">Your watchlist is empty.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <div key={movie.movie_id} className="relative group bg-neutral-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                            <Link to={`/`} onClick={(e) => e.preventDefault()} > {/* Ideally link to details, but for now just showing card */}
                                <img
                                    src={getImageURL(movie.poster_path, 'w500')}
                                    alt={movie.title}
                                    className="w-full h-auto object-cover aspect-[2/3]"
                                />
                            </Link>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <h3 className="text-white font-bold truncate">{movie.title}</h3>
                                <button
                                    onClick={() => handleRemove(movie.movie_id)}
                                    className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm font-medium transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Watchlist;
