export class Pokemon {
  constructor(data) {
    this.name = data.species.name;
    this.types = data.types.map((t) => t.type.name);
    this.image = data.sprites.front_default;
    this.abilities = data.abilities.map((t) => t.ability.name);
  }
}
