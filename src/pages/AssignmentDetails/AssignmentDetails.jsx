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
      userTitle,
      note,
      userId,
      userMarks,
      status: "Pending",
      userName,
      userEmail,
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
    <div className="card my-16 lg:card-side bg-base-100 shadow-xl transform transition-transform hover:scale-105">
      <figure className="w-full lg:w-1/3 overflow-hidden">
        <img
          src={imageUrl}
          alt="Assignment"
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
        />
      </figure>
      <div className="card-body p-6 lg:p-8">
        <h2 className="card-title text-2xl font-bold text-gray-800">{title}</h2>
        {deadline && (
          <p className="text-gray-600 text-sm mt-2">
            <span className="font-semibold">Deadline:</span>{" "}
            {format(new Date(deadline), "P")}
          </p>
        )}
        <p className="mt-4 text-gray-700">{description}</p>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700">
            Buyer Details:
          </h3>
          <div className="flex items-center gap-4 mt-3">
            <div>
              <p className="text-sm text-gray-600">Name: {student?.name}</p>
              <p className="text-sm text-gray-600">Email: {student?.email}</p>
            </div>
            <div className="rounded-full overflow-hidden w-14 h-14">
              <img
                referrerPolicy="no-referrer"
                src={student?.photo}
                alt="Student"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="card-actions justify-end mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary shadow-md hover:shadow-lg hover:bg-blue-700 transition-colors"
          >
            Take Assignment
          </button>
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
                  className="textarea textarea-bordered"
                  name="note"
                  required
                ></textarea>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
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
