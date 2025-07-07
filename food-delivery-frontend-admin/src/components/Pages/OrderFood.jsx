import { useEffect, useState } from "react";
import { FoodContext } from "../../store/ContextProvider";
import { getAllOrders, updateStatusByOrderId } from "../../Utils/Api";
import { TbCoinRupee } from "react-icons/tb";
const OrderFood = () => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch, token } = FoodContext();

  useEffect(() => {
    const fetchOrderList = async () => {
      setLoading(true);
      try {
        const response = await getAllOrders();

        dispatch({
          type: "ORDERS",
          payload: response,
        });
      } catch (error) {
        console.error("Error fetching order list:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrderList();
  }, [dispatch, token]);

  const getStatusColor = (status, type) => {
    if (type === "payment") {
      return status === "paid"
        ? "text-green-500"
        : status === "Unpaid"
        ? "text-yellow-500"
        : "text-red-500";
    } else {
      return status === "Delivered" ? "text-green-500" : "text-yellow-500";
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await updateStatusByOrderId(id, status);
      dispatch({ type: "UPDATE_ORDER_STATUS", payload: { id, status } });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return <div className="text-center min-h-max p-4">Loading...</div>;
  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center gap-2">
      <h1 className="text-center p-3 text-2xl">Orders List</h1>

      {state.orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            No orders found.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/explore")}
          >
            Explore Menu
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6 flex flex-col-reverse gap-6">
          {state.orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 border-b dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold dark:text-white">
                      Order #{order.id}
                    </h2>
                  </div>
                  <select
                    name="status"
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-all
    bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600
    text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500
    ${getStatusColor(order.orderStatus)}`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                  {/* <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus || "Processing"}
                  </span> */}
                </div>
              </div>

              {/* User Details */}
              <div className="p-4 border-b dark:border-gray-700">
                <h3 className="font-medium mb-2 dark:text-white">
                  Customer Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Name:</span>{" "}
                      {order.userDetails.firstName} {order.userDetails.lastName}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Email:</span>{" "}
                      {order.userDetails.email}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Phone:</span>{" "}
                      {order.userDetails.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Address:</span>{" "}
                      {order.userAddress.street}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {order.userAddress.city}, {order.userAddress.state} -{" "}
                      {order.userAddress.zipCode}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {order.userAddress.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                <h3 className="font-medium mb-3 dark:text-white">
                  Order Items
                </h3>
                <ul className="space-y-3">
                  {order.orderItemList.map((item) => (
                    <li key={item.foodId} className="flex items-center gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border border-orange-500"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium dark:text-gray-300">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700 dark:text-gray-300 flex items-center justify-end">
                          <TbCoinRupee className="inline mr-1" /> {item.price} ×{" "}
                          {item.quantity}
                        </p>
                        <p className="font-medium dark:text-white flex items-center justify-end">
                          <TbCoinRupee className="inline mr-1" />{" "}
                          {item.price * item.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    Subtotal:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 flex items-center">
                    <TbCoinRupee className="inline mr-1" />{" "}
                    {order.orderItemList.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 dark:text-gray-300">Tax:</span>
                  <span className="text-gray-700 dark:text-gray-300 flex items-center">
                    <TbCoinRupee className="inline mr-1" />
                    {order.orderItemList.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) * 0.1}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    Delivery:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 flex items-center">
                    <TbCoinRupee className="inline mr-1" />
                    {order.amount - 50 <= 500 ? "50" : "0"}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t dark:border-gray-600">
                  <span className="dark:text-white">Total:</span>
                  <span className="dark:text-white flex items-center">
                    <TbCoinRupee className="inline mr-1" /> {order.amount}
                  </span>
                </div>

                {/* Payment Status */}
                <div className="mt-4 pt-4 border-t dark:border-gray-600">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Payment Status:</span>
                    <span
                      className={`ml-2 ${getStatusColor(
                        order.paymentStatus,
                        "payment"
                      )}`}
                    >
                      {order.paymentStatus || "Unpaid"}
                      {order.razorPayPaymentId &&
                        ` (${order.razorPayPaymentId})`}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderFood;
