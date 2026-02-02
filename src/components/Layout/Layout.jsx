import React, { useContext, useEffect, useState } from "react";
import "./Layout.module.css";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { cart } from "../../context/CartContext";
import { userTokenContext } from "../../context/UserContext";

export default function Layout() {
  // let { setCartNum } = useContext(cart);

  useEffect(() => {}, []);
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 max-w-screen-xl pt-30 min-h-screen capitalize ">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
