import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AssignmentCard from "../../components/AssignmentCard";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Assignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

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
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div className="py-16 bg-white text-black dark:bg-gray-900 dark:text-gray-100">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Learn & Grade Together</h2>
        <p className="mt-4 text-lg">
          Bringing friends together to create, manage, and evaluate assignments
          while fostering a community of learning.
        </p>
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
