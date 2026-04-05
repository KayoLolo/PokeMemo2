import { API_CONFIG } from "@/app/core/config/apiConfig";
import { PokemonApiDataSource } from "./PokemonApiDataSources";
import { PokemonDto } from "../dtos/PokemonDto";

export class PokemonApiDataSourceImpl implements PokemonApiDataSource {
  async getPokemonDetails(id: number): Promise<PokemonDto> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: PokemonDto = await response.json();
    console.log("pokemon details name impl:", data.name);

    return data;
  }

  async getCount(): Promise<number> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/pokemon`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("data count impl:", data.count);
    return data.count;
  }
}
