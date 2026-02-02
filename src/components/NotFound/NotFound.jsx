import React, { useEffect, useState } from "react";
import "./NotFound.module.css";
import NotfoundImage from "../../assets/Notfound.jpg";

export default function NotFound() {
  const { counter, setCounter } = useState(0);

  useEffect(() => {}, []);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="image w-1/2">
          <img src={NotfoundImage} alt="Notfound" className="w-full" />
        </div>
      </div>
    </>
  );
}
