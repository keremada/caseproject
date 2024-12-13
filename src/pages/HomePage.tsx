import React, { useEffect, useState } from 'react';
import MovieTable from '../components/MovieTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { Movie } from '../types/movie';

const API_URL = 'http://www.omdbapi.com/';
const API_KEY = '70a8843';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('Pokemon');
  const [year, setYear] = useState<string>('');
  const [type, setType] = useState<string>('movie');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
            searchQuery
          )}&type=${type}&y=${year}&page=${currentPage}`
        );
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search || []);
          setTotalResults(Number(data.totalResults) || 0);
        } else {
          console.error('API returned an error:', data.Error);
          setMovies([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [searchQuery, type, year, currentPage]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div>
      <h1>Movie List</h1>
      <SearchBar
        onSearch={setSearchQuery}
        onFilterType={setType}
        onFilterYear={setYear}
        onResetPage={() => setCurrentPage(1)} // Reset page to 1
      />
      <MovieTable movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default HomePage;
