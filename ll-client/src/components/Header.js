// src/components/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg"; // Убедитесь, что путь к логотипу правильный
import AuthButton from "./user/AuthButton";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
        <Link to="/" className="text-white text-xl">
          Leet Learning
        </Link>
      </div>
      <nav className="flex items-center">
        <Link to="/tasks" className="text-white mr-4">
          Tasks Catalog
        </Link>
        <Link to="/profile" className="text-white mr-4">
          Profile
        </Link>
        <AuthButton />
      </nav>
    </header>
  );
};

export default Header;
