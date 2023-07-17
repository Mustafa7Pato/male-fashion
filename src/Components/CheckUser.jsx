import React from "react";
import { AdminAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

const CheckUser = ({ children }) => {
  const { auth } = AdminAuth();
  if (auth == "admin") {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default CheckUser;
