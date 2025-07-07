import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import delivery from "../../assets/delivery.png";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaRegListAlt } from "react-icons/fa";
import { FoodContext } from "../../store/ContextProvider";
import Login from "../auth/Login";

const Sidebar = () => {
  const { token } = FoodContext();

  if (token)
    return (
      <div className="drawer mt-2 ml-1 z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            <TbLayoutSidebarLeftExpandFilled className="text-2xl" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-50 p-4">
            {/* Sidebar content here */}
            <li>
              <img className="w-16 h-12" src={delivery} alt="delivery-image" />
            </li>
            <li className="text-xl font-bold">
              <Link to={"/add-food"}>
                <IoMdAddCircleOutline />
                Add
              </Link>
            </li>
            <li className="text-xl font-bold">
              <Link to={"/order-food"}>
                <PiShoppingCartSimpleBold />
                Orders
              </Link>
            </li>
            <li className="text-xl font-bold">
              <Link to={"/list-food"}>
                <FaRegListAlt />
                Foods List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default Sidebar;
