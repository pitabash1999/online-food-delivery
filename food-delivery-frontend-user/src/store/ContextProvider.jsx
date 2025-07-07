import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  signup,
  login,
  getUser,
  getCartFoods,
  addToCart,
  decrementFromCart,
  removeFromCart,
  fetchOrders,
  submitOrder,
} from "../Utils/Api";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload.map] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "FETCH_ORDER":
      return { ...state, orders: action.payload };
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    case "SET_LIST":
      return { ...state, list: action.payload };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

const Provider = createContext();

const ContextProvider = ({ children }) => {
  //user registration
  const registration = async (formData) => {
    try {
      const response = await signup(formData);
    } catch (error) {
      throw error;
    }
  };

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  //user login
  const userLogin = async (formData) => {
    try {
      const response = await login(formData);

      if (response) {
        localStorage.setItem("token", response.jwt);
        setToken(response.jwt);
      }
    } catch (error) {
      throw error;
    }
  };

  //place order
  const placeOrder = async (token, orderRequest) => {
    try {
      const response = await submitOrder(token, orderRequest);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const initialState = {
    user: null,

    cart: [],
    orders: [],
    list: [],
    increment,
    decrement,
    removeItem,
    registration,
    userLogin,
    placeOrder,
    logout,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const initializeUser = async () => {
      if (token) {
        try {
          // Add a function in your API utils to fetch user data with the token
          const userData = await getUser(token);
          const cartData = await getCartFoods(token);
          const orderList = await fetchOrders(token);

          dispatch({ type: "SET_USER", payload: userData });
          setQuantity(cartData.map);
          dispatch({ type: "FETCH_ORDER", payload: orderList });
        } catch (error) {
          throw error;
        }
      }
    };

    initializeUser();
  }, [token]);

  const [quantity, setQuantity] = useState({});

  function increment(foodId) {
    // First check if item exists in cart
    const itemInCart = state.cart.some((item) => item.id === foodId);

    if (!itemInCart) {
      // If not in cart, find the item and add it
      const foodItem = state.list.find((item) => item.id === foodId);
      if (foodItem) {
        dispatch({
          type: "ADD_TO_CART",
          payload: foodItem,
        });
      }
    }

    // Always increment the quantity
    setQuantity((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));
    addToCart(foodId, token);
  }

  function decrement(foodId) {
    setQuantity((prev) => ({
      ...prev,
      [foodId]: Math.max(0, (prev[foodId] || 0) - 1),
    }));

    // Optional: Remove from cart if quantity reaches 0
    if (quantity[foodId] <= 1) {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: foodId,
      });
    }
    decrementFromCart(foodId, token);
  }

  //remove item from cart
  function removeItem(id) {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    setQuantity((prev) => {
      const newQty = { ...prev };
      delete newQty[id];
      return newQty;
    });
    removeFromCart(id, token);
  }

  return (
    <Provider.Provider value={{ state, dispatch, quantity, token }}>
      {children}
    </Provider.Provider>
  );
};

export default ContextProvider;

export const getContext = () => useContext(Provider);
