import Swal from "sweetalert2";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const AssignmentCard = ({ assignment, handleDelete }) => {
  const { user } = useContext(AuthContext);
  const {
    _id,
    title,
    deadline,
    difficulty,
    student,
    imageUrl,
    marks,
    description,
  } = assignment || {};

  console.log(student)

  const confirmDelete = (id) => {
    if (user?.email !== student?.email)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Action not Permitted",
      });

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id); // Call the delete handler if confirmed
        Swal.fire("Deleted!", "The assignment has been deleted.", "success");
      }
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
      <figure className="relative overflow-hidden p-4">
        <img
          src={imageUrl}
          alt="Assignment Cover"
          className="w-full rounded-2xl h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">
          Deadline: {format(new Date(deadline), "P")}
        </p>
        <div className="flex items-center gap-10 mt-2 text-gray-700">
          <p className="font-medium">
            <span className="text-gray-900">Marks:</span> {marks}
          </p>
          <p className="font-medium">
            <span className="text-gray-900">Difficulty:</span> {difficulty}
          </p>
        </div>
        <p className="mt-3 text-gray-600 line-clamp-3">{description}</p>

        <div className="card-actions mt-4 flex gap-3">
          <Link to={`/assignment/${_id}`}>
            <button className="btn btn-primary hover:bg-blue-700 transition-all">
              View Assignment
            </button>
          </Link>
          <Link to={`/update/${_id}`}>
            <button className="btn btn-secondary hover:bg-green-600 transition-all">
              Update
            </button>
          </Link>
          <button
            onClick={() => confirmDelete(_id)}
            className="btn btn-error hover:bg-red-700 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
