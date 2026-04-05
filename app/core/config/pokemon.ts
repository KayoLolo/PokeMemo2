import { PokemonApiDataSourceImpl } from "@/app/data/datasources/PokemonApiDataSourcesImpl";
import { PokemonRepositoryImpl } from "@/app/domain/repositories/PokemonRepositoryImpl";

const api = new PokemonApiDataSourceImpl();
export const pokemonRepository = new PokemonRepositoryImpl(api);