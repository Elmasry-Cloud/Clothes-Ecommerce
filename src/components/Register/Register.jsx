import React, { useContext, useEffect, useState } from "react";
import "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { userTokenContext } from "../../context/UserContext";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  let { setUserLogin } = useContext(userTokenContext);

  let navigate = useNavigate();

  function handelRegister(FormValues) {
    console.log(FormValues);
    signUp(FormValues);
  }

  async function signUp(FormValues) {
    setLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, FormValues)
      .then((data) => {
        setLoading(false);
        setSuccess(data?.data.message);
        setError(null);
        if (data?.data.message == "success") {
          localStorage.setItem("user", data?.data.token);
          setUserLogin(data?.data.token);
          navigate("/login");
        }
        console.log(data?.data.message);
        console.log(data?.data.token);
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response.data.message);
        setSuccess(null);
        console.log(err.response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required("Name is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z][A-Za-z0-9]{8,15}$/,
        "Password must start with char and at least 8 Char..."
      )
      .required("Password is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword not match")
      .required("Password is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone must be valid egyption number")
      .required("Phone is Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handelRegister,
    validationSchema,
  });

  useEffect(() => {}, []);
  return (
    <>
      <div className="min-h-screen">
        <h1 className="text-center text-3xl pb-8 text-green-500 font-bold">
          Register now
        </h1>

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
              value={formik.values.name}
              type="text"
              name="name"
              id="nameInput"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            {formik.errors.name && formik.touched.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3 dark:text-red-400"
                role="alert"
              >
                <span class="font-medium">{formik.errors.name}</span>
              </div>
            ) : null}
            <label
              htmlFor="nameInput"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              your Name:
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              name="email"
              id="emailInput"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3 dark:text-red-400"
                role="alert"
              >
                <span class="font-medium">{formik.errors.email}</span>
              </div>
            ) : null}
            <label
              htmlFor="emailInput"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address:
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              name="password"
              id="passwordInput"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3 dark:text-red-400"
                role="alert"
              >
                <span class="font-medium">{formik.errors.password}</span>
              </div>
            ) : null}
            <label
              htmlFor="passwordInput"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password:
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              type="password"
              name="rePassword"
              id="rePasswordInput"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3 dark:text-red-400"
                role="alert"
              >
                <span class="font-medium">{formik.errors.rePassword}</span>
              </div>
            ) : null}
            <label
              htmlFor="rePasswordInput"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password:
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
                <span class="font-medium">{formik.errors.phone}</span>
              </div>
            ) : null}
            <label
              htmlFor="PhoneInput"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              your phone:
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
          <span className=" ms-3">
            Have an account
            <Link to={"/login"} className="ms-3 text-green-500 font-bold">
              login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
