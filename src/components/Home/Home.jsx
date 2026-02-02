import React, { useEffect, useState } from "react";
import "./Home.module.css";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import FeaturesProducts from "../FeaturesProducts/FeaturesProducts";

// import NotfoundImage from "../../assets/img (2).jpg";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
// import { Link } from "react-router-dom";
// import SearchInput from "../SearchInput/SearchInput";

export default function Home() {
  // const { counter, setCounter } = useState(0);
  // const [filterData, setFilterData] = useState(null);
  // const [getData, setGetData] = useState(null);

  // const queryClient = useQueryClient();

  //   const { data, isError, error, isLoading } = useQuery({
  //     queryKey: ["All Products"],
  //     queryFn: getProducts,
  //     staleTime: 800,
  //     select: (data) => data?.data.data,
  //   });

  //   async function getProducts() {
  //     return await axios
  //       .get(
  //         `https://ecommerce.routemisr.com/api/v1/products
  // `
  //       )
  //       .then((res) => res)
  //       .catch((err) => err);
  //   }

  //   if (isLoading) return <LoadingSpinner />;

  //   if (isError)
  //     return (
  //       <div className="text-red-500 text-2xl font-extrabold h-screen flex items-center justify-center">
  //         An error has occurred: Please Check Your Network
  //       </div>
  //     );

  // console.log(data);
  // console.log(isError);
  // console.log(isLoading);
  // console.log(error);

  useEffect(() => {}, []);
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <FeaturesProducts />
      {/* <div className="container mx-auto min-h-screen py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {data?.map((product) => (
            <div
              className="row hover:shadow-lg shadow-green-400 hover:border-2 border-green-400"
              key={product?._id}
            >
              <Link
                to={`/productsdetails/${product?._id}/${product?.category.name}`}
                className="content"
              >
                <div className="image">
                  <img
                    src={product?.imageCover}
                    alt={product?.title}
                    className="w-full p-2"
                  />
                </div>
                <div className="info p-3">
                  <h3 className="text-green-600">{product?.category.name}</h3>
                  <h1 className="font-bold text-lg mt-2">
                    {product?.title.split(" ").slice(0, 2).join(" ")}
                  </h1>
                  <div className="price flex items-center justify-between">
                    <p className="font-bold">{product?.price} EGY</p>
                    <span>
                      <i className="fa-solid fa-star text-yellow-400"></i>{" "}
                      {product?.ratingsAverage}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="btn mt-5 text-center ">
                <button
                  type="button"
                  className="text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}
