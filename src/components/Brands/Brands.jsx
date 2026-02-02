import React, { useEffect, useState } from "react";
import "./Brands.module.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllBrands() {
    setIsLoading(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        // console.log(data?.data);
        setBrands(data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllBrands();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto min-h-screen py-12 md:pt-0 pb-10">
          <h1 className="text-2xl font-extrabold text-green-500 my-4">
            All Brands:
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brands?.map((brand) => (
              <div
                className="row hover:shadow-lg shadow-green-400 hover:border-2 border-2 border-gray-300"
                key={brand?._id}
              >
                <div className="content">
                  <div className="image">
                    <img
                      src={brand?.image}
                      alt={brand?.name}
                      className="w-full p-2 h-[250px] object-cover"
                    />
                  </div>
                  <div className="info p-3">
                    <h3 className="text-green-600 font-extrabold text-2xl text-center">
                      {brand?.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
