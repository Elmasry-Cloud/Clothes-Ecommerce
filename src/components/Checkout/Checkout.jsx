import React, { useContext, useEffect, useState } from "react";
import "./Checkout.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { cart } from "../../context/CartContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  // let { cartIdOwner } = useContext(cart);

  // let cartIdOwner = localStorage.getItem("cartId");

  let headers = {
    token: localStorage.getItem("user"),
  };

  function handelCheckOut(FormValues) {
    // console.log(FormValues);
    checkOut(FormValues);
  }

  async function checkOut(FormValues) {
    // setLoading(true);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${localStorage.getItem(
          "cartId"
        )}?url=http://localhost:5173`,
        FormValues,
        { headers }
      )
      .then((data) => {
        // setLoading(false);
        // setSuccess(data?.data.message);
        // setError(null);
        // console.log(data?.data.message);
        // console.log(data?.data.token);
        console.log(data?.data.session.url);
        location.href = data?.data.session.url;
      })
      .catch((err) => {
        // setLoading(false);
        // setError(err?.response.data.message);
        // setSuccess(null);
        console.log(err);
      });
  }

  let validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required("Details is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone must be valid egyption number")
      .required("Phone is Required"),
    city: Yup.string().required("City is Required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handelCheckOut,
    validationSchema,
  });

  useEffect(() => {}, []);
  return (
    <>
      <form className="max-w-2xl mx-auto" onSubmit={formik.handleSubmit}>
        {/* Success Message */}
        {success !== null ? (
          <div
            class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400"
            role="alert"
          >
            <span class="font-medium">{success}</span>
          </div>
        ) : null}

        {/* Error Message */}
        {error !== null ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">{error}</span>
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            type="text"
            name="details"
            id="detailsInput"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          {formik.errors.details && formik.touched.details ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.details}</span>
            </div>
          ) : null}
          <label
            htmlFor="detailsInput"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            your details:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="PhoneInput"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          ) : null}
          <label
            htmlFor="PhoneInput"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            your phone:
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            type="text"
            name="city"
            id="cityInput"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          {formik.errors.city && formik.touched.city ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.city}</span>
            </div>
          ) : null}
          <label
            htmlFor="cityInput"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            your city:
          </label>
        </div>
        <button
          type="submit"
          className="text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {loading == true ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
}
