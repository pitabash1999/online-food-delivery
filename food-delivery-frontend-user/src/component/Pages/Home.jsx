import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Category from "./Category";

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <Category />
      <Footer />
    </div>
  );
};

export default Home;
