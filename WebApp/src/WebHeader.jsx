import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "./assets/Arrival.png";
import { Search, ShoppingCart, User } from "lucide-react";

function WebHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("access_token");
  const roleId = localStorage.getItem("role_Id"); // get role from storage

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b-2 border-[#eb0505] px-6 py-3 flex items-center justify-between shadow-sm w-full">
      
      {/* Logo */}
      <div
        className="flex items-center justify-center cursor-pointer flex-1"
        onClick={() => navigate("/Start")}
      >
        <img src={Logo} alt="Toyozu Logo" className="h-[60px] w-auto" />
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-lg mx-8 flex justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-[600px] px-4 py-2 border border-gray-300 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6 relative justify-center flex-1 gap-10 ">
        {/* Cart */}
        <ShoppingCart
          className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-600 transition"
          onClick={() => navigate("/Cart-demo")}
        />

        {/* User Menu */}
        {isLoggedIn ? (
          <div className="relative">
            <User
              className="w-7 h-7 text-gray-700 cursor-pointer hover:text-red-600 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-2 z-50">
                {/* Account */}
                <button
                  onClick={() => { setMenuOpen(false); navigate("/UserDashboard"); }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Account
                </button>

                {/* Purchases */}
                <button
                  onClick={() => { setMenuOpen(false); navigate("/Purchases"); }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Purchases
                </button>

                {/* Admin Dashboard (only for roles 1,2,3) */}
                {(roleId === "1" || roleId === "2" || roleId === "3") && (
                  <button
                    onClick={() => { setMenuOpen(false); navigate("/AdminDashboard"); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </button>
                )}

                {/* Logout */}
                <button
                  onClick={() => { setMenuOpen(false); handleLogout(); }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/LoginPage")}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default WebHeader;