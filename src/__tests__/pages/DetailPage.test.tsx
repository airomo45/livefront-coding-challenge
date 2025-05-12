import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DetailPage from "../../pages/DetailPage";
import { getPokemonDetails } from "../../api/api";

jest.mock("../../api/api", () => ({
  getPokemonDetails: jest.fn(),
}));

let mockedPokemonId: string | undefined = "pikachu";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: mockedPokemonId }),
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

jest.mock("../../components/PokemonDetailsCard", () => ({
  __esModule: true,
  default: ({ pokemon }: any) => (
    <div data-testid="details-card">{pokemon.name}</div>
  ),
}));

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
  sprites: { front_default: "frontTestURL", back_default: "backTestURL" },
};

describe("DetailPage", () => {
  test("Should render loading initially", () => {
    (getPokemonDetails as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<DetailPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Should render error state", async () => {
    (getPokemonDetails as jest.Mock).mockRejectedValue(
      new Error("Fetch failed")
    );
    render(<DetailPage />);

    expect(
      await screen.findByText("Failed to load Pokemon details.")
    ).toBeInTheDocument();
  });

  test("Should render pokemon details when data is loaded and show front and back pictures", async () => {
    (getPokemonDetails as jest.Mock).mockResolvedValue(pokemonMocks);
    render(<DetailPage />);

    expect(await screen.findByTestId("details-card")).toHaveTextContent(
      "pikachu"
    );

    expect(
      screen.getByAltText("Front picture of the Pokemon pikachu")
    ).toHaveAttribute("src", "frontTestURL");

    expect(
      screen.getByAltText("Back picture of the Pokemon pikachu")
    ).toHaveAttribute("src", "backTestURL");

    expect(screen.getByText("Back to list")).toBeInTheDocument();
  });

  test("should do nothing if id params is missing", async () => {
    mockedPokemonId = undefined;

    render(<DetailPage />);

    await waitFor(() => {
      expect(screen.queryByTestId("details-card")).not.toBeInTheDocument();
    });

    mockedPokemonId = "pikachu";
  });
});
