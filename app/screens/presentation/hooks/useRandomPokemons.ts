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

        const results = await getRandomPokemonIds();

        if (isMounted) {
          setIds(results);
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
