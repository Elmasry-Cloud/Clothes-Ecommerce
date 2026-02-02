import React, { useEffect, useState } from "react";
import "./AllOrders.module.css";

export default function AllOrders() {
  const { counter, setCounter } = useState(0);

  useEffect(() => {}, []);
  return (
    <>
      <h1 className="text-4xl text-green-600 font-extrabold flex items-center justify-center">
        Congratulations :)
      </h1>
    </>
  );
}
