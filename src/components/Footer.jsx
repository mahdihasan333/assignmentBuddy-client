import React from "react";
import { FaGithub, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content dark:bg-black dark:text-gray-100 py-8">
      <div className="container mx-auto flex flex-wrap justify-between items-start px-4 space-y-6 sm:space-y-0">
        {/* About Section */}
        <div className="w-full sm:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Group Study Hub</h3>
          <p className="text-sm">
            Collaborate, learn, and grow together. Build assignments, grade, and
            study with friends seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full sm:w-1/3">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="list-none space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/assignments" className="hover:underline">
                Assignments
              </a>
            </li>
            <li>
              <a href="/my-assignments" className="hover:underline">
                My Assignments
              </a>
            </li>
            <li>
              <a href="/create-assignment" className="hover:underline">
                Create Assignment
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div className="w-full sm:w-1/3">
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <ul className="list-none space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <FaGithub className="text-xl" />
                <span>GitHub</span>
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <FaTwitter className="text-xl" />
                <span>Twitter</span>
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <FaInstagram className="text-xl" />
                <span>Instagram</span>
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <FaFacebook className="text-xl" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:assignmentbuddy@gmail.com"
                className="hover:underline"
              >
                Email: assignmentbuddy@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
