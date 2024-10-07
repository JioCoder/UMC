import React, { useState } from 'react';
import { MOVIES } from './mocks/movies';
import MovieCard from './MovieCard';

const MoviesList = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '20px 0'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  return (
    <div style={listStyle}>
      {MOVIES.results && MOVIES.results.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} imageIndex={index + 1} onSelect={handleSelectMovie} />
      ))}
      {selectedMovie && (
        <div style={overlayStyle}>
          <p>{selectedMovie.title}</p>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
