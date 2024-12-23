import axios from "axios";
import { useEffect, useState } from "react";
import AssignmentCard from "../../components/AssignmentCard";
import Swal from "sweetalert2";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/assignments`
    );
    setAssignments(data);
  };

  console.log(assignments);

  // delete the assignment
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/assignment/${id}`
      );
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
    <div>
      <div>.....................</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
