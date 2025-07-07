import { getContext } from "../../store/ContextProvider";
import { MdDelete } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegMinusSquare } from "react-icons/fa";
import Login from "../Auth/Login";

const CartList = ({ item }) => {
  const { state, quantity, token } = getContext();
  if (!token) return <Login />;
  return (
    <div className="py-4 flex flex-col md:flex-row gap-4">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium">{item.name}</h3>
        <p className="text-gray-600">
          <i className="fa-solid fa-indian-rupee-sign text-sm"></i>{" "}
          {item.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-4">
        {/* Quantity Controls */}
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => state.decrement(item.id)}
            className="px-3 py-1 "
            disabled={item.quantity <= 1}
          >
            <FaRegMinusSquare />
          </button>
          <span className="px-4">{quantity[item.id]}</span>
          <button
            onClick={() => state.increment(item.id)}
            className="px-3 py-1"
          >
            <FaRegSquarePlus />
          </button>
        </div>
        {/* Remove Button */}
        <button
          className="text-red-500 hover:text-red-700 cursor-pointer"
          aria-label="Remove item"
          onClick={() => state.removeItem(item.id)}
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartList;
