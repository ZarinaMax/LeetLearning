// src/components/user/AuthButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const AuthButton = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return isAuthenticated ? (
    <Button
      onClick={handleLogout}
      className="text-white bg-red-500 px-4 py-2 rounded"
    >
      Logout
    </Button>
  ) : (
    <Button
      onClick={handleLogin}
      className="text-white bg-green-500 px-4 py-2 rounded"
    >
      Login
    </Button>
  );
};

export default AuthButton;
