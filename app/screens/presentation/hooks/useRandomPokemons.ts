import { getDisplayedPokemonIds, notePokemonAsDisplayed } from "@/app/core/utils/displayPokemons";
import { useEffect, useState } from "react";
import { getRandomPokemonIds } from "../getRandomPokemonIds";
import { usePokemonList } from "./usePokemonList";

export function useRandomPokemons() {
  const [ids, setIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadIds() {
      try {
        setLoading(true);
        setError(null);
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
        if (isMounted) {
          setError(
            e instanceof Error ? e.message : "Impossible to fetch random ids",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadIds();

    return () => {
      isMounted = false;
    };
  }, []);

  return usePokemonList(ids);
}
