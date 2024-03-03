import { Laptop } from "../LaptopCard/LaptopCard";
import LaptopCard from "../LaptopCard/LaptopCard";
import { InfiniteData } from "@tanstack/react-query";
import { Flex, Select, Group } from "@mantine/core";
import { useState } from "react";

interface LaptopsDisplayProps {
  data: InfiniteData<any, unknown> | undefined;
}

interface SortFunctions {
  "price ascending": <
    T extends { original_price: number; discounted_price: number }
  >(
    a: T,
    b: T
  ) => number;
  "price descending": <
    T extends { original_price: number; discounted_price: number }
  >(
    a: T,
    b: T
  ) => number;
  "rel discount ascending": <T extends { relative_savings: number }>(
    a: T,
    b: T
  ) => number;
  "rel discount descending": <T extends { relative_savings: number }>(
    a: T,
    b: T
  ) => number;
  "abs discount ascending": <T extends { absolute_savings: number }>(
    a: T,
    b: T
  ) => number;
  "abs discount descending": <T extends { absolute_savings: number }>(
    a: T,
    b: T
  ) => number;
}

const sortings: SortFunctions = {
  "price ascending": (a, b) =>
    (a.discounted_price ?? a.original_price) -
    (b.discounted_price ?? b.original_price),
  "price descending": (a, b) =>
    (b.discounted_price ?? b.original_price) -
    (a.discounted_price ?? a.original_price),
  "rel discount ascending": (a, b) => a.relative_savings - b.relative_savings,
  "rel discount descending": (a, b) => b.relative_savings - a.relative_savings,
  "abs discount ascending": (a, b) => a.absolute_savings - b.absolute_savings,
  "abs discount descending": (a, b) => b.absolute_savings - a.absolute_savings,
};

export default function LaptopsDisplay(props: LaptopsDisplayProps) {
  const [selectedShop, setSelectedShop] = useState<string | null>("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>("");
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  return (
    <Flex direction="column" m="10px">
      <Group m="10px">
        <Select
          value={selectedShop}
          onChange={setSelectedShop}
          placeholder="Select a shop"
          data={Array.from(
            new Set(
              props.data?.pages.flat().map((laptop: Laptop) => laptop.shop)
            )
          )}
        ></Select>
        <Select
          placeholder="Select a brand"
          value={selectedBrand}
          onChange={setSelectedBrand}
          data={Array.from(
            new Set(
              props.data?.pages.flat().map((laptop: Laptop) => laptop.brand)
            )
          )}
        ></Select>
        <Select
          placeholder="Sort by"
          value={selectedSort}
          data={Object.keys(sortings) as (keyof SortFunctions)[]}
          onChange={setSelectedSort}
        ></Select>
      </Group>
      <Flex
        mih={50}
        gap="sm"
        m="10px"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {props.data?.pages
          .flat()
          .filter(
            (laptop: Laptop) =>
              selectedShop === "" ||
              selectedShop == null ||
              laptop.shop === selectedShop
          )
          .filter(
            (laptop: Laptop) =>
              selectedBrand === "" ||
              selectedBrand == null ||
              laptop.brand == selectedBrand
          )
          .sort(sortings[selectedSort as keyof SortFunctions])
          .map((laptop: Laptop, idx: number) => (
            <LaptopCard key={idx} {...laptop} />
          ))}
      </Flex>
    </Flex>
  );
}
