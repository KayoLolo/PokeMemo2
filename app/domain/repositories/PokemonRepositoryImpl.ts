import { PokemonApiDataSource } from "@/app/data/datasources/PokemonApiDataSources";
import { PokemonDetails } from "@/app/models/PokemonDetails";
import { PokemonRepository } from "./PokemonRepository";

export class PokemonRepositoryImpl implements PokemonRepository {
  constructor(private apiDataSource: PokemonApiDataSource) {}

  getCount(): Promise<number> {
    return this.apiDataSource.getCount();
  }

  async getPokemonDetails(id: number): Promise<PokemonDetails> {
    const dto = await this.apiDataSource.getPokemonDetails(id);

    return new PokemonDetails(dto);
  }
}
