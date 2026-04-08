import { PokemonEvolutions } from "./PokemonEvolutions";

export class PokemonDetails {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  stats: Record<string, number>;
  evolutions: PokemonEvolutions[];

  constructor(data: any) {
    const id = data?.id ?? 0;

    this.id = id;
    this.name = data?.name ?? "Unknown";
    this.imageUrl =
      data?.sprites?.other?.["official-artwork"]?.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    this.height = data?.height ?? 0;
    this.weight = data?.weight ?? 0;
    this.types = data?.types?.map((t: any) => t.type.name) ?? [];
    this.abilities = data?.abilities.map((a: any) => a.ability?.name) ?? [];

    this.stats = {};
    data?.stats?.forEach((s: any) => {
      if (s?.stat?.name && s?.base_stat != null) {
        this.stats[s.stat.name] = s.base_stat;
      }
    });

    this.evolutions = [];
  }
}
