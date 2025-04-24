import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const AssignmentDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [assignment, setAssignment] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAssignmentData();
  }, [id]);

  const fetchAssignmentData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/assignment/${id}`
    );
    setAssignment(data);
    setStartDate(new Date(data.deadline));
  };
  const assignmentCreator = assignment?.student?.email;

  const {
    _id,
    title,
    deadline,
    difficulty,
    imageUrl,
    marks,
    description,
    student,
  } = assignment || {};

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const docs = form.docs.value;
    const note = form.note.value;
    const userName = user?.displayName;
    const userEmail = user?.email;
    const userTitle = title;
    const userMarks = marks;
    const userId = _id;

    if (user?.email === student?.email)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Action not Permitted",
      });

    const userAssignmentData = {
      docs,
      title,
      note,
      userId,
      marks,
      status: "Pending",
      userName,
      userEmail,
      assignmentCreator,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-user`,
        userAssignmentData
      );
      form.reset();

      Swal.fire({
        title: "Success!",
        text: "User Assignment Added successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/pendingAssignments");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto py-8 mt-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <figure className="w-full p-4 ">
          <img
            src={imageUrl}
            alt="Assignment picture"
            className="w-full rounded-2xl h-full object-cover object-center transition-transform duration-300 hover:scale-110"
          />
        </figure>

        <div className="card-body p-6 lg:p-8 bg-gray-200 dark:bg-cyan-900 dark:text-white shadow-xl rounded-lg">
          <h2 className="card-title text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
          {deadline && (
            <p className="text-gray-600 dark:text-white text-sm mt-2">
              <span className="font-semibold">Deadline:</span>{" "}
              {format(new Date(deadline), "P")}
            </p>
          )}
          <div className="flex items-center gap-10 mt-2 text-gray-700 dark:text-white">
            <p className="font-medium">
              <span className="text-gray-900 dark:text-white">Marks:</span>{" "}
              {marks}
            </p>
            <p className="font-medium">
              <span className="text-gray-900 dark:text-white">Difficulty:</span>{" "}
              {difficulty}
            </p>
          </div>
          <p className="mt-4 dark:text-white text-gray-700">{description}</p>

          <div className="mt-6 max-w-fit border-2 p-4">
            <h3 className="text-sm dark:text-white font-semibold text-gray-700">
              Assignment Creator Details:
            </h3>
            <div className="flex items-center gap-4 mt-3">
              <div>
                <p className="text-sm dark:text-white text-gray-600">Name: {student?.name}</p>
                <p className="text-sm dark:text-white text-gray-600">Email: {student?.email}</p>
              </div>
              {/* Hide the image on mobile */}
              <div className="hidden lg:block rounded-full overflow-hidden w-14 h-14">
                <img
                  referrerPolicy="no-referrer"
                  src={student?.photo}
                  alt="Student picture"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="card-actions justify-end mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn bg-green-500 shadow-md hover:shadow-lg hover:bg-green-700 transition-colors"
            >
              Take Assignment
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Submit Assignment</h3>
            <form onSubmit={handleFormSubmit} className="mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Google Docs Link</span>
                </label>
                <input
                  type="url"
                  placeholder="Enter Google Docs link"
                  className="input input-bordered"
                  name="docs"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Quick Note</span>
                </label>
                <textarea
                  placeholder="Enter a quick note"
                  className="textarea text-black textarea-bordered"
                  name="note"
                  required
                ></textarea>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn bg-green-500">
                  Submit Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentDetails;
