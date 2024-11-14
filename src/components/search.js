// SearchBar.js
import React from 'react';

const SearchBar = ({ searchInput, onSearchChange }) => {
  return (
    <div className="form-group my-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by title..."
        value={searchInput}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;
