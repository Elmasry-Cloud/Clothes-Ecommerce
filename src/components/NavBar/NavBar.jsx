import React, { useContext, useEffect, useState } from "react";
import "./NavBar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userTokenContext } from "../../context/UserContext";
import { cart } from "../../context/CartContext";

export default function NavBar() {
  let navigate = useNavigate();

  let { userLogin, setUserLogin } = useContext(userTokenContext);
  let { cartNum } = useContext(cart);
  // console.log(userLogin);

  function logout() {
    localStorage.removeItem("user");
    setUserLogin(null);
    navigate("/login");
  }

  useEffect(() => {
    // if (localStorage.getItem("user") !== null) {
    //   setUserLogin(localStorage.getItem("user"));
    // }
  }, []);
  return (
    <>
      <nav className="bg-white capitalize dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={"/"} className="logo text-white font-extrabold">
            <i className="fa-solid fa-cart-shopping me-1"></i>
            fresh
            <span className="text-green-500"> cart</span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ul className="flex md:flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {userLogin !== null ? (
                <>
                  <li className=" relative">
                    <Link
                      to={"/cart"}
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span className="absolute rounded-4xl text-green-500 end-0 md:end-[-10px] top-[-10px]">
                        {cartNum}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={logout}
                      className="block cursor-pointer py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/login"}
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/register"}
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      register
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex cursor-pointer items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-10 h-10"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {/* {userLogin !== null ? ( */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            {userLogin !== null ? (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to={""}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/wishlist"}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/brands"}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/categories"}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/products"}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/cart"}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    cart
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
          {/* // ) : null} */}
        </div>
      </nav>
    </>
  );
}
