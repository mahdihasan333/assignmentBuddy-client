import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

const Main = () => {
  return (
    <div className="">
      {/* Navbar */}
      <Navbar />
      {/* outlet */}
      <div className="w-11/12 mx-auto min-h-[calc(100vh-270px)]">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Main;
