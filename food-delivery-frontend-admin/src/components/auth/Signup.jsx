import { useState } from "react";
import signup from "../../assets/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FoodContext } from "../../store/ContextProvider";
import toast from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { deleteUserById, verifyOTP } from "../../Utils/Api";

const SignUp = () => {
  const [loading, setLoading] = useState();
  const [respData, setRespData] = useState({
    otp: "",
    userId: "",
  });
  const navigate = useNavigate();
  const { state } = FoodContext();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await state.registration(formData);
      setRespData((prev) => ({
        ...prev,
        userId: response.id,
      }));
      //setOtpPage(true);
      setTimeout(() => {
        const modal = document.getElementById("my_modal_5");
        if (modal) modal.showModal();
      }, 0);
    } catch (error) {
      toast.error("Failed to register user ");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyOTP(respData);
      if (response) {
        toast.success("User registered successfully");
        navigate("/login");
      } else {
        deleteUserById(respData.userId);
        toast.error("Invalid OTP, please try again");
        const modal = document.getElementById("my_modal_5");
        if (modal) modal.close();
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to verify OTP");
      deleteUserById(respData.userId);
      const modal = document.getElementById("my_modal_5");
      if (modal) modal.close();
    }
  };

  return (
    <div className="flex items-center justify-center mt-3 min-h-screen fixed inset-2">
      <div className="flex flex-col md:flex-row w-full max-w-2xl rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 p-2 mt-6">
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={signup}
            alt="Login visual"
            className="w-full h-full rounded-xl"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 w-full p-6 sm:p-8 text-gray-800 dark:text-gray-200">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Register</h1>
          </div>

          <form className="space-y-5" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="text"
                name="name"
                value={formData.name}
                onChange={formHandler}
                className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Full Name"
                required
              />
            </div>
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
                onChange={formHandler}
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
                onChange={formHandler}
                className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Already have an account ?{" "}
              {/* <Link to={"/login"} className="text-blue-600 hover:underline">
                Login
              </Link> */}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
      {
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <p className="py-4">Enter OTP sent to Super Admin</p>
            <div className="modal-action">
              <form
                method="dialog"
                className="flex flex-col gap-4 w-full"
                onSubmit={handleOtpSubmit}
              >
                <input
                  type="text"
                  name="otp"
                  value={respData.otp}
                  onChange={(e) =>
                    setRespData({ ...respData, otp: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="OTP"
                  required
                />
                <button className="btn btn-info">Submit</button>
              </form>
            </div>
          </div>
        </dialog>
      }
    </div>
  );
};

export default SignUp;
