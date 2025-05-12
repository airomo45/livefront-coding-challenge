import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ListPage from "../../pages/ListPage";
import { getPokemons } from "../../api/api";

jest.mock(
  "../../components/PokemonListItemCard",
  () =>
    ({ name }: { name: string }) =>
      <li data-testid="pokemon-list-item">{name}</li>
);

jest.mock("../../components/PaginationControls", () => () => (
  <div data-testid="pagination-controls" />
));

jest.mock("../../api/api", () => ({
  getPokemons: jest.fn(),
}));

const pokemonMocks = {
  count: 2,
  next: null,
  previous: null,
  results: [
    { name: "bulbasaur", url: "testURL" },
    { name: "charmander", url: "testURL" },
  ],
};

describe("ListPage", () => {
  beforeEach(() => {
    (getPokemons as jest.Mock).mockResolvedValue(pokemonMocks);
  });

  test("should renders list title and pokemon list items", async () => {
    render(<ListPage />);

    expect(screen.getByText("Pokemon List")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId("pokemon-list-item")).toHaveLength(2);
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("charmander")).toBeInTheDocument();
    });
  });

  test("should render pagination controls", async () => {
    render(<ListPage />);

    await waitFor(() => {
      expect(screen.getByTestId("pagination-controls")).toBeInTheDocument();
    });
  });
});
