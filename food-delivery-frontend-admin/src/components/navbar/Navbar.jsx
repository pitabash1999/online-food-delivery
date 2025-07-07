import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { FoodContext } from "../../store/ContextProvider";

const Navbar = () => {
  const { state, token } = FoodContext();
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100 shadow-sm justify-between px-4 sticky top-0 z-50">
      <div className="flex gap-2 items-center justify-center">
        <Sidebar />
        <Link to={"/list-food"} className="btn btn-ghost text-xl">
          Admin Panel
        </Link>
      </div>
      <div className="flex">
        <ul className="menu menu-horizontal px-1 flex flex-row items-center gap-2">
          {!token ? (
            <li className="flex flex-row items-center gap-2">
              <button
                className="btn btn-outline btn-warning"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-warning"
                onClick={() => navigate("/signup")}
              >
                Register
              </button>
            </li>
          ) : (
            <li>
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  state.logout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
