import React, { useRef, useState } from "react";
import { getImageURL } from "../services/api";
import { useMovies } from "../context/MoviesContext";

function MovieSlider({ title, movies, subtitle = "", id }) {
  const sliderRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const { openMovieDetails } = useMovies();

  const scroll = (direction) => {
    if (isScrolling) return;
    const { current } = sliderRef;
    const scrollAmount =
      direction === "left"
        ? -current.clientWidth * 0.75
        : current.clientWidth * 0.75;

    current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };

  const handleMovieClick = (movieId) => {
    openMovieDetails(movieId);
  };

  if (!movies || movies.length === 0) {
    return null;
  }
  return (
    <section className="py-12" id={id}>
      <div className="container mx-auto px-4">
        <div className="flex items-baseline justify-between mb-8">
          <div className="text-3xl font-bold text-white">
            {/* my-10 */}
            <h2>{title}</h2>
            {/* Conditional Rendering */}
            <p className="text-neutral-400 text-sm mt-1">{subtitle}</p>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => scroll("left")}
              className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700
                text-white transition-all"
              aria-label="Scroll Left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button onClick={() => scroll("right")}
              className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700
                text-white transition-all"
              aria-label="Scroll Right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Movie Slider */}
        <div className="relative">
          <div className="flex space-x-4 overflow-x-hidden scrollbar-hide pb-4 snap-x" ref={sliderRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {/* Conditional Rendering */}
            {movies.map((movie) => {
              return (
                <div key={movie.id}
                  className="min-w-[240px] snap-start relative group
                cursor-pointer"

                  onClick={() => handleMovieClick(movie.id)}
                >
                  <div className="rounded-lg overflow-hidden bg-neutral-800">
                    <div className="relative aspect-[2/3]">
                      <img
                        src={getImageURL(movie.poster_path, "w500")}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-all duration-300 
                  group-hover:scale-110 group-hover:opacity-35"
                      />

                      {/* Hover Overlay */}
                      <div
                        className={
                          `absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300`
                        }
                      >
                        <div
                          className="transform translate-y-4 group-hover:translate-y-0
                    transition-transform duration-300 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <svg
                                className="w-4 h-4 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-yellow-400 text-sm font-medium">
                                {formatRating(movie.vote_average)}
                              </span>
                            </div>
                            <span className="text-neutral-400 text-sm">
                              {movie.release_date?.substring(0, 4) || "N/A"}
                            </span>
                          </div>
                          <button
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white
                      py-3 rounded-md flex items-center justify-center gap-1 transition-all text-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="mt-3">
                    <h3 className="text-white text-sm font-medium truncate">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                        <span className="text-neutral-400">{formatRating(movie.vote_average)}</span>
                      </div>
                      <span className="text-neutral-500">{movie.release_date?.substring(0, 4) || "N/A"}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieSlider;