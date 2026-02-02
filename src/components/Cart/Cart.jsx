import React, { useContext, useEffect, useState } from "react";
import "./Cart.module.css";
import { cart } from "../../context/CartContext";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [dataTotalPrice, setDataTotalPrice] = useState(0);

  // console.log(cartData);
  // numOfCartItems

  let { getCartProducts, updateCart, removeCart, clearCart, isLoading } =
    useContext(cart);

  // Get Cart Items
  async function getCartItems() {
    let data = await getCartProducts();
    setCartData(data?.data.products);
    // console.log(data);
    setDataTotalPrice(data?.data);
  }

  // Update Cart Items
  async function updateCartItems(countNumperStep, productId) {
    let update = await updateCart(countNumperStep, productId);
    // console.log(update);
    setCartData(update?.data.data.products);
    setDataTotalPrice(update?.data.data);
  }

  // Remove item Cart
  async function removeCartItems(productId) {
    let removeItem = await removeCart(productId);
    // console.log(removeItem);
    setCartData(removeItem?.data.data.products);
    setDataTotalPrice(removeItem?.data.data);
  }

  // Clear item Cart
  async function clearAllCartItems() {
    let clearItemis = await clearCart();
    console.log(clearItemis);
    setCartData(null);
    setDataTotalPrice(null);
  }

  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="relative p-4 overflow-x-auto shadow-md sm:rounded-lg mb-20">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-extrabold text-green-500">
              Cart Shop :
            </h1>
            <Link
              to={"/checkout"}
              className="focus:outline-none cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
            >
              Check out
            </Link>
          </div>
          {cartData?.length == 0 ? (
            <h1 className="text-4xl font-extrabold text-center">
              your Cart is Impty...
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
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {cartData?.map((cartItem) => (
                  <tbody key={cartItem?._id}>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img
                          src={cartItem?.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-[150px] object-cover"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {cartItem?.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() =>
                              updateCartItems(
                                cartItem?.count == "0"
                                  ? removeCartItems(cartItem?.product.id)
                                  : cartItem?.count - 1,
                                cartItem?.product.id
                              )
                            }
                            className="inline-flex cursor-pointer items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span className="text-white">
                              {cartItem?.count}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              updateCartItems(
                                cartItem?.count + 1,
                                cartItem?.product.id
                              )
                            }
                            className="inline-flex cursor-pointer items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {cartItem?.price}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {cartItem?.price * cartItem?.count}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          onClick={() => removeCartItems(cartItem?.product.id)}
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500"
                        >
                          Remove
                        </a>
                      </td>
                    </tr>
                  </tbody>
                ))}
                <tfoot className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <tr>
                    <td
                      scope="row"
                      className="p-6 text-2xl text-green-500"
                      colSpan={4}
                    >
                      Total Price
                    </td>
                    <td
                      className="text-white font-extrabold text-xl"
                      colSpan={2}
                    >
                      {dataTotalPrice?.totalCartPrice}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="py-8">
                <button
                  onClick={clearAllCartItems}
                  type="button"
                  className="focus:outline-none cursor-pointer font-bold block mx-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
                >
                  Clear your Cart
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
