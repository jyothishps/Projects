import React, { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieCredits, getImageURL, checkWatchlistStatus, addToWatchlist, removeFromWatchlist } from "../services/api";

function MovieDetails({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  useEffect(() => {
    async function getMoviesDetails() {
      if (!movieId) return;

      try {
        setIsLoading(true);
        setIsError(null);
        const [movieData, castData] = await Promise.all([
          fetchMovieDetails(movieId),
          fetchMovieCredits(movieId)
        ]);
        if (!movieData || !movieData.title) {
          throw new Error("Invalid movie data");
        }
        setMovie(movieData);
        setCast(castData.slice(0, 15)); // Get top 15 cast members

        try {
          const status = await checkWatchlistStatus(movieId);
          setInWatchlist(status.inWatchlist);
        } catch (e) {
          console.error("Failed to check watchlist status", e);
        }

      } catch (error) {
        console.error("Failed to load movie details", error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesDetails();
  }, [movieId]);

  const handleWatchlistToggle = async () => {
    if (watchlistLoading || !movie) return;
    setWatchlistLoading(true);
    try {
      if (inWatchlist) {
        await removeFromWatchlist(movie.id);
        setInWatchlist(false);
      } else {
        await addToWatchlist({ id: movie.id, title: movie.title, poster_path: movie.poster_path });
        setInWatchlist(true);
      }
    } catch (error) {
      console.error("Failed to toggle watchlist", error);
    } finally {
      setWatchlistLoading(false);
    }
  };

  if (!movieId) return null;

  const formatRunTime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatRevenue = (revenue) => {
    if (!revenue) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(revenue);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/95 backdrop-blur-sm overflow-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-neutral-800 rounded-lg shadow-xl max-h-[90vh] overflow-hidden overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-700/80 text-white hover:bg-neutral-600/80 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-neutral-400">Loading Details...</p>
            </div>
          </div>
        ) : error || !movie ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-red-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl font-bold text-white mb-2">
                Failed to Load Movie Details
              </h2>
              <p className="mt-2 text-neutral-400">
                {error?.message || "Unknown error occurred"}
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Backdrop Header */}
            <div className="relative h-72 md:h-96 w-full">
              <img
                src={getImageURL(movie.backdrop_path)}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 via-neutral-800/70 to-transparent"></div>
            </div>

            <div className="relative px-4 sm:px-6 md:px-12 pb-12">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 -mt-28 md:-mt-48">
                {/* Floating Poster */}
                <div className="flex-shrink-0 z-10 mx-auto md:mx-0">
                  <div className="w-48 md:w-72 rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 transform transition-transform duration-300 hover:scale-[1.02] aspect-[2/3] bg-neutral-800">
                    <img
                      src={getImageURL(movie.poster_path)}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 z-10 pt-2 md:pt-16 text-center md:text-left">
                  {/* Title Section */}
                  <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight leading-tight drop-shadow-lg">
                    {movie.title}
                  </h1>

                  {movie.tagline && (
                    <p className="text-base md:text-xl text-purple-400 font-medium italic mb-6 md:border-l-4 border-purple-500 pl-0 md:pl-4">
                      "{movie.tagline}"
                    </p>
                  )}

                  {/* Meta Tags Row */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-sm font-medium text-neutral-300 mb-8 bg-black/20 p-3 md:p-4 rounded-xl backdrop-blur-sm border border-white/5 inline-flex">
                    <div className="flex items-center text-yellow-400 bg-yellow-400/10 px-2 md:px-3 py-1 rounded-full border border-yellow-400/20">
                      <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                    <span className="text-white">{formatRunTime(movie.runtime)}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                    <span className="text-white">{movie.release_date?.substring(0, 4)}</span>
                    {movie.adult && (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                        <span className="text-red-400 border border-red-500/30 px-2 rounded-md bg-red-500/10">18+</span>
                      </>
                    )}
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                    {movie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 md:px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-purple-600 hover:scale-105 transition-all cursor-default border border-white/5 backdrop-blur-md shadow-lg"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <button className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-purple-900/40 hover:shadow-purple-700/60 transform hover:-translate-y-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                      Play Trailer
                    </button>
                    <button
                      onClick={handleWatchlistToggle}
                      disabled={watchlistLoading}
                      className={`flex-1 sm:flex-none px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all border border-white/10 backdrop-blur-md hover:border-white/20 ${inWatchlist ? "bg-red-600/80 hover:bg-red-500/80 text-white" : "bg-neutral-700/50 hover:bg-neutral-600/50 text-white"}`}
                    >
                      {watchlistLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : inWatchlist ? (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Added to Watchlist
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                          Add to Watchlist
                        </>
                      )}
                    </button>
                  </div>

                  {/* Synopsis */}
                  <div className="mb-10 text-left">
                    <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                      Overview
                    </h3>
                    <p className="text-neutral-300 text-sm md:text-lg leading-loose font-light">
                      {movie.overview || "No overview available for this title."}
                    </p>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 bg-neutral-900/40 rounded-2xl border border-white/5 backdrop-blur-sm text-left">
                    <div>
                      <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Status</p>
                      <p className="text-white font-medium">{movie.status || "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Budget</p>
                      <p className="text-white font-medium">{formatRevenue(movie.budget)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Revenue</p>
                      <p className="text-white font-medium">{formatRevenue(movie.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Vote Count</p>
                      <p className="text-white font-medium">{movie.vote_count}</p>
                    </div>
                  </div>

                  {/* Production */}
                  {movie.production_companies?.length > 0 && (
                    <div className="mt-8 text-left">
                      <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-3">Produced By</p>
                      <div className="flex flex-wrap gap-4 items-center">
                        {movie.production_companies.map(company => (
                          <span key={company.id} className="text-neutral-300 text-sm flex items-center gap-2 bg-neutral-800/50 px-3 py-1 rounded-md border border-white/5">
                            {company.logo_path && (
                              <img src={getImageURL(company.logo_path, "w200")} alt="" className="h-4 w-auto object-contain opacity-70 grayscale hover:grayscale-0 transition-all" />
                            )}
                            {company.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cast */}
                  {cast?.length > 0 && (
                    <div className="mt-8 text-left">
                      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                        Cast
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {cast.map((member) => (
                          <div
                            key={member.id}
                            className="bg-neutral-900/40 p-3 rounded-lg border border-white/5 hover:border-purple-500/30 transition-all"
                          >
                            <p className="text-white text-sm font-semibold">{member.name}</p>
                            <p className="text-neutral-400 text-xs mt-1">{member.character}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;