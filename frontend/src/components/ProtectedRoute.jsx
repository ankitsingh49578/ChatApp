import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, screenLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!screenLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, screenLoading]);

  return children;
};

export default ProtectedRoute;
