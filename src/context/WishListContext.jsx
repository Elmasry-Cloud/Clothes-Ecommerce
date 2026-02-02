import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userTokenContext } from "./UserContext";

export let wishContext = createContext();

export default function WishListContextProvider(props) {
  const [isLoading, setIsLoadind] = useState(false);

  let headers = {
    token: localStorage.getItem("user"),
  };

  // Add Product To WishList
  async function AddWishListProducts(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  //   Get WishList Items
  async function getWishList() {
    setIsLoadind(true);
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        setIsLoadind(false);
        return res;
      })
      .catch((err) => {
        setIsLoadind(false);
        return err;
      });
  }

  // Remove item WishList
  async function removeWishList(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <wishContext.Provider
      value={{ AddWishListProducts, getWishList, removeWishList, isLoading }}
    >
      {props.children}
    </wishContext.Provider>
  );
}
