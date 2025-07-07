import { useEffect, useState } from "react";
import { deleteFoodById, getAllFoods } from "../../Utils/Api";
import { FoodContext } from "../../store/ContextProvider";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";

const ListFood = () => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch, token } = FoodContext();

  useEffect(() => {
    const fetchFoodList = async () => {
      setLoading(true);
      try {
        const data = await getAllFoods();
        dispatch({
          type: "SET_FOODS",
          payload: data,
        });
      } catch (error) {
        toast.error("Failed to fetch food list");
        console.error("Error fetching food list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodList();
  }, [dispatch, token]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteFoodById(id);
      dispatch({
        type: "DELETE_FOOD_BY_ID",
        payload: id,
      });
      toast.success("Food deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete food item");
      console.error("Error deleting food item:", error);
    }
  };

  if (loading)
    return <div className="text-center min-h-max p-4">Loading...</div>;

  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center gap-2">
      <h1 className="text-center p-3 text-2xl">Foods List</h1>

      <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="table table-xs w-full">
          <thead className="bg-gray-200 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>

        <div className="overflow-y-auto max-h-96">
          {" "}
          {/* Scrollable container */}
          <table className="table table-xs w-full">
            <tbody>
              {state.foods.map((food, index) => (
                <tr key={index} className="dark:hover:bg-gray-800">
                  <td>{food.name}</td>
                  <td>{food.price}</td>
                  <td className="max-w-xs truncate">{food.description}</td>
                  <td>{food.category}</td>
                  <td>
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(food.id)}
                    >
                      <MdOutlineDeleteForever className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListFood;
