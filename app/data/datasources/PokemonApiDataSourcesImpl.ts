import { API_CONFIG } from "@/app/core/config/apiConfig";
import { PokemonDto } from "../dtos/PokemonDto";
import { PokemonApiDataSource } from "./PokemonApiDataSources";

export class PokemonApiDataSourceImpl implements PokemonApiDataSource {
  async getPokemonDetails(id: number): Promise<PokemonDto> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: PokemonDto = await response.json();

    return data;
  }

  async getCount(): Promise<number> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/pokemon`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.count;
  }
}
