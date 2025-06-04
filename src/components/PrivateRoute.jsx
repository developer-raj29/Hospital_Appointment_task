import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isloggedIn, children }) => {
  const token = localStorage.getItem("token");

  if (token || isloggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
