import React from 'react';
import { Movie } from '../types/movie';
import { useNavigate } from 'react-router-dom';
import '../styles/movielist.scss';

interface MovieTableProps {
  movies: Movie[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/details/${id}`);
  };
console.log("movies", movies)
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Release Date</th>
          <th>IMDb ID</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.imdbID} onClick={() => handleRowClick(movie.imdbID)}>
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
