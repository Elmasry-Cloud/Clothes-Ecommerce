import React, { useEffect, useState } from "react";
import "./ProtectedLog.module.css";
import { Navigate } from "react-router-dom";

export default function ProtectedLog(props) {
  const { counter, setCounter } = useState(0);

  if (localStorage.getItem("user") !== null) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
}
