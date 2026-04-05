import { PokemonDetails } from "@/app/models/PokemonDetails";

export interface PokemonRepository {
  getCount(): Promise<number>;
  getPokemonDetails(id: number): Promise<PokemonDetails>;
}
