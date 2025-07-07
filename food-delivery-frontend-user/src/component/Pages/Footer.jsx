import { Link } from "react-router-dom";
import { getContext } from "../../store/ContextProvider";

const Footer = () => {
  const { state, token } = getContext();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-400">FoodExpress</h3>
            <p className="text-gray-300">
              Delicious meals delivered to your doorstep in minutes.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-orange-400 text-xl"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-orange-400 text-xl"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-orange-400 text-xl"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to={"/"} className="text-gray-300 hover:text-orange-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/explore"}
                  className="text-gray-300 hover:text-orange-400"
                >
                  Menu
                </Link>
              </li>

              <li>
                <a href="#" className="text-gray-300 hover:text-orange-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-orange-400"></i>
                123 Food Street, City
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2 text-orange-400"></i>
                +1 234 567 890
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-orange-400"></i>
                hello@foodexpress.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {!token && (
            <div className="flex flex-col gap-2 items-center justify-center">
              <p>Don't have an account ?</p>
              <button>
                <Link
                  to={"/signup"}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Sign Up
                </Link>
              </button>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} FoodExpress. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
