import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterYear: (year: string) => void;
  onFilterType: (type: string) => void;
  onResetPage: () => void; // New prop to reset the current page
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterYear,
  onFilterType,
  onResetPage,
}) => {
  const [query, setQuery] = useState('Pokemon');
  const [year, setYear] = useState('');
  const [type, setType] = useState('movie');

  const handleSearch = () => {
    onSearch(query);
    onFilterYear(year);
    onFilterType(type);
    onResetPage(); // Reset the page to 1 whenever a new search is triggered
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year (e.g., 2020)"
      />
      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          onFilterType(e.target.value);
          onResetPage(); // Reset the page whenever the type changes
        }}
      >
        <option value="movie">Movies</option>
        <option value="series">TV Series</option>
        <option value="episode">TV Episodes</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
