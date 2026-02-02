import React, { createContext, useEffect, useState } from "react";

export let userTokenContext = createContext();

export default function UserContext(props) {
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUserLogin(localStorage.getItem("user"));
    }
  }, []);

  return (
    <userTokenContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </userTokenContext.Provider>
  );
}
