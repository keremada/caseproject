import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/detailsPage.module.scss';
import { API_KEY,API_URL } from '../types/api';
import { MovieDetails } from '../types/movie';

const DetailsPage: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovie(data);
        } else {
          console.error('Invalid response:', data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>No movie details available.</p>;
  }

  console.log(movie);

  return (
    <div className={styles['details-page']}>
      <h1>{movie.Title}</h1>
      {movie.Poster !== 'N/A' && <img src={movie.Poster} alt={movie.Title} className={styles.poster} />}
      <div className={styles.details}>
        {movie.Year !== 'N/A' && <p><strong>Year:</strong> {movie.Year}</p>}
        {movie.Released !== 'N/A' && <p><strong>Released:</strong> {movie.Released}</p>}
        {movie.Runtime !== 'N/A' && <p><strong>Runtime:</strong> {movie.Runtime}</p>}
        {movie.Genre !== 'N/A' && <p><strong>Genre:</strong> {movie.Genre}</p>}
        {movie.Director !== 'N/A' && <p><strong>Director:</strong> {movie.Director}</p>}
        {movie.Actors !== 'N/A' && <p><strong>Actors:</strong> {movie.Actors}</p>}
        {movie.Plot !== 'N/A' && <p><strong>Plot:</strong> {movie.Plot}</p>}
        {movie.Language !== 'N/A' && <p><strong>Language:</strong> {movie.Language}</p>}
        {movie.Country !== 'N/A' && <p><strong>Country:</strong> {movie.Country}</p>}
        {movie.Awards !== 'N/A' && <p><strong>Awards:</strong> {movie.Awards}</p>}
        {movie.imdbRating !== 'N/A' && <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>}
        {movie.BoxOffice && movie.BoxOffice !== 'N/A' && <p><strong>Box Office:</strong> {movie.BoxOffice}</p>}
        {movie.totalSeasons && movie.totalSeasons !== 'N/A' && <p><strong>Total Seasons:</strong> {movie.totalSeasons}</p>}
      </div>
    </div>
  );
};

export default DetailsPage;
