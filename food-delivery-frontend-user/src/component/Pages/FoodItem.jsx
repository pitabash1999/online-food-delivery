import { MdAddShoppingCart } from "react-icons/md";
import { BsCartXFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getContext } from "../../store/ContextProvider";

const FoodItem = ({ item }) => {
  const { state, quantity } = getContext();

  const navigate = useNavigate();
  const handleGetDetails = () => {
    navigate(`/details/${item.id}`);
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm ">
      <figure>
        <img src={item.imageUrl} alt="Shoes" className="w-full h-84" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <div className="flex items-center gap-1">
          <i className="fa-solid fa-indian-rupee-sign text-gray-800 dark:text-gray-300 text-xs"></i>
          <h2 className="text-xl text-orange-300 font-semibold ">
            {item.price}
          </h2>
        </div>

        <div className="card-actions justify-between">
          <button className="btn  btn-dash" onClick={handleGetDetails}>
            Get Details
          </button>
          {quantity[item.id] > 0 ? (
            <div className="flex items-center gap-2">
              <button
                className="btn btn-error rounded-full"
                onClick={() => state.decrement(item.id)}
              >
                <BsCartXFill />
              </button>
              <p>{quantity[item.id]}</p>
              <button
                className="btn btn-primary rounded-full"
                onClick={() => state.increment(item.id)}
              >
                <MdAddShoppingCart />
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary "
              onClick={() => state.increment(item.id)}
            >
              <MdAddShoppingCart />
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
