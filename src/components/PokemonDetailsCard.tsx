import React from "react";
import "../styles/PokemonDetailsCard.css";
import { PokemonDetail } from "../types";
import { Link } from "react-router-dom";
import BadgeCard from "./BadgeCard";

interface Props {
  pokemon: PokemonDetail;
}

const PokemonDetailsCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="pokemon-info-card-container">
      <h2 className="pokemon-name">
        {pokemon.name.toUpperCase()} ID: #{pokemon.id}
      </h2>

      <div className="info-section">
        <strong>Height:</strong>
        <div className="badge-container">
          <BadgeCard
            key={pokemon.height}
            label={`${pokemon.height.toString()} feet`}
            backgroundColor="#a7c8fc"
          />
        </div>
      </div>

      <div className="info-section">
        <strong>Weight:</strong>
        <div className="badge-container">
          <BadgeCard
            key={pokemon.weight}
            label={`${pokemon.weight.toString()} pounds`}
            backgroundColor="#c8bff5"
          />
        </div>
      </div>

      <div className="info-section">
        <strong>Type:</strong>
        <div className="badge-container">
          {pokemon.types.map((item) => (
            <BadgeCard key={item.type.name} label={item.type.name} />
          ))}
        </div>
      </div>

      <div className="info-section">
        <strong>Abilities:</strong>
        <div className="badge-container">
          {pokemon.abilities.map((item) => (
            <BadgeCard key={item.ability.name} label={item.ability.name} />
          ))}
        </div>
      </div>

      <div className="info-section">
        <strong>Moves (first 5):</strong>
        <div className="badge-container">
          {pokemon.moves.slice(0, 5).map((item) => (
            <BadgeCard key={item.move.name} label={item.move.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailsCard;
