import { getContext } from "../../store/ContextProvider";
import { Link } from "react-router-dom";
import CartList from "./CartList";
import Login from "../Auth/Login";
import empty from "../../assets/empty.png";

const Cart = () => {
  const { state, quantity, token } = getContext();

  //filter items that are to be in cart
  const cartItems = state.list.filter((item) => quantity[item.id] > 0);

  // Calculate total price
  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * quantity[item.id];
  }, 0);

  if (!token) return <Login />;
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {cartItems.length === 0 ? (
        <div className="hero min-h-screen bg-base-200 fixed inset-0">
          <div className="hero-content flex-col lg:flex-row-reverse gap-10">
            <img
              src={empty}
              className="max-w-sm rounded-lg shadow-2xl w-64 h-64"
              alt="Empty cart"
            />
            <div>
              <h1 className="text-5xl font-bold">Your Cart is Empty</h1>
              <p className="py-6">
                It seems you haven't added any items to your cart yet.
              </p>
              <Link to="/explore" className="btn btn-primary">
                Explore Foods
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <CartList key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Subtotal</span>
              <span className="text-lg font-bold">${cartTotal}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link to="/explore" className="btn btn-outline flex-1">
                Continue Shopping
              </Link>
              <Link to={"/checkout"} className="btn btn-primary flex-1">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
