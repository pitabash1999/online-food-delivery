import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodById } from "../../Utils/Api";
import { MdAddShoppingCart } from "react-icons/md";
import { getContext } from "../../store/ContextProvider";
import { BsCartXFill } from "react-icons/bs";

const FoodDetails = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const param = useParams();

  const { quantity, state } = getContext();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true);
        const response = await getFoodById(param.id);
        setItem(response);
      } catch (error) {
        console.error("Failed to fetch food details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [param.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  return (
    <div className="hero  min-h-max w-full mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <img
          src={item.imageUrl}
          className="max-w-sm rounded-lg shadow-2xl min-h-max"
        />
        <div>
          <p className="text-sm text-black dark:text-white font-semibold mb-2">
            Category{" "}
            <span className="bg-amber-500 py-1 px-3 rounded-full">
              {item.category}
            </span>
          </p>
          <h1 className="text-5xl font-bold">{item.name}</h1>
          <p className="py-6">{item.description}</p>
          <div className="flex flex-col i gap-1.5">
            <div className="flex items-center gap-1 ">
              <i className="fa-solid fa-indian-rupee-sign text-gray-800 dark:text-gray-300 text-xs"></i>
              <h2 className="text-xl text-orange-300 font-semibold ">
                {item.price}
              </h2>
            </div>
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
    </div>
  );
};

export default FoodDetails;
