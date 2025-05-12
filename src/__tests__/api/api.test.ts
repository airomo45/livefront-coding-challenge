import axios from "axios";
import { getPokemons, getPokemonDetails } from "../../api/api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Pokemon API", () => {
  test("should return pokemon list data when calling getPokemons", async () => {
    const mockResponse = {
      data: {
        count: 2,
        results: [
          { name: "bulbasaur", url: "testURL" },
          { name: "charmander", url: "testURL" },
        ],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await getPokemons(20, 0);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );
    expect(result).toEqual(mockResponse.data);
  });

  test("should use default limit and offset when no arguments are passed", async () => {
    const mockResponse = {
      data: {
        count: 1,
        results: [{ name: "mew", url: "testURL" }],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await getPokemons();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );
    expect(result).toEqual(mockResponse.data);
  });

  test("should return pokemon details when calling getPokemonDetails", async () => {
    const mockPokemonDetails = {
      data: {
        name: "pikachu",
        weight: 60,
        height: 4,
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockPokemonDetails);

    const result = await getPokemonDetails("pikachu");
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/pikachu"
    );
    expect(result).toEqual(mockPokemonDetails.data);
  });
});
