import { useState } from "react";
import login from "../../assets/login-banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FoodContext } from "../../store/ContextProvider";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
// import Home from "../Pages/Home";

const Login = () => {
  const navigate = useNavigate();
  const { state, token } = FoodContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //handle form data
  const handleFome = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await state.userLogin(formData);
      formData.email = "";
      formData.password = "";
      navigate("/");
      toast.success("Welcome back !");
    } catch (error) {
      toast.error("Failed to login, please try again.");
    }
  };

  // if (token) return <Home />;
  return (
    <div className="flex items-center justify-center mt-3 min-h-screen fixed inset-0">
      <div className="flex flex-col md:flex-row w-full max-w-2xl rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 ">
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={login}
            alt="Login visual"
            className="w-full h-full rounded-xl"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 w-full p-6 sm:p-8 text-gray-800 dark:text-gray-200">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Please login to your account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFome}
                className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300 relative"
              >
                Password
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 top-9 text-gray-500 text-xl font-semibold cursor-pointer"
                >
                  {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </button>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFome}
                className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
