import { createContext, useContext, useReducer, useState } from "react";
import { adminLogin, adminRegister } from "../Utils/Api";

const foodReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FOOD":
      return { ...state, foods: [...state.foods, action.payload] };
    case "DELETE_FOOD_BY_ID":
      return {
        ...state,
        foods: state.foods.filter((food) => food.id !== action.payload),
      };
    case "ORDERS":
      return { ...state, orders: action.payload };
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? { ...order, orderStatus: action.payload.status }
            : order
        ),
      };
    case "SET_FOODS":
      return { ...state, foods: action.payload };
    default:
      return state;
  }
};

const Provider = createContext();

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const registration = async (formData) => {
    try {
      const response = await adminRegister(formData);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const userLogin = async (formData) => {
    try {
      const response = await adminLogin(formData);
      setToken(response.jwt);
      localStorage.setItem("token", response.jwt);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const initialState = {
    foods: [],
    orders: [],
    user: null,
    registration,
    userLogin,
    logout,
  };

  const [state, dispatch] = useReducer(foodReducer, initialState);

  return (
    <Provider.Provider value={{ state, dispatch, token }}>
      {children}
    </Provider.Provider>
  );
};

export default ContextProvider;

export const FoodContext = () => useContext(Provider);
