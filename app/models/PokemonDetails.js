import PokemonEvolutions from "./PokemonEvolutions";

export class PokemonDetails {
  constructor(data) {
    const id = data?.id ?? 0;

    this.id = id;
    this.name = data?.name ?? "Unknown";
    this.imageUrl =
      data?.sprites?.other?.["official-artwork"]?.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    this.height = data?.height ?? 0;
    this.weight = data?.weight ?? 0;
    this.types = data?.types?.map((t) => t.type.name) ?? [];
    this.abilities = data?.abilities.map((a) => a.ability?.name) ?? [];

    this.stats = {};
    data?.stats?.forEach((s) => {
      if (s?.stat?.name && s?.base_stat != null) {
        this.stats[s.stat.name] = s.base_stat;
      }
    });

    this.evolutions = [];
  }

  async loadEvolutions() {
    this.evolutions = await PokemonEvolutions(this.id);
    return this;
  }
}
