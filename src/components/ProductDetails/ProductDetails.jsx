import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { cart } from "../../context/CartContext";

export default function ProductDetails() {
  const [detailsData, setDetailsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState(null);

  let { addToCart, setCartNum } = useContext(cart);

  let { id, cateName } = useParams();
  // console.log(detailsData);

  async function getProductDetails(id) {
    setIsLoading(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        // console.log(data?.data);
        setDetailsData(data?.data);
        setIsLoading(false);
        getAllProducts();
      });
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  // Add To Cart
  async function addItemToCart(productId) {
    let add = await addToCart(productId);
    setCartNum(add?.data.numOfCartItems);
    localStorage.setItem("numOfCart", add?.data.numOfCartItems);
    // console.log(add);
    // console.log(productId);
  }

  async function getAllProducts() {
    return await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products
`
      )
      .then(({ data }) => {
        // console.log(
        //   data?.data.filter((da) => (da.category.name === cateName ? da : null))
        // );
        let filterData = data?.data.filter((da) =>
          da.category.name === cateName ? da : null
        );
        // console.log(filterData);

        setAllProducts(filterData);
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  // if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="container min-h-screen mx-auto flex items-center justify-center flex-col md:flex-row pt-32 md:pt-0">
            <div className="content w-full md:w-2/5">
              <Slider {...settings}>
                {detailsData?.images.map((image) => (
                  <img
                    src={image}
                    className="w-full object-cover md:h-[500px]"
                    title={detailsData?.title}
                  />
                ))}
              </Slider>
            </div>
            <div className="content p-8 w-full md:w-3/5">
              <h1 className="text-2xl font-extrabold">{detailsData?.title}</h1>
              <p className="font-light my-4">{detailsData?.description}</p>
              <div className="price flex items-center justify-between">
                <p className="font-bold">{detailsData?.price} EGY</p>
                <span>
                  <i className="fa-solid fa-star text-yellow-400"></i>{" "}
                  {detailsData?.ratingsAverage}
                </span>
              </div>
              <div className="btn mt-5 text-center w-3/4 mx-auto">
                <button
                  onClick={() => addItemToCart(detailsData?.id)}
                  type="button"
                  className="w-full text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 py-10">
            {allProducts?.map((product) => (
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
                    onClick={() => addItemToCart(product?.id)}
                    type="button"
                    className="text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
