export class PokemonEvolutions {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.imageUrl = PokemonEvolutions.officialArtworkUrl(id);
    }

    static officialArtworkUrl(id) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    }
}