import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) navigate("/products");
  }, [searchQuery]);

  return (
    <nav className="bg-white border-b border-gray-300 sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-4 md:px-16 py-3">
        {/* LEFT: LOGO + MENU ICON (mobile) */}
        <div className="flex items-center gap-3">
          {/* Menu icon (mobile only) */}
          <button
            onClick={() => setOpen(!open)}
            className="block md:hidden focus:outline-none"
          >
            <img src={assets.menu_icon} alt="menu" className="w-6" />
          </button>

          {/* Logo */}
          <NavLink to="/" onClick={() => setOpen(false)}>
            <img src={assets.logo} alt="logo" className="h-8" />
          </NavLink>
        </div>

        {/* CENTER: LINKS (always visible on desktop) */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">All Products</NavLink>
          {user && <NavLink to="/my-orders">My Orders</NavLink>}
        </div>

        {/* RIGHT: SEARCH + LOGIN + CART */}
        <div className="flex items-center gap-4">
          {/* Search (desktop only) */}
          <div className="hidden lg:flex items-center border border-gray-300 px-3 rounded-full">
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products"
              className="py-1.5 w-40 bg-transparent outline-none placeholder-gray-500"
            />
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </div>

          {/* Login/Logout */}
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="px-5 py-1.5 bg-primary hover:bg-primary-dull text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="px-5 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}

          {/* Cart Icon — always visible */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-6 opacity-80"
            />
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="flex flex-col md:hidden bg-white shadow-md px-6 py-4 text-sm gap-3">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Products
          </NavLink>
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}

          {/* Search (mobile only) */}
          <div className="flex items-center border border-gray-300 px-3 rounded-full">
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products"
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            />
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
