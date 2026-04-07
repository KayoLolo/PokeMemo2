import { PokemonDetails } from "@/app/models/PokemonDetails";
import { EvolutionEntry } from "@/app/data/datasources/PokemonApiDataSources";

export interface PokemonRepository {
  getCount(): Promise<number>;
  getPokemonDetails(id: number): Promise<PokemonDetails>;
  getEvolutions(id: number): Promise<EvolutionEntry[]>;
}
