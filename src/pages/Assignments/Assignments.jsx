import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AssignmentCard from "../../components/AssignmentCard";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet-async";

const Assignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/all-assignments?filter=${filter}&search=${search}`
        );
        setAssignments(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchAssignments();
  }, [filter, search]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/assignments`
      );
      setAssignments(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Delete the assignment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/assignment/${id}`);
      Swal.fire({
        title: "Success!",
        text: "Assignment Deleted successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      fetchAssignments();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  const handleReset = () => {
    setFilter("");
    setSearch("");
  };

  return (
    <>
      <Helmet>
        <title>Assignment Buddy | Assignments</title>
      </Helmet>

      <div className="py-16 mt-8 bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Learn & Grade Together</h2>
          <p className="mt-4 text-lg">
            Bringing friends together to create, manage, and evaluate
            assignments while fostering a community of learning.
          </p>
        </div>

        {/* Filter & Search Section */}
        <div className="flex my-10 flex-col md:flex-row justify-center items-center gap-5 w-11/12 mx-auto">
          <select
            name="category"
            id="category"
            className="border p-4 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white transition-all duration-300"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="">Filter By Difficulty</option>
            <option value="easy">EASY</option>
            <option value="medium">MEDIUM</option>
            <option value="hard">HARD</option>
          </select>

          <form className="w-full max-w-sm">
            <div className="flex p-1 overflow-hidden border rounded-lg dark:bg-gray-800 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300 transition-all duration-300">
              <input
                className="flex-1 px-4 py-2 text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 outline-none"
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Enter Assignment Title"
                aria-label="Enter Assignment Title"
              />

              <button className="px-4 py-2 text-sm font-medium text-white uppercase bg-green-500 rounded-md hover:bg-blue-500 transition-all duration-300">
                Search
              </button>
            </div>
          </form>

          <button
            onClick={handleReset}
            className="px-4 py-2 font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Reset
          </button>
        </div>

        {/* Assignment Cards Section */}
        <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {loading ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 flex justify-center">
              <Spinner />
            </div>
          ) : assignments.length > 0 ? (
            assignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                handleDelete={handleDelete}
                assignment={assignment}
              />
            ))
          ) : (
            <p className="text-center text-lg col-span-full text-gray-600 dark:text-gray-300">
              No assignments found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Assignments;
