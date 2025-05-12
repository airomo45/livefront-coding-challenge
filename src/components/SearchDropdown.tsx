import React from "react";
import "../styles/SearchDropdown.css";

interface Props {
  results: { name: string }[];
  onSelect: (name: string) => void;
}

const SearchDropdown: React.FC<Props> = ({ results, onSelect }) => {
  if (results.length === 0) return null;
  return (
    <ul className="search-dropdown">
      {results.map((item) => (
        <li key={item.name} onClick={() => onSelect(item.name)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchDropdown;
