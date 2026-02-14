import React, { useEffect, useRef, useState } from "react";
import { useMovies } from "../context/MoviesContext";
import { getImageURL, searchMovies } from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { openMovieDetails } = useMovies();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const [searchQry, setSearchQry] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQry.trim().length > 2) {
        setIsSearching(true);
        try {
          const result = await searchMovies(searchQry);
          setSearchResult(result ? result.slice(0, 5) : []);
        } catch (error) {
          console.error("Error searching movies:", error);
        } finally {
          setIsSearching(false);
          setShowSearchResult(true);
        }
      } else {
        setSearchResult([]);
        setShowSearchResult(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQry]);

  const handleSearchFocus = () => {
    if (searchQry.trim().length > 2 && searchResult.length > 0) {
      setShowSearchResult(true);
    }
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchResult(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleMovieSelect = (movieId) => {
    openMovieDetails(movieId);
    setShowSearchResult(false);
    setSearchQry("");
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-neutral-900/95 backdrop-blur-md shadow-lg"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center">
            <span className="text-purple-500 font-bold text-3xl">
              Cine<span className="text-white">Grid</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-8">
            <Link
              to="/home"
              className="text-white hover:text-purple-400 font-medium"
            >
              Home
            </Link>
            <a
              href="#trending"
              className="text-white hover:text-purple-400 font-medium cursor-pointer"
              onClick={(e) => { e.preventDefault(); document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Trending
            </a>
            <a
              href="#popular"
              className="text-white hover:text-purple-400 font-medium cursor-pointer"
              onClick={(e) => { e.preventDefault(); document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Popular
            </a>
            <a
              href="#top-rated"
              className="text-white hover:text-purple-400 font-medium cursor-pointer"
              onClick={(e) => { e.preventDefault(); document.getElementById('top-rated')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Top Rated
            </a>
            <Link
              to="/watchlist"
              className="text-white hover:text-purple-400 font-medium"
            >
              Watchlist
            </Link>

            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Hi, {user.username}</span>
                <button onClick={logout} className="text-white hover:text-red-400 font-medium">Logout</button>
              </div>
            )}
          </nav>

          {/* Search */}
          <div
            className="relative search-container"
            ref={searchContainerRef}
          >
            <input
              value={searchQry}
              onChange={(e) => setSearchQry(e.target.value)}
              onFocus={handleSearchFocus}
              type="text"
              placeholder="Search Movies....."
              className="bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm
              w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2
              focus:ring-purple-500/50"
            />

            {/* Conditional Rendering */}
            {isSearching ? (
              <div className="absolute right-3 top-2.5">
                <svg
                  className="w-4 h-4 text-neutral-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.692 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute right-3 top-3 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}

            {/* Search Result Box */}
            {showSearchResult && searchResult.length > 0 && (
              <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                <ul className="divide-y divide-neutral-700">
                  {searchResult.map((movie) => {
                    return (
                      <li key={movie.id} className="hover:bg-neutral-700">
                        <button
                          className="flex items-center p-3 w-full text-left"
                          onClick={() => handleMovieSelect(movie.id)}
                        >
                          <div className="w-10 h-10 bg-neutral-700 rounded overflow-hidden flex-shrink:0">
                            {movie.poster_path ? (
                              <img
                                src={getImageURL(movie.poster_path, "w92")}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-white truncate">
                              {movie.title}
                            </p>
                            <p className="text-xs text-neutral-400">
                              {movie.release_date
                                ? movie.release_date.split("-")[0]
                                : "N/A"}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* No Results Box */}
            {showSearchResult &&
              searchQry.trim().length > 2 &&
              (!searchResult || searchResult.length === 0) &&
              !isSearching && (
                <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="p-4 text-center text-neutral-400 text-sm">
                    No movies found matching...
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
