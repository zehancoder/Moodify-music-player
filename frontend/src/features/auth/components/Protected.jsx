import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function Protected({ children }) {
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);
  if (loading) {
    return <h1 className="text-4xl text-white font-bold">Loading...</h1>;
  }
 
  if (!user.success) {
    return <Navigate to={"/login"} />;
  }
  
  return children;
}

export default Protected;
