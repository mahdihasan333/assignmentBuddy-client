import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content py-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        {/* About Section */}
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold">Group Study Hub</h3>
          <p className="text-sm">
            Collaborate, learn, and grow together. Build assignments, grade, and
            study with friends seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
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
            <li>
              <a
                href="https://github.com/mahdihasan333"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="mailto:mahdioffi333@gmail.com"
                className="hover:underline"
              >
                Email: mahdioffi333@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
