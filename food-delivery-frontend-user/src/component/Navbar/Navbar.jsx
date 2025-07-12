import { useState } from "react";
import delivery from "../../assets/delivery.png";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getContext } from "../../store/ContextProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state, quantity, token } = getContext(); // Assuming getContext is imported from ContextProvider
  const navigate = useNavigate();

  const cartItems = state.list.filter((item) => quantity[item.id] > 0);
  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * quantity[item.id];
  }, 0);

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* Left logo + name */}
      <div className="flex-1">
        <Link
          to={"/"}
          className="flex items-center gap-2 normal-case text-xl cursor-pointer"
        >
          <img src={delivery} alt="Logo" className="w-8 h-8" />
          Foods Adda
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 items-center">
        <Link to={"/explore"} className="btn btn-ghost">
          Explore
        </Link>
        <Link to={"/orders"} className="btn btn-ghost">
          Orders
        </Link>

        {!token ? (
          <>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-outline btn-primary"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </>
        ) : (
          <>
            {/* Cart */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cartItems.length}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">
                    {cartItems.length} Items
                  </span>
                  <span className="text-info">Subtotal: {cartTotal}</span>
                  <div className="card-actions">
                    <Link to={"/cart"}>
                      <button className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ">
                  <p className="flex items-center justify-center h-full w-full text-2xl font-semibold border-2 border-gray-300 rounded-full ">
                    {state.user?.charAt(0).toUpperCase()}
                  </p>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                <li>
                  <button
                    className="border-gray-400 dark:bg-slate-500"
                    onClick={state.logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn btn-ghost btn-circle"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-2 w-60 bg-base-100 shadow-md rounded-md flex flex-col p-4 z-50 md:hidden gap-2">
          <Link to={"/explore"} className="btn btn-ghost justify-start">
            Explore
          </Link>
          <Link to={"/orders"} className="btn btn-ghost justify-start">
            Orders
          </Link>

          {!token ? (
            <>
              <button
                className="btn btn-outline"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-outline btn-primary"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline btn-info"
                onClick={() => navigate("/orders")}
              >
                {cartItems.length} Items
              </button>

              <a className="btn btn-outline btn-error" onClick={state.logout}>
                Logout
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
