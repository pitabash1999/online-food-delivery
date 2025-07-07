import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AddFood from "./components/Pages/AddFood";
import OrderFood from "./components/Pages/OrderFood";
import ListFood from "./components/Pages/ListFood";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { FoodContext } from "./store/ContextProvider";
import NotFound from "./components/Pages/NotFound";

const App = () => {
  const { token } = FoodContext();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <ListFood /> : <Login />} />
        <Route path="/add-food" element={token ? <AddFood /> : <Login />} />
        <Route path="/order-food" element={token ? <OrderFood /> : <Login />} />
        <Route path="/list-food" element={token ? <ListFood /> : <Login />} />
        <Route path="*" element={token ? <ListFood /> : <Login />} />
        <Route path="/login" element={!token ? <Login /> : <NotFound />} />
        <Route path="/signup" element={!token ? <Signup /> : <NotFound />} />
      </Routes>
    </>
  );
};

export default App;
