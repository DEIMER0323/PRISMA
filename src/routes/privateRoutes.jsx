import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ redirectpath = "/login" }) => {
  const { isAuth } = useSelector((store) => store.userAuth);
  if (!isAuth) return <Navigate to={redirectpath} />;
  return <Outlet />;
};

export default PrivateRoutes;
