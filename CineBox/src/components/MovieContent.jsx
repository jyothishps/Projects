import React from 'react'
import MovieSlider from './MovieSlider'
import MovieDetails from './MovieDetails'
import { useMovies } from '../context/MoviesContext'

function MovieContent() {
  const { trendingMovies, popularMovies, topRatedMovies, selectedMovieId, closeMovieDetails } = useMovies();
  return (
    <>
      <div className='bg-gradient-to-b from-neutral-900 to-neutral-950 pt-20'>
        <MovieSlider title="Trending This Week" subtitle="Stay updated with that everyone's watchin"
          movies={trendingMovies} id="trending" />
        <MovieSlider title="Popular Movies" subtitle="Most watched movies right now"
          movies={popularMovies} id="popular" />
        <MovieSlider title="Top Rated Movies" subtitle="Highest rated movies of all time"
          movies={topRatedMovies} id="top-rated" />
      </div>

      {/* Conditional Rendering */}
      {selectedMovieId && <MovieDetails movieId={selectedMovieId} onClose={closeMovieDetails} />}
    </>
  )
}

export default MovieContent