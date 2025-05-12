import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonDetailsCard from "../../components/PokemonDetailsCard";

jest.mock(
  "../../components/BadgeCard",
  () =>
    ({ label }: { label: string }) =>
      <span data-testid="badge">{label}</span>
);

const pokemonMocks = {
  id: 25,
  name: "pikachu",
  order: 35,
  height: 4,
  weight: 60,
  types: [{ slot: 1, type: { name: "electric", url: "testURL" } }],
  abilities: [
    { ability: { name: "static", url: "testURL" } },
    { ability: { name: "lightning-rod", url: "testURL" } },
  ],
  moves: [
    { move: { name: "quick-attack", url: "testURL" } },
    { move: { name: "thunderbolt", url: "testURL" } },
  ],
  sprites: { front_default: "url", back_default: "url" },
};

describe("PokemonDetailsCard", () => {
  test("should render name and id", () => {
    render(<PokemonDetailsCard pokemon={pokemonMocks} />);
    expect(screen.getByText("PIKACHU ID: #25")).toBeInTheDocument();
  });

  test("should render height and weight badges", () => {
    render(<PokemonDetailsCard pokemon={pokemonMocks} />);
    expect(screen.getByText("4 feet")).toBeInTheDocument();
    expect(screen.getByText("60 pounds")).toBeInTheDocument();
  });

  test("should render type badges", () => {
    render(<PokemonDetailsCard pokemon={pokemonMocks} />);
    expect(screen.getByText("electric")).toBeInTheDocument();
  });

  test("renders ability badges", () => {
    render(<PokemonDetailsCard pokemon={pokemonMocks} />);
    expect(screen.getByText("static")).toBeInTheDocument();
    expect(screen.getByText("lightning-rod")).toBeInTheDocument();
  });
});
