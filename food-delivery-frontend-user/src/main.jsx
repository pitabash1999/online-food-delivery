import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./store/ContextProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </ContextProvider>
  </BrowserRouter>
);
