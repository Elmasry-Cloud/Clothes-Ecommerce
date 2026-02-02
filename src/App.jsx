import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Wishlist from "./components/Wishlist/Wishlist";
import Categories from "./components/Categories/Categories";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";
import ProtectedLog from "./components/ProtectedLog/ProtectedLog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserContext from "./context/UserContext";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import FeaturesProducts from "./components/FeaturesProducts/FeaturesProducts";
import CartContext from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import WishListContextProvider from "./context/WishListContext";
import Checkout from "./components/Checkout/Checkout";
import AllOrders from "./components/AllOrders/AllOrders";

const rout = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedAuth>
            <Home />
          </ProtectedAuth>
        ),
      },
      {
        path: "featuresproducts",
        element: (
          <ProtectedAuth>
            <FeaturesProducts />
          </ProtectedAuth>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedAuth>
            <Products />
          </ProtectedAuth>
        ),
      },
      {
        path: "productsdetails/:id/:cateName",
        element: (
          <ProtectedAuth>
            <ProductDetails />
          </ProtectedAuth>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedAuth>
            <Wishlist />
          </ProtectedAuth>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedAuth>
            <Categories />
          </ProtectedAuth>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedAuth>
            <Cart />
          </ProtectedAuth>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedAuth>
            <Checkout />
          </ProtectedAuth>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedAuth>
            <AllOrders />
          </ProtectedAuth>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedAuth>
            <Brands />
          </ProtectedAuth>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedLog>
            <Login />
          </ProtectedLog>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedLog>
            <Register />
          </ProtectedLog>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WishListContextProvider>
          <UserContext>
            <CartContext>
              <RouterProvider router={rout} />
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster position="top-left" reverseOrder={false} />
            </CartContext>
          </UserContext>
        </WishListContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
