import { useEffect, useState } from "react";
import { getRandomPokemonIds } from "../getRandomPokemonIds";

export function useRandomPokemonIds() {
  const [ids, setIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCount() {
      try {
        setLoading(true);
        setError(null);

        let result: number[] = await getRandomPokemonIds();

        if (isMounted) {
          setIds(result);
        }
      } catch (e) {
        if (isMounted) {
          setError("Impossible to fetch Pokemon's ids");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return { ids, loading, error };
}
