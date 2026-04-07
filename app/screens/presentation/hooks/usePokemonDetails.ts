import { pokemonRepository } from "@/app/core/config/pokemon";
import { PokemonDetails } from "@/app/models/PokemonDetails";
import { useEffect, useState } from "react";

export function usePokemonDetails(id: number) {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isMounted = true;

    async function loadPokemon() {
      try {
        setLoading(true);
        setError(null);

        const result = await pokemonRepository.getPokemonDetails(id);

        if (isMounted) {
          setPokemon(result);
        }
      } catch (e) {
        console.error("HOOK error", e);

        if (isMounted) {
          setError(
            e instanceof Error ? e.message : "Impossible de charger le Pokémon",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { pokemon, loading, error };
}
