import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AssignmentDetails = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");
  const [quickNote, setQuickNote] = useState("");

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const payload = {
    //     assignmentId: id,
    //     submissionLink,
    //     quickNote,
    //   };
    //   await axios.post(
    //     `${import.meta.env.VITE_API_URL}/submit-assignment`,
    //     payload
    //   );
    //   Swal.fire({
    //     title: "Success!",
    //     text: "Assignment Deleted successfully",
    //     icon: "success",
    //     confirmButtonText: "Ok",
    //   });
    //   setIsModalOpen(false);
    //   setSubmissionLink("");
    //   setQuickNote("");
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: `${error.message}`,
    //   });
    // }
  };

  const { _id, title, deadline, difficulty, imageUrl, marks, description } =
    assignment || {};

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={imageUrl} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {deadline && <p>Deadline: {format(new Date(deadline), "P")}</p>}
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
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
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
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
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
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
