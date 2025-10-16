import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
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
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative z-[50] transition-all">
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Links */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Product</NavLink>
        {/* <NavLink to="/">Contact</NavLink> */}

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* Cart */}
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* Login/Profile */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
              alt=""
            />
            {profileOpen && (
              <ul className="absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-36 rounded-md text-sm z-[60] transition-all">
                <li
                  onClick={() => navigate("my-orders")}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={logout}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Icons */}
      <div className="flex items-center gap-6 sm:hidden">
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md flex flex-col items-start gap-1 px-5 py-4 text-sm md:hidden z-[60] transition-all">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Product
          </NavLink>
          {user && (
            <div className="w-full">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
              >
                Account
              </button>
              {profileOpen && (
                <div className="flex flex-col ml-2 mt-1 border-l border-gray-200">
                  <button
                    onClick={() => { setOpen(false); navigate("/products"); }}
                    className="px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-700"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={logout}
                    className="px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {/* <NavLink to="/" onClick={() => setOpen(false)}>
            Contact
          </NavLink> */}

          {!user && (
            <button
              onClick={() => { setOpen(false); setShowUserLogin(true); }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm w-full"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
