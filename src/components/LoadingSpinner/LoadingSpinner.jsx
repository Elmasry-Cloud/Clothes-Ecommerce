import React, { useEffect, useState } from "react";
import "./LoadingSpinner.module.css";
import { ThreeDots } from "react-loader-spinner";

export default function LoadingSpinner() {
  const { counter, setCounter } = useState(0);

  useEffect(() => {}, []);
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <ThreeDots
          visible={true}
          height="150"
          width="150"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
