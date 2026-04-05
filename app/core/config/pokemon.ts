import { PokemonApiDataSourceImpl } from "@/app/data/datasources/PokemonApiDataSourcesImpl";
import { PokemonRepositoryImpl } from "@/app/data/repositories/PokemonRepositoryImpl";

const api = new PokemonApiDataSourceImpl();
export const pokemonRepository = new PokemonRepositoryImpl(api);