import { PokemonStatsDto } from "./PokemonStatsDto";
import { PokemonTypesDto } from "./PokemonTypesDto";

export interface PokemonDto {
  id: number;
  name: string;
  height: number;
  weight: number;

  sprites?: {
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
    };
  };

  types?: PokemonTypesDto[];

  stats?: PokemonStatsDto[];
}
