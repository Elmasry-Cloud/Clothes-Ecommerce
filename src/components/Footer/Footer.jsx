import React, { useEffect, useState } from "react";
import "./Footer.module.css";

export default function Footer() {
  const { counter, setCounter } = useState(0);

  useEffect(() => {}, []);
  return (
    <>
      <h1 className="bg-amber-500 p-8 text-center">Footer Name</h1>
    </>
  );
}
