import React, { useContext, useEffect, useState } from "react";
import "./Wishlist.module.css";
import { wishContext } from "../../context/WishListContext";
import { cart } from "../../context/CartContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Wishlist() {
  const [wishData, setWishData] = useState(null);
  let { getWishList, removeWishList, isLoading } = useContext(wishContext);
  let { addToCart } = useContext(cart);

  // Add wishList
  async function getWishListItems(productId) {
    let wishData = await getWishList(productId);

    setWishData(wishData?.data.data);

    // console.log(wishData?.data.data);

    // if (wish?.data.status == "success") {
    //   element.target.classList.add("text-red-600");
    // }
    // console.log(element.target);
  }

  // Add To Cart
  async function addItemToCart(productId) {
    let add = await addToCart(productId);
  }

  // Remove item Cart
  async function removeWishItems(productId) {
    let removeItem = await removeWishList(productId);

    // setWishData(wishData?.data.data);

    if (removeItem?.data.status == "success") {
      window.location.reload();
    }

    console.log(removeItem);
    // console.log(removeItem);
    // setCartData(removeItem?.data.data.products);
    // setDataTotalPrice(removeItem?.data.data);
  }

  // removeWishItems

  useEffect(() => {
    getWishListItems();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="relative p-4 overflow-x-auto shadow-md sm:rounded-lg mb-20">
          <h1 className="text-3xl font-extrabold text-green-500 mb-12">
            Your wishlist :
          </h1>

          {wishData?.length == 0 ? (
            <h1 className="text-4xl font-extrabold text-center">
              your Wishlist is Impty...
            </h1>
          ) : (
            <>
              <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Add To Cart
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {wishData?.map((wishItem) => (
                  <tbody key={wishItem?._id}>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img
                          src={wishItem?.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-[150px] object-cover mx-auto"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {wishItem?.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {wishItem?.price}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => addItemToCart(wishItem?.id)}
                          type="button"
                          className="text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
                        >
                          Add To Cart
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          onClick={() => removeWishItems(wishItem?.id)}
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500"
                        >
                          Remove
                        </a>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </>
          )}
        </div>
      )}
    </>
  );
}
