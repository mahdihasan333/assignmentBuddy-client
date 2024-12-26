import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AssignmentCard from "../../components/AssignmentCard";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Assignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/all-assignments?filter=${filter}&search=${search}`
      );
      setAssignments(data);
    };
    fetchAssignments();
  }, [filter, search]);

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/assignments`
      );
      setAssignments(data);
    } catch (error) {
      console.error(error);
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
    <div className="py-16 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Learn & Grade Together</h2>
        <p className="mt-4 text-lg">
          Bringing friends together to create, manage, and evaluate assignments
          while fostering a community of learning.
        </p>
      </div>

      <div className="flex my-10 flex-col md:flex-row justify-center items-center gap-5 ">
        <div className="">
          <select
            name="category"
            id="category"
            className="border p-4 rounded-lg dark:bg-gray-900 dark:text-white"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="">Filter By Difficulty</option>
            <option value="easy">EASY</option>
            <option value="medium">MEDIUM</option>
            <option value="hard">HARD</option>
          </select>
        </div>

        <form>
          <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Enter Assignment Title"
              aria-label="Enter Assignment Title"
            />

            <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
        </form>

        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            handleDelete={handleDelete}
            assignment={assignment}
          />
        ))}
      </div>
    </div>
  );
};

export default Assignments;
