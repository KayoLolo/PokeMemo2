export class PokemonEvolutions {
    id: number;
    name: string;
    imageUrl: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = PokemonEvolutions.officialArtworkUrl(id);
    }

    static officialArtworkUrl(id: number): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    }
}