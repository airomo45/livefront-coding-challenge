import React from "react";
import "../styles/PokemonListItemCard.css";
import { Link } from "react-router-dom";

interface Props {
  name: string;
}

const PokemonListItemCard: React.FC<Props> = ({ name }) => {
  return (
    <Link to={`/details/${name}`}>
      <div className="card-container">
        <span className="card-name">{name.toUpperCase()}</span>
        <span className="card-link">See Details</span>
      </div>
    </Link>
  );
};

export default PokemonListItemCard;
