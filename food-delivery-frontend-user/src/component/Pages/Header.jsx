import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-red-600 p-8 md:p-12 text-white rounded-lg shadow-lg mb-8">
      {" "}
      <div className="container mx-auto flex flex-col md:flex-row items-center relative z-10">
        {/* Left Side - Text Content */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="block">Hungry?</span>
            <span className="text-yellow-200">Get 50% Off</span> On First Order!
          </h1>
          <p className="text-lg mb-6">
            Fast delivery, fresh meals, and endless cravings satisfied.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={"/explore"}>
              <button className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-full font-bold transition cursor-pointer">
                Explore Menu
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side - Food Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5787/5787100.png"
            alt="Delicious Burger"
            className="w-64 h-64 md:w-80 md:h-80 animate-bounce-slow"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
