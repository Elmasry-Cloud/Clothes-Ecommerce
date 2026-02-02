import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { userTokenContext } from "./UserContext";
import toast from "react-hot-toast";

export let cart = createContext();

export default function CartContext(props) {
  //   const [getCart, setGetCart] = useState(null);
  const [isLoading, setIsLoadind] = useState(false);
  const [cartNum, setCartNum] = useState(null);
  // const [cartIdOwner, setCartIdOwner] = useState(null);

  let { userLogin } = useContext(userTokenContext);
  // console.log(userLogin);

  let headers = {
    token: localStorage.getItem("user"),
  };

  // Add To Cart
  async function addToCart(productId) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((res) => {
        // console.log(res?.data.numOfCartItems);
        setCartNum(res?.data.numOfCartItems);
        toast.success(res?.data.message);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err?.message);
        return err;
      });
  }

  // Get Cart
  async function getCartProducts() {
    // data?.status
    // data?.numOfCartItems
    // data?.cartId
    // data?.data.products
    // data?.data.products[0].price
    // data?.data.products[0]._id
    // data?.data.products[0].products.imageCover
    // data?.data.totalCartPrice
    // data?.data._id
    // data?.data.cartOwner
    // err?.message
    setIsLoadind(true);
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then(({ data }) => {
        setIsLoadind(false);
        // console.log(data?.cartId);
        // setCartIdOwner(data?.cartId);
        setCartNum(data?.numOfCartItems);
        // console.log(data?.numOfCartItems);

        localStorage.setItem("cartId", data?.cartId);
        // data.cartOwner

        return data;
      })
      .catch((err) => {
        setIsLoadind(false);
        return err;
      });
  }

  // Update Cart
  async function updateCart(countNumperStep, productId) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: countNumperStep },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  // Remove item Cart
  async function removeCart(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        setCartNum(res?.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  // Clear All item Cart
  async function clearCart() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        if (res?.data.message == "success") {
          setCartNum(0);
        }
        return res;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    // getCartProducts();
  }, []);

  return (
    <cart.Provider
      value={{
        addToCart,
        getCartProducts,
        updateCart,
        removeCart,
        clearCart,
        isLoading,
        cartNum,
        setCartNum,
      }}
    >
      {props.children}
    </cart.Provider>
  );
}
