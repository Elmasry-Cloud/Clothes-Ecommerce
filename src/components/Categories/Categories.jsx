import React, { useEffect, useState } from "react";
import "./Categories.module.css";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getCategories() {
    setIsLoading(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        // console.log(data?.data);
        setCategories(data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto min-h-screen py-12 md:py-0 pb-8">
          <h1 className="text-2xl font-extrabold text-green-500 my-4">
            Categories:
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories?.map((cat) => (
              <div
                className="row hover:shadow-lg shadow-green-400 hover:border-2 border-2 border-gray-300"
                key={cat?._id}
              >
                <div className="content">
                  <div className="image">
                    <img
                      src={cat?.image}
                      alt={cat?.name}
                      className="w-full p-2 h-[250px] object-cover"
                    />
                  </div>
                  <div className="info p-3">
                    <h3 className="text-green-600 font-extrabold text-2xl text-center">
                      {cat?.name}
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
