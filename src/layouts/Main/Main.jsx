import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

const Main = () => {
  return (
    <div className="w-11/12 mx-auto">
      {/* Navbar */}
      <Navbar />
      {/* outlet */}
      <div className="min-h-[calc(100vh-306px)]">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Main;
