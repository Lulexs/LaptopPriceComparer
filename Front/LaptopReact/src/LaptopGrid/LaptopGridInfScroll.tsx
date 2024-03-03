import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import LaptopsDisplay from "./LaptopsDisplay.tsx";
import { useEffect } from "react";

export interface LaptopGridProps {
  baseUrl: string;
  startIndex: number;
  increment: number;
}

export default function LaptopGridInfScroll(props: LaptopGridProps) {
  const fetchLaptops = async ({ pageParam }: { pageParam?: number }) => {
    return axios
      .get(
        `${props.baseUrl}${pageParam ?? props.startIndex}/${props.increment}`
      )
      .then((res) => res.data);
  };

  const { data, hasNextPage, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["laptops"],
    queryFn: fetchLaptops,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return allPages.length * props.increment;
    },
    initialPageParam: props.startIndex,
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (isAtBottom() && hasNextPage) fetchNextPage();
    });

    return () =>
      window.removeEventListener("scroll", () => {
        if (isAtBottom() && hasNextPage && !isLoading) fetchNextPage();
      });
  }, [hasNextPage, isLoading]);

  function isAtBottom(): boolean {
    const element = document.querySelector("html");

    return (
      Math.abs(
        element!.scrollHeight - element!.clientHeight - element!.scrollTop
      ) <= 1
    );
  }

  return (
    <>
      <LaptopsDisplay data={data} />
    </>
  );
}
