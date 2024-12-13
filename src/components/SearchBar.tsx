import React, { useState, useEffect } from 'react';
import styles from '../styles/searchBar.module.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterYear: (year: string) => void;
  onFilterType: (type: string) => void;
  onFilterSeason: (season: string) => void;
  onFilterEpisode: (episode: string) => void;
  onResetPage: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterYear,
  onFilterType,
  onFilterSeason,
  onFilterEpisode,
  onResetPage,
}) => {
  const [query, setQuery] = useState('Pokemon');
  const [year, setYear] = useState('');
  const [type, setType] = useState('movie');
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');

  useEffect(() => {
    if (type !== 'series') {
      setSeason('');
      setEpisode('');
      onFilterSeason('');
      onFilterEpisode('');
    }
  }, [type, onFilterSeason, onFilterEpisode]);

  const handleSearch = () => {
    onSearch(query);
    onFilterType(type);
    onFilterSeason(season);
    onFilterEpisode(episode);
    onFilterYear(year);
    onResetPage();
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className={styles.input}
      />
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year (e.g., 2020)"
        className={styles.input}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className={styles.select}
      >
        <option value="movie">Movies</option>
        <option value="series">TV Series</option>
      </select>
      {type === 'series' && (
        <>
          <input
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            placeholder="Season (e.g., 1)"
            className={styles.input}
          />
          <input
            type="text"
            value={episode}
            onChange={(e) => setEpisode(e.target.value)}
            placeholder="Episode (e.g., 1)"
            className={styles.input}
          />
        </>
      )}
      <button onClick={handleSearch} className={styles.button}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
