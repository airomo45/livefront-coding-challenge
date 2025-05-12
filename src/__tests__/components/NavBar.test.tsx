import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../../components/NavBar";

jest.mock("../../components/PokemonSearch", () => () => (
  <div data-testid="pokemon-search" />
));

describe("NavBar", () => {
  test("should render nav logo", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const link = screen.getByText("Pokedex");
    expect(link).toBeInTheDocument();
  });

  test("should link nav logo to home", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Pokedex" });
    expect(link).toHaveAttribute("href", "/");
  });
  test("should render Pokemon Search Bar", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByTestId("pokemon-search")).toBeInTheDocument();
  });
});
