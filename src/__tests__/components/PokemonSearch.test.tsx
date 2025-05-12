import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PokemonSearch from "../../components/PokemonSearch";
import { getPokemons } from "../../api/api";

jest.mock("../../api/api", () => ({
  getPokemons: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../components/SearchDropdown", () => {
  return {
    __esModule: true,
    default: function MockSearchDropdown({ results, onSelect }: any) {
      return (
        <ul data-testid="dropdown">
          {results.map((item: any) => (
            <li key={item.name} onClick={() => onSelect(item.name)}>
              {item.name}
            </li>
          ))}
        </ul>
      );
    },
  };
});

const mockData = {
  count: 5,
  results: [
    { name: "pikachu", url: "testURL" },
    { name: "bulbasaur", url: "testURL" },
    { name: "charmander", url: "testURL" },
    { name: "squirtle", url: "testURL" },
    { name: "pidgey", url: "testURL" },
  ],
};
describe("PokemonSearch", () => {
  beforeEach(() => {
    (getPokemons as jest.Mock).mockResolvedValue(mockData);
  });

  test("should render the search input", () => {
    render(<PokemonSearch />);
    const input = screen.getByPlaceholderText("Search for a Pokemon...");

    expect(input).toBeInTheDocument();
  });

  test("should filter Pokemon based on input", async () => {
    render(<PokemonSearch />);

    const input = screen.getByPlaceholderText("Search for a Pokemon...");

    await screen.findByPlaceholderText("Search for a Pokemon...");

    fireEvent.change(input, { target: { value: "pi" } });

    const dropdown = await screen.findByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(await screen.findByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("pidgey")).toBeInTheDocument();
    expect(screen.queryByText("charmander")).not.toBeInTheDocument();
  });
});
