// import axios from "axios";
// import { Laptop } from "../LaptopCard/LaptopCard";
// import LaptopCard from "../LaptopCard/LaptopCard";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { Flex, Select, Group } from "@mantine/core";
// import { useEffect, useState } from "react";

// export interface LaptopGridProps {
//   baseUrl: string;
//   startIndex: number;
//   increment: number;
// }

// interface SortFunctions {
//   "price ascending": <
//     T extends { original_price: number; discounted_price: number }
//   >(
//     a: T,
//     b: T
//   ) => number;
//   "price descending": <
//     T extends { original_price: number; discounted_price: number }
//   >(
//     a: T,
//     b: T
//   ) => number;
//   "rel discount ascending": <T extends { relative_savings: number }>(
//     a: T,
//     b: T
//   ) => number;
//   "rel discount descending": <T extends { relative_savings: number }>(
//     a: T,
//     b: T
//   ) => number;
//   "abs discount ascending": <T extends { absolute_savings: number }>(
//     a: T,
//     b: T
//   ) => number;
//   "abs discount descending": <T extends { absolute_savings: number }>(
//     a: T,
//     b: T
//   ) => number;
// }

// const sortings: SortFunctions = {
//   "price ascending": (a, b) =>
//     (a.discounted_price ?? a.original_price) -
//     (b.discounted_price ?? b.original_price),
//   "price descending": (a, b) =>
//     (b.discounted_price ?? b.original_price) -
//     (a.discounted_price ?? a.original_price),
//   "rel discount ascending": (a, b) => a.relative_savings - b.relative_savings,
//   "rel discount descending": (a, b) => b.relative_savings - a.relative_savings,
//   "abs discount ascending": (a, b) => a.absolute_savings - b.absolute_savings,
//   "abs discount descending": (a, b) => b.absolute_savings - a.absolute_savings,
// };

// export default function LaptopGrid(props: LaptopGridProps) {
//   const [selectedShop, setSelectedShop] = useState<string | null>("");
//   const [selectedBrand, setSelectedBrand] = useState<string | null>("");
//   const [selectedSort, setSelectedSort] = useState<string | null>(null);

//   const fetchLaptops = async ({ pageParam }: { pageParam?: number }) => {
//     return axios
//       .get(`${props.baseUrl}${pageParam ?? props.startIndex}`)
//       .then((res) => res.data);
//   };

//   const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
//     queryKey: ["laptops"],
//     queryFn: fetchLaptops,
//     getNextPageParam: (lastPage, allPages) => {
//       if (lastPage.length === 0) {
//         return undefined;
//       }
//       return allPages.length * props.increment;
//     },
//     initialPageParam: props.startIndex,
//   });

//   useEffect(() => {
//     window.addEventListener("scroll", () => {
//       if (isAtBottom() && hasNextPage) fetchNextPage();
//     });

//     return () =>
//       window.removeEventListener("scroll", () => {
//         if (isAtBottom() && hasNextPage && !isLoading && selectedShop === "")
//           fetchNextPage();
//       });
//   }, [hasNextPage, isLoading, selectedShop]);

//   function isAtBottom(): boolean {
//     const element = document.querySelector("html");

//     return (
//       Math.abs(
//         element!.scrollHeight - element!.clientHeight - element!.scrollTop
//       ) <= 1
//     );
//   }

//   return (
//     <>
//       <Flex direction="column" m="10px">
//         <Group m="10px">
//           <Select
//             value={selectedShop}
//             onChange={setSelectedShop}
//             placeholder="Select a shop"
//             data={Array.from(
//               new Set(data?.pages.flat().map((laptop: Laptop) => laptop.shop))
//             )}
//           ></Select>
//           <Select
//             placeholder="Select a brand"
//             value={selectedBrand}
//             onChange={setSelectedBrand}
//             data={Array.from(
//               new Set(data?.pages.flat().map((laptop: Laptop) => laptop.brand))
//             )}
//           ></Select>
//           <Select
//             placeholder="Sort by"
//             value={selectedSort}
//             data={Object.keys(sortings) as (keyof SortFunctions)[]}
//             onChange={setSelectedSort}
//           ></Select>
//         </Group>
//         <Flex
//           mih={50}
//           gap="sm"
//           m="10px"
//           justify="center"
//           align="center"
//           direction="row"
//           wrap="wrap"
//         >
//           {data?.pages
//             .flat()
//             .filter(
//               (laptop: Laptop) =>
//                 selectedShop === "" ||
//                 selectedShop == null ||
//                 laptop.shop === selectedShop
//             )
//             .filter(
//               (laptop: Laptop) =>
//                 selectedBrand === "" ||
//                 selectedBrand == null ||
//                 laptop.brand == selectedBrand
//             )
//             .sort(sortings[selectedSort as keyof SortFunctions])
//             .map((laptop: Laptop, idx: number) => (
//               <LaptopCard key={idx} {...laptop} />
//             ))}
//         </Flex>
//       </Flex>
//     </>
//   );
// }
