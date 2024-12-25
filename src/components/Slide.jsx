import { Link } from "react-router-dom";

const Slide = ({ image, text }) => {
  return (
    <div
      className="w-full bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
        <div className="text-center px-4">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
            {text}
          </h1>
          <Link
            to="/assignments"
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white transition duration-300 transform bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Post Job & Hire Expert
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
