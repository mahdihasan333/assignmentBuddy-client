import Swal from "sweetalert2";
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
        handleDelete(id);
      }
    });
  };

  return (
    <div className="card bg-blue-100 dark:bg-base-800 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-black dark:bg-indigo-400 dark:text-white">
      <figure className="relative overflow-hidden p-4">
        <img
          src={imageUrl}
          alt="Assignment Cover"
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>

        <p className="text-gray-700 dark:text-white mt-2 text-sm line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-10 mt-2 text-gray-700 dark:text-white">
          <p className="font-medium">
            Marks: {marks}
          </p>
          <p className="font-medium">
            Difficulty: {difficulty}
          </p>
        </div>

        <div className="card-actions mt-4 flex flex-wrap gap-3">
          <Link to={`/assignment/${_id}`}>
            <button className="btn btn-primary hover:bg-blue-700 dark:hover:bg-blue-800 transition-all">
              See More
            </button>
          </Link>
          <Link to={`/update/${_id}`}>
            <button className="btn btn-secondary hover:bg-green-600 dark:hover:bg-green-700 transition-all">
              Update
            </button>
          </Link>
          <button
            onClick={() => confirmDelete(_id)}
            className="btn btn-error hover:bg-red-700 dark:hover:bg-red-800 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
