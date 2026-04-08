import { pokemonRepository } from "@/app/core/config/pokemon";
import { PokemonDetails } from "@/app/models/PokemonDetails";
import { useEffect, useState } from "react";

export function usePokemonList(ids: number[]) {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const idsKey = ids.join(",");

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    let isMounted = true;
    const parsedIds = idsKey.split(",").map(Number);

    async function loadPokemons() {
      try {
        setLoading(true);
        setError(null);

        const results = await Promise.all(
          parsedIds.map((id) => pokemonRepository.getPokemonDetails(id)),
        );

        if (isMounted) {
          setPokemons(results);
        }
      } catch (e) {
        if (isMounted) {
          setError(
            e instanceof Error
              ? e.message
              : "Impossible de charger les Pokémon",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadPokemons();

    return () => {
      isMounted = false;
    };
  }, [ids.length, idsKey]);

  return { pokemons, loading, error };
}
