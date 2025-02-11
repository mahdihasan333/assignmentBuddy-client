import { Link } from "react-router-dom";

const Slide = ({ image, text }) => {
  return (
    <div
      className="relative w-full h-[38rem] bg-center bg-cover"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="text-center px-4">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
            {text}
          </h1>
          <Link
            to="/assignments"
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white transition duration-300 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            All Assignment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
