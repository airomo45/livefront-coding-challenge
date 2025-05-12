import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PokemonListItemCard from "../../components/PokemonListItemCard";

describe("PokemonListItemCard", () => {
  test("renders Pokemon name in uppercase", () => {
    render(
      <MemoryRouter>
        <PokemonListItemCard name="pikachu" />
      </MemoryRouter>
    );

    const nameElement = screen.getByText("PIKACHU");
    expect(nameElement).toBeInTheDocument();
  });

  test('renders "See Details" text', () => {
    render(
      <MemoryRouter>
        <PokemonListItemCard name="bulbasaur" />
      </MemoryRouter>
    );

    expect(screen.getByText("See Details")).toBeInTheDocument();
  });

  test("links to correct detail route", () => {
    render(
      <MemoryRouter>
        <PokemonListItemCard name="charmander" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/details/charmander");
  });
});
