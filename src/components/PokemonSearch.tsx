import React, { useEffect, useState } from "react";
import "../styles/PokemonSearch.css";
import { getPokemons } from "../api/api";
import { useNavigate } from "react-router-dom";
import { PokemonListItem, PokemonList } from "../types";
import SearchDropdown from "./SearchDropdown";

const PokemonSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonListItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      const data: PokemonList = await getPokemons(1000, 0);
      setPokemons(data.results);
    };
    fetchPokemon();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();

    setSearchTerm(searchValue);
    if (searchValue.length === 0) {
      setFilteredPokemon([]);
    } else {
      const matchingPokemon = pokemons.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
      setFilteredPokemon(matchingPokemon.slice(0, 5));
    }
  };

  const handlePokemonSelect = (name: string) => {
    setSearchTerm("");
    setFilteredPokemon([]);
    navigate(`/details/${name}`);
  };

  return (
    <div className="pokemon-search-wrapper">
      <input
        onChange={handleChange}
        type="text"
        placeholder="Search for a Pokemon..."
        value={searchTerm}
      />
      {filteredPokemon.length > 0 && (
        <SearchDropdown
          results={filteredPokemon}
          onSelect={handlePokemonSelect}
        />
      )}
    </div>
  );
};

export default PokemonSearch;
