import axios from "axios";

const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default baseUrl;

const setAuthHeader = (token, baseUrl) => {
  token
    ? (baseUrl.defaults.headers.common["Authorization"] = `Bearer ${token}`)
    : delete baseUrl.defaults.headers.common["Authorization"];
};

export const getAllFoods = async () => {
  try {
    const response = await baseUrl.get("api/foods/getAllFoods");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFoodById = async (id) => {
  try {
    const response = await baseUrl.get(`api/foods/getFoodById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (formData) => {
  try {
    const response = await baseUrl.post("/api/auth/signUp", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (formData) => {
  try {
    const response = await baseUrl.post("/api/auth/login", formData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (token) => {
  try {
    setAuthHeader(token, baseUrl);
    const response = await baseUrl.get("/api/auth/getEmail");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCartFoods = async (token) => {
  try {
    setAuthHeader(token, baseUrl);
    const response = await baseUrl.get("/api/cart/getFromCart");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (foodId, token) => {
  setAuthHeader(token, baseUrl);
  try {
    const response = await baseUrl.post("/api/cart/addFoodToCart", { foodId });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const decrementFromCart = async (foodId, token) => {
  setAuthHeader(token, baseUrl);
  try {
    const response = await baseUrl.post("/api/cart/deleteFoodToCart", {
      foodId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeFromCart = async (foodId, token) => {
  setAuthHeader(token, baseUrl);
  try {
    const response = await baseUrl.post("/api/cart/deleteFoodFromCart", {
      foodId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrders = async (token) => {
  setAuthHeader(token, baseUrl);
  try {
    const response = await baseUrl.get("/api/orders/getAllOrdersById");

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const submitOrder = async (token, orderRequest) => {
  setAuthHeader(token, baseUrl);
  try {
    const response = await baseUrl.post(
      "/api/orders/createOrder",
      orderRequest
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyPayement = async (paymentDetails) => {
  try {
    const response = await baseUrl.post("/api/orders/verify", paymentDetails);
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

export const deleteOrderById = async (orderId) => {
  try {
    const response = await baseUrl.delete(`/api/orders/deleteOrder/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
