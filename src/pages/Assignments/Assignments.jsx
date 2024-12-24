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
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/assignments`
    );
    setAssignments(data);
  };


  // delete the assignment
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/assignment/${id}`
      );

      if (user?.email !== assignments[0]?.student?.email)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Action forbidden`,
        });

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
