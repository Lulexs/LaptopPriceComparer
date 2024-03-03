import axios from "axios";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import LaptopsDisplay from "./LaptopsDisplay.tsx";
import { Button, Group, Flex } from "@mantine/core";
import { useState, useRef } from "react";

export interface LaptopGridProps {
  baseUrl: string;
  startIndex: number;
  increment: number;
}

export default function LaptopGridPaginated(props: LaptopGridProps) {
  const [curPage, setCurPage] = useState(1);
  const totalPagesReachedRef = useRef(0);

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
      if (lastPage.length < props.increment) {
        totalPagesReachedRef.current = allPages.length;
        return undefined;
      }
      return allPages.length * props.increment;
    },
    initialPageParam: props.startIndex,
  });

  return (
    <Flex direction="column" align="center">
      <LaptopsDisplay
        data={
          data != null
            ? ({
                ...data,
                pages: data.pages.slice(curPage - 1, curPage),
              } as InfiniteData<any, unknown>)
            : undefined
        }
      />
      <Group>
        <Button
          onClick={() => {
            curPage > 1 && setCurPage((c) => c - 1);
          }}
        >
          {"<"}
        </Button>
        <Button>{curPage}</Button>
        <Button
          onClick={
            !hasNextPage
              ? () => {
                  curPage < totalPagesReachedRef.current &&
                    setCurPage((c) => c + 1);
                }
              : () => {
                  !isLoading && fetchNextPage();
                  setCurPage((c) => c + 1);
                }
          }
        >
          {">"}
        </Button>
      </Group>
    </Flex>
  );
}
