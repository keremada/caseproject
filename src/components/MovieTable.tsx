import React from 'react';
import { Movie } from '../types/movie';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/movieList.module.scss'; 
import { API_KEY } from '../types/api';

interface MovieTableProps {
  movies: Movie[];
  season?: string; 
  type: string; 
  episode?: string;
}

const MovieTable: React.FC<MovieTableProps> = ({ movies, season, type, episode }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  const getPosterUrl = (imdbID: string, poster: string) => {
    return poster !== 'N/A' && poster !== null && poster !== undefined
      ? poster
      : `http://img.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;
  };

  const showImdbRating = type === 'series' && season && !episode;

  return (
    <table className={styles.movieTable}>
      <thead>
        <tr>
          {showImdbRating ? <th>IMDb Rating</th> : <th>Poster</th>}
          <th>Name</th>
          <th>Release Date</th>
          <th>IMDb ID</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.imdbID} onClick={() => handleRowClick(movie.imdbID)}>
            {showImdbRating ? (
              <td>{movie.imdbRating || 'N/A'}</td>
            ) : (
              <td className={styles.image}>
                <img
                  src={
                    movie.Poster !== 'N/A'
                      ? getPosterUrl(movie.imdbID, movie.Poster)
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'
                  }
                  alt={movie.Title}
                  className={styles.moviePoster}
                />
              </td>
            )}
            <td>{movie.Title}</td>
            <td>{movie.Year}</td>
            <td>{movie.imdbID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
