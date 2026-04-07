import { POKEMON_RANDOM_COUNT } from "@/app/core/config/apiConfig";
import { pokemonRepository } from "@/app/core/config/pokemon";

export async function getRandomPokemonIds(): Promise<number[]> {
  let count: number = (await pokemonRepository.getCount()) ?? 0;
  let randomIds: number[] = [];

  while (randomIds.length < POKEMON_RANDOM_COUNT) {
    let randomId: number = Math.floor(Math.random() * count + 1);

    if (randomId > 1025) {
      randomId += 8975;
    }

    if (!randomIds.includes(randomId)) {
      randomIds.push(randomId);
    }
  }
  return randomIds;
}
