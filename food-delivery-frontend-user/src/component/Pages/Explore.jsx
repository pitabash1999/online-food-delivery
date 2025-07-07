import { useState } from "react";
import { getContext } from "../../store/ContextProvider";
import FoodItem from "./FoodItem";

const Explore = () => {
  const { state, dispatch } = getContext();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on search query (case insensitive)
  const filteredItems = state.list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center p-4 bg-none rounded-lg mb-6 gap-1">
        <input
          type="search"
          placeholder="Search food items..."
          className="border border-gray-400 dark:border-amber-50 text-black dark:text-white bg-white dark:bg-gray-800 px-4 py-2 rounded-l-full w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 shadow-md"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="fa-solid fa-magnifying-glass text-2xl font-bold rounded-r-full border border-gray-400 dark:border-amber-50 text-black dark:text-white dark:bg-gray-800 px-3 py-2 flex items-center justify-center bg-white hover:bg-gray-300 dark:hover:bg-slate-700 cursor-pointer"></button>
      </div>
      <div className="flex items-center justify-center flex-col md:grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-4 p-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <FoodItem key={index} item={item} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No items found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
