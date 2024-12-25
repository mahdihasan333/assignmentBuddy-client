import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { ThemeContext } from "../../providers/ThemeProvider";

const Main = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === "dark" ? "dark" : ""} dark:bg-gray-900 w-full`}>
      {/* Navbar */}
      <Navbar />
      {/* outlet */}
      <div className="min-h-[calc(100vh-270px)]">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Main;
