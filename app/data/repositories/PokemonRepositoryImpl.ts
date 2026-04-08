import { PokemonApiDataSource, EvolutionEntry } from "@/app/data/datasources/PokemonApiDataSources";
import { PokemonDetails } from "@/app/models/PokemonDetails";
import { PokemonRepository } from "@/app/domain/repositories/PokemonRepository";

export class PokemonRepositoryImpl implements PokemonRepository {
  constructor(private readonly apiDataSource: PokemonApiDataSource) {}

  getCount(): Promise<number> {
    return this.apiDataSource.getCount();
  }

  async getPokemonDetails(id: number): Promise<PokemonDetails> {
    const dto = await this.apiDataSource.getPokemonDetails(id);

    return new PokemonDetails(dto);
  }

  getEvolutions(id: number): Promise<EvolutionEntry[]> {
    return this.apiDataSource.getEvolutions(id);
  }
}
