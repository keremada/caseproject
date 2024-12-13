import React, { useEffect, useState } from 'react';
import MovieTable from '../components/MovieTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { Movie } from '../types/movie';
import { API_KEY, API_URL } from '../types/api';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allEpisodes, setAllEpisodes] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('Pokemon');
  const [year, setYear] = useState<string>('');
  const [type, setType] = useState<string>('movie');
  const [season, setSeason] = useState<string>(''); 
  const [episode, setEpisode] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let apiUrl = '';

        if (type === 'series' && season && episode) {
          apiUrl = `${API_URL}?apikey=${API_KEY}&t=${encodeURIComponent(searchQuery)}&Season=${season}&Episode=${episode}`;
        } else if (type === 'series' && season) {
          apiUrl = `${API_URL}?apikey=${API_KEY}&t=${encodeURIComponent(searchQuery)}&Season=${season}`;
        } else {
          apiUrl = `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}&type=${type}&y=${year}&page=${currentPage}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === 'True') {
          if (type === 'series' && season && episode) {
            setMovies([
              {
                Title: data.Title,
                Year: data.Released.split('-')[0],
                imdbID: data.imdbID,
                Poster: data.Poster,
                Type: data.Type,
              },
            ]);
            setTotalResults(1);
          } else if (type === 'series' && season) {
            const episodes = data.Episodes || [];
            const filteredEpisodes = episodes
              .map((ep: any) => ({
                Title: ep.Title,
                Year: ep.Released ? ep.Released.split('-')[0] : 'Unknown',
                imdbID: ep.imdbID,
                Poster: ep.Poster || 'N/A',
                Type: 'episode',
                imdbRating: ep.imdbRating 
              }))
              .filter((ep: any) => (year ? ep.Year === year : true));

            setAllEpisodes(filteredEpisodes);
            setTotalResults(filteredEpisodes.length);
            if (filteredEpisodes.length === 0) setMovies([]);
          } else {
            setMovies(data.Search || []);
            setTotalResults(Number(data.totalResults) || 0);
          }
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
  }, [searchQuery, type, year, season, episode, currentPage]);

  useEffect(() => {
    if (type === 'series' && season && allEpisodes.length > 0) {
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      setMovies(allEpisodes.slice(startIndex, endIndex));
    }
  }, [currentPage, allEpisodes, type, season]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div>
      <h1>Movie List</h1>
      <SearchBar
        onSearch={setSearchQuery}
        onFilterType={setType}
        onFilterYear={setYear}
        onFilterSeason={setSeason}
        onFilterEpisode={setEpisode}
        onResetPage={() => setCurrentPage(1)} 
      />
      <MovieTable movies={movies} season={season} type={type} episode={episode}/>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default HomePage;
