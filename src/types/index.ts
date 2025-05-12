export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  name: string;
  order: number;
  weight: number;
  height: number;
  id: number;
  moves: PokemonMove[];
  abilities: PokemonAbility[];
  types: PokemonType[];
  sprites: PokemonSprites;
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
}
