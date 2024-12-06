import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <form>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
    </form>
  );
}

export default SearchBar;
