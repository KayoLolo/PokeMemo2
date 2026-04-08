import { getDisplayedPokemonIds, notePokemonAsDisplayed } from "@/app/core/utils/displayPokemons";
import { useEffect, useState } from "react";
import { getRandomPokemonIds } from "../getRandomPokemonIds";
import { usePokemonList } from "./usePokemonList";

export function useRandomPokemons() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadIds() {
      try {
        const saved = await getDisplayedPokemonIds();

        if (saved.length > 0) {
          if (isMounted) {
            setIds(saved);
          }
        } else {
          const results = await getRandomPokemonIds();
          await notePokemonAsDisplayed(results);

          if (isMounted) {
            setIds(results);
          }
        }
      } catch (e) {
        console.error(
          e instanceof Error ? e.message : "Impossible de réaliser le chargement des Pokémon",
        );
      }
    }

    void loadIds();

    return () => {
      isMounted = false;
    };
  }, []);

  return usePokemonList(ids);
}
