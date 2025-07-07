import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Login from "./component/Auth/Login";
import SignUp from "./component/Auth/SignUp";
import Explore from "./component/Pages/Explore";
import Home from "./component/Pages/Home";
import Orders from "./component/Pages/Orders";
import { getContext } from "./store/ContextProvider";
import { useEffect } from "react";
import { getAllFoods } from "./Utils/Api";
import FoodDetails from "./component/Pages/FoodDetails";
import Cart from "./component/Pages/Cart";
import CheckoutPage from "./component/Pages/CheckoutPage";

function App() {
  const { state, dispatch, token } = getContext();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foods = await getAllFoods();
        dispatch({ type: "SET_LIST", payload: foods });
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      }
    };
    fetchFoods();
  }, [state.list, dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />
        <Route path="/login" element={token ? <Home /> : <Login />} />
        <Route path="/signup" element={token ? <Home /> : <SignUp />} />
        <Route path="/explore" element={token ? <Explore /> : <Login />} />
        <Route path="/orders" element={token ? <Orders /> : <Login />} />
        <Route
          path="/details/:id"
          element={token ? <FoodDetails /> : <Login />}
        />
        <Route path="/cart" element={token ? <Cart /> : <Login />} />
        <Route
          path="/checkout"
          element={token ? <CheckoutPage /> : <Login />}
        />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
