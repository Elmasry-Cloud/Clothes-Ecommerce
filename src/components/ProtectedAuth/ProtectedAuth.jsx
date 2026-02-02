import React, { useEffect, useState } from "react";
import "./ProtectedAuth.module.css";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth(props) {
  const { counter, setCounter } = useState(0);
  if (localStorage.getItem("user") !== null) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }

  // useEffect(() => {}, []);
}
