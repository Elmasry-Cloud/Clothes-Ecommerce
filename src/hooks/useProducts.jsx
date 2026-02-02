import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  async function getProducts() {
    return await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products
`
      )
      .then((res) => res)
      .catch((err) => err);
  }

  let productsData = useQuery({
    queryKey: ["All Products"],
    queryFn: getProducts,
    staleTime: 800,
    select: (data) => data?.data.data,
  });
  //     const { data, isError, error, isLoading } = useQuery({
  //     queryKey: ["All Products"],
  //     queryFn: getProducts,
  //     select: (data) => data?.data.data,
  //   });

  return productsData;
}
