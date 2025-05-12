import { useEffect, useState } from "react";
import { getPokemons } from "../api/api";
import { PokemonList, PokemonListItem } from "../types";
import PokemonListItemCard from "../components/PokemonListItemCard";
import PaginationControls from "../components/PaginationControls";
import "../styles/ListPage.css";

const ListPage = () => {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;
  const offset = (page - 1) * limit;

  useEffect(() => {
    const fetchPokemon = async () => {
      const data: PokemonList = await getPokemons(limit, offset);
      setPokemon(data.results);
      setTotalPages(Math.ceil(data.count / limit));
    };
    fetchPokemon();
  }, [page]);

  return (
    <div className="list-page-container">
      <h2 className="list-title">Pokemon List</h2>
      <ul>
        {pokemon.map((item) => (
          <PokemonListItemCard key={item.name} name={item.name} />
        ))}
      </ul>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
export default ListPage;
