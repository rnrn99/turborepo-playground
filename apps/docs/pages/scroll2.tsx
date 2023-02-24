import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useMount from "../hook/useMount";
import { useObserver } from "../hook/useObserver";
import { getPokemonList } from "./scroll";

const scrollToList = (element: HTMLDivElement) => {
  element.scrollIntoView(true);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const offset = context.query.offset as string;
  return {
    props: { offset: Number(offset) },
  };
};

function Scroll2({ offset: initialOffset }: { offset: number }) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const pageEnd = useRef(null);
  const isMounted = useMount();
  const { data: results, isSuccess } = useQuery(["pokemon"], () =>
    getPokemonList(),
  );

  const [offset, setOffset] = useState(initialOffset);
  const [filteredList, setFilteredList] = useState<any[]>([]);

  const getItems = (offset: number) => {
    const temp = results.slice(offset + 2, offset + 4);
    setOffset((cur) => cur + 2);
    setFilteredList((cur) => [...cur, ...temp]);
  };

  useObserver({
    target: pageEnd,
    fetchNextPage: () => getItems(offset),
    deps: offset,
  });

  useEffect(() => {
    if (isSuccess) {
      const temp = results.slice(0, initialOffset + 2);
      setFilteredList(temp);
    }
  }, [isSuccess, initialOffset, results]);

  useEffect(() => {
    if (isMounted && elementRef.current) {
      scrollToList(elementRef?.current);
    }
  }, [isMounted, elementRef.current]);

  return (
    <div style={{ display: "grid" }}>
      {filteredList?.map(({ name }: { name: any }, index) => (
        <div
          key={name}
          style={{
            width: "300px",
            height: "300px",
            border: "1px solid red",
          }}
          ref={index === initialOffset ? elementRef : null}
        >
          {name}
        </div>
      ))}
      <div ref={pageEnd} />
    </div>
  );
}

export default Scroll2;
