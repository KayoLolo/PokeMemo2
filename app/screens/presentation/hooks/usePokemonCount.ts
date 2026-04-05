import { useEffect, useState } from "react";
import { pokemonRepository } from "../../../core/config/pokemon";

export function usePokemonCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCount() {
      try {
        setLoading(true);
        setError(null);

        const result = await pokemonRepository.getCount();

        if (isMounted) {
          setCount(result);
        }
      } catch (e) {
        if (isMounted) {
          setError("Impossible to fetch Pokemon's count");
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

  return { count, loading, error };
}