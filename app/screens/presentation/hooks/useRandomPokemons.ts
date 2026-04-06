import { useEffect, useState } from "react";
import { getRandomPokemonIds } from "../getRandomPokemonIds";
import { usePokemonList } from "./usePokemonList";

export function useRandomPokemons() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    getRandomPokemonIds().then(setIds);
  }, []);

  console.log("ids: ", ids);

  return usePokemonList(ids);
}
