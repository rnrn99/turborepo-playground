import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getPokemonList = async () => {
  const { data } = await axios.get<any>("https://pokeapi.co/api/v2/pokemon", {
    params: {
      limit: 10,
      offset: 10,
    },
  });
  return data.results;
};

export function usePokemonQuery() {
  return useQuery(["pokemon"], () => getPokemonList());
}
