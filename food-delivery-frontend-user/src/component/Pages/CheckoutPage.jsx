import { getContext } from "../../store/ContextProvider";
import { useState } from "react";
import { MdOutlinePayment } from "react-icons/md";
import delivery from "../../assets/delivery.png";
import toast from "react-hot-toast";
import Login from "../Auth/Login";
import { useNavigate } from "react-router-dom";
import { deleteOrderById, verifyPayement } from "../../Utils/Api";

const CheckoutPage = () => {
  const { state, quantity, token, dispatch } = getContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [contactNumber, setContactNumber] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const cartItem = state.list.filter((item) => quantity[item.id] > 0);

  // Calculate totals
  const subtotal = cartItem.reduce(
    (sum, item) => sum + item.price * (quantity[item.id] || 1),
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const deliveryFee = subtotal > 500 ? 0 : 50; // Free delivery over 500
  const total = subtotal + tax + deliveryFee;

  //Address handling
  const handleAddress = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Contact details handling
  const handleContactDetails = (e) => {
    const { name, value } = e.target;
    setContactNumber((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //contact validation for pay button
  const contactValidation = () => {
    return (
      contactNumber.firstName &&
      contactNumber.lastName &&
      contactNumber.phone &&
      contactNumber.email
    );
  };

  //address validation for pay button
  const addressValidation = () => {
    return (
      deliveryAddress.city &&
      deliveryAddress.country &&
      deliveryAddress.state &&
      deliveryAddress.street &&
      deliveryAddress.zip
    );
  };

  const handlePayment = async () => {
    try {
      // Prepare order data
      setLoading(true);
      const order = {
        orderItemList: cartItem.map((item) => ({
          foodId: item.id,
          quantity: quantity[item.id] || 1,
          name: item.name,
          category: item.category,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        amount: total,
        userAddress: deliveryAddress,
        userDetails: contactNumber,
      };

      const response = await state.placeOrder(token, order);

      const data = response.data;

      if (response.status === 200 && data.razorPayOrderId) {
        //initialize Razorpay payment
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from Razorpay dashboard
          amount: data.amount,
          currency: "INR",
          name: "Online food delivery",
          description: "Test Transaction",
          order_id: data.razorPayOrderId,

          handler: async function (response) {
            if (response) {
              await verifyPayement({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
                .then((res) => {
                  dispatch({ type: "ADD_ORDER", payload: res });
                  dispatch({ type: "CLEAR_CART" });
                  toast.success(
                    "Payment successful! Your order has been placed."
                  );
                  navigate("/orders");
                })
                .catch((err) => {
                  deleteOrderById(data.orderId);
                  toast.error("Payment verification failed. Please try again.");
                });
            }
          },
          prefill: {
            name: data.userDetails.firstName + " " + data.userDetails.lastName,
            email: data.userDetails.email,
            contact:
              data.userDetails.phone &&
              data.userDetails.phone.toString().length === 10
                ? data.userDetails.phone.toString()
                : "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: function () {
              deleteOrderById(data.orderId);
              console.log("Payment dismissed");
              toast.error("Payment dismissed. Please try again.");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        setContactNumber({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
        });
        setDeliveryAddress({
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        });
      } else {
        deleteOrderById(data.orderId);
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <Login />;
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 max-w-6xl dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-3xl font-bold mb-6">Complete Your Purchase</h1>
        <img src={delivery} alt="" className="w-12 h-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
        {/* Delivery Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <div className="flex flex-col md:flex-row md:gap-8 border-t dark:border-gray-700 pt-3 space-y-4 md:space-y-0">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-neutral w-full"
                    name="firstName"
                    value={contactNumber.firstName}
                    onChange={handleContactDetails}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="input input-neutral w-full"
                    value={contactNumber.lastName}
                    onChange={handleContactDetails}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Phone*</label>
                <label className="input validator w-full">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <g fill="none">
                      <path
                        d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                  <input
                    type="tel"
                    className="tabular-nums w-full"
                    required
                    name="phone"
                    value={contactNumber.phone}
                    onChange={handleContactDetails}
                    placeholder="Phone"
                    pattern="[0-9]*"
                    minLength="10"
                    maxLength="10"
                    title="Must be 10 digits"
                  />
                </label>
                <p className="validator-hint text-sm text-gray-500 mt-1">
                  Must be 10 digits
                </p>
              </div>

              {/* Email */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Email*</label>
                <label className="input validator w-full">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    className="w-full"
                    name="email"
                    value={contactNumber.email}
                    onChange={handleContactDetails}
                    required
                  />
                </label>
                <div className="validator-hint hidden text-sm text-gray-500 mt-1">
                  Enter valid email address
                </div>
              </div>
            </div>

            {/* Billing Information Section */}
            <div className="space-y-4 pt-6 border-t dark:border-gray-700">
              <h3 className="text-lg font-medium">Billing Information</h3>

              {/* Address */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">
                  Street Address*
                </label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  className="input input-neutral w-full"
                  value={deliveryAddress.street}
                  onChange={handleAddress}
                  name="street"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row md:gap-8 space-y-4 md:space-y-0">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="input input-neutral w-full"
                    value={deliveryAddress.city}
                    onChange={handleAddress}
                    name="city"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    State/Province*
                  </label>
                  <input
                    type="text"
                    placeholder="State/Province"
                    className="input input-neutral w-full"
                    value={deliveryAddress.state}
                    onChange={handleAddress}
                    name="state"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:gap-8 space-y-4 md:space-y-0">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    ZIP/Postal Code*
                  </label>
                  <input
                    type="text"
                    placeholder="ZIP/Postal Code"
                    className="input input-neutral w-full"
                    value={deliveryAddress.zip}
                    onChange={handleAddress}
                    name="zip"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    Country*
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    className="input input-neutral w-full"
                    value={deliveryAddress.country}
                    onChange={handleAddress}
                    name="country"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="border-t  space-y-2 dark:border-gray-700">
            <div className="flex justify-between">
              <span className="dark:text-gray-300">Subtotal</span>
              <span className="dark:text-gray-300">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="dark:text-gray-300">Tax (10%)</span>
              <span className="dark:text-gray-300">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="dark:text-gray-300">Delivery Fee</span>
              <span className="dark:text-gray-300">
                ₹{deliveryFee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3">
              <span className="dark:text-white">Total</span>
              <span className="dark:text-white">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className={`w-full mt-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              !addressValidation() ||
              !contactValidation() ||
              cartItem.length == 0
                ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
            }`}
            onClick={handlePayment}
            disabled={
              !addressValidation() ||
              !contactValidation() ||
              cartItem.length == 0
            }
          >
            <MdOutlinePayment className="text-xl" />
            Pay ₹{total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
