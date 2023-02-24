import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { atom, useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";

export const getPokemonList = async () => {
  const { data } = await axios.get<any>("https://pokeapi.co/api/v2/pokemon", {
    params: {
      limit: 10,
      offset: 10,
    },
  });
  return data.results;
};

export const pokemonAtom = atom([]);

export default function Test() {
  const { data: results } = useQuery(["pokemon"], () => getPokemonList());
  const [pokemon, setPokemon] = useAtom(pokemonAtom);
  const router = useRouter();

  useEffect(() => {
    setPokemon(results);
  }, [results]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
      {pokemon?.map(({ name }: { name: any }, index) => (
        <div
          key={name}
          style={{
            width: "100px",
            height: "100px",
            border: "1px solid red",
          }}
          onClick={() => router.push(`/scroll2?offset=${index}`)}
        >
          {name}
        </div>
      ))}
    </div>
  );
}
