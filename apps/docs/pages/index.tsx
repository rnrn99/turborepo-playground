import { Button } from "ui";
import axios from "axios";
import { testFunc } from "utils";
import { useInfiniteQuery } from "@tanstack/react-query";

const getPokemonList = async (pageParams: number) => {
  const { data } = await axios.get<any>("https://pokeapi.co/api/v2/pokemon", {
    params: {
      limit: 5,
      offset: pageParams,
    },
  });
  return data;
};

export default function Docs() {
  const { data, fetchNextPage, hasNextPage, hasPreviousPage } =
    useInfiniteQuery({
      queryKey: ["pokemon"],
      queryFn: ({ pageParam = 5 }) => getPokemonList(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return Number(new URL(lastPage.next).searchParams.get("offset"));
      },
    });

  return (
    <div>
      <h1>Docs</h1>
      <button onClick={testFunc}>log</button>
      <Button />
      {data?.pages.map(({ results }, index) => (
        <div key={index}>
          {results.map(({ name }: { name: any }) => (
            <div
              key={name}
              style={{
                width: "300px",
                height: "300px",
                border: "1px solid red",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => fetchNextPage()}>로딩</button>
    </div>
  );
}
