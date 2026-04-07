import { PokemonDto } from "../dtos/PokemonDto";

export interface EvolutionEntry {
  id: number;
  name: string;
}

export interface PokemonApiDataSource {
  getCount(): Promise<number>;
  getPokemonDetails(id: number): Promise<PokemonDto>;
  getEvolutions(id: number): Promise<EvolutionEntry[]>;
}
