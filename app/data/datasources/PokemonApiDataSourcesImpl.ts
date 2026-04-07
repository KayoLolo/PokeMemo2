import { API_CONFIG } from "@/app/core/config/apiConfig";
import { PokemonApiDataSource, EvolutionEntry } from "./PokemonApiDataSources";
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

  async getEvolutions(id: number): Promise<EvolutionEntry[]> {
    const speciesRes = await fetch(`${API_CONFIG.BASE_URL}/pokemon-species/${id}`);
    if (!speciesRes.ok) return [];

    const species = await speciesRes.json();
    const chainUrl: string = species.evolution_chain?.url;
    if (!chainUrl) return [];

    const chainRes = await fetch(chainUrl);
    if (!chainRes.ok) return [];

    const chainData = await chainRes.json();

    const entries: EvolutionEntry[] = [];

    function extractChain(node: {
      species: { name: string; url: string };
      evolves_to: unknown[];
    }) {
      const match = /\/(\d+)\/?$/.exec(node.species.url);
      const evoId = match ? Number(match[1]) : 0;
      entries.push({ id: evoId, name: node.species.name });
      for (const child of node.evolves_to) {
        extractChain(child as { species: { name: string; url: string }; evolves_to: unknown[] });
      }
    }

    extractChain(chainData.chain);
    return entries;
  }
}
