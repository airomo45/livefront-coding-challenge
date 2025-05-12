import React from "react";
import "../styles/NavBar.css";
import PokemonSearch from "./PokemonSearch";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-logo">
        Pokedex
      </Link>
      <PokemonSearch />
    </nav>
  );
};

export default NavBar;
