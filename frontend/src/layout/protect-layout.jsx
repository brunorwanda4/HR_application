import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectLayout = () => {
  const t = localStorage.getItem("auth_token");
  const u = localStorage.getItem("user");

  if (!t || !u) return <Navigate to={"/"} />;
  
  return <Outlet />;
};

export default ProtectLayout;
