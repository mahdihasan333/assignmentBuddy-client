import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
          Oops! Page not found
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Sorry, the page you are looking for does not exist. It might have been
          moved or deleted.
        </p>

        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            Go Back
          </button>
          <Link
            to="/"
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Take Me Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
