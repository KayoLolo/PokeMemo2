import { PokemonDto } from "../dtos/PokemonDto";

export interface PokemonApiDataSource {
  getCount(): Promise<number>;
  getPokemonDetails(id: number): Promise<PokemonDto>;
}
