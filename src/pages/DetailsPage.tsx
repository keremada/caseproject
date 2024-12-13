import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface MovieDetails {
  Title: string;
  Year: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Language: string;
  Country: string;
  Awards: string;
  BoxOffice: string;
}

const API_URL = 'http://www.omdbapi.com/';
const API_KEY = '70a8843';

const DetailsPage: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>(); // Extract imdbID from the URL
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovie(data); // Set movie data only if response is valid
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
  console.log(movie)
  return (
    <div style={{ padding: '20px' }}>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} style={{ width: '300px', marginBottom: '20px' }} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Released:</strong> {movie.Released}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Language:</strong> {movie.Language}</p>
      <p><strong>Country:</strong> {movie.Country}</p>
      <p><strong>Awards:</strong> {movie.Awards}</p>
      <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
      <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
    </div>
  );
};

export default DetailsPage;
