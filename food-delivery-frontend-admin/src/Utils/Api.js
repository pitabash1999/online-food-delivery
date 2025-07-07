import axios from "axios";

const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default baseUrl;

const token = localStorage.getItem("token");

const setAuthHeader = (baseURL, token) => {
  if (token) {
    baseURL.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete baseURL.defaults.headers.common["Authorization"];
  }
};

export const addNewFood = async (formData, token) => {
  setAuthHeader(baseUrl, token);
  try {
    const response = await baseUrl.post("/api/foods/saveFoodItems", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllFoods = async () => {
  setAuthHeader(baseUrl, token);
  try {
    const response = await baseUrl.get("api/foods/getAllFoods");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFoodById = async (id) => {
  setAuthHeader(baseUrl, token);
  try {
    const response = await baseUrl.delete(`api/foods/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusByOrderId = async (orderId, status) => {
  try {
    setAuthHeader(baseUrl, token);
    const response = await baseUrl.patch(
      `/api/orders/updateStatus/${orderId}?status=${status}`
    );
  } catch (error) {
    throw error;
  }
};

export const getAllOrders = async () => {
  setAuthHeader(baseUrl, token);
  try {
    const response = await baseUrl.get("/api/orders/getAllOrders");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminRegister = async (formData) => {
  try {
    const response = await baseUrl.post("/api/auth/admin/signUp", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminLogin = async (formData) => {
  try {
    const response = await baseUrl.post("/api/auth/login", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (formData) => {
  try {
    const response = await baseUrl.post(
      "/api/auth/admin/signUpVerification",
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const response = await baseUrl.delete(`/api/auth/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
