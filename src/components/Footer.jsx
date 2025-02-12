import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"; // You can use icons like these for social links

const Footer = ({ isDarkMode }) => {
  return (
    <footer
      className={`w-full pt-10 py-8 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} text-white`}
    >
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Text */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-3xl font-bold text-green-500">Assignment Buddy</h1>
          <p className="mt-2 text-sm text-gray-400">Your ultimate assignment assistant</p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center md:text-left">
          <Link to="/" className="text-gray-400 hover:text-gray-300">Home</Link>
          <Link to="/assignments" className="text-gray-400 hover:text-gray-300">Assignments</Link>

          <Link to="/contact" className="text-gray-400 hover:text-gray-300">Contact</Link>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mt-4 md:mt-0 justify-center">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-gray-400 hover:text-gray-300 text-2xl" />
          </a>
          <a href="https://github.com/mahdihasan333" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-400 hover:text-gray-300 text-2xl" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-gray-400 hover:text-gray-300 text-2xl" />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Assignment Buddy. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
