import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PendingAssignments = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [assignments, setAssignments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null); // Track selected assignment

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-assignment`
      );
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleOpenModal = (assignment) => {
    setSelectedAssignment(assignment); // Set the selected assignment
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAssignment(null); // Reset selected assignment when closing modal
  };

  const handleSubmitMarking = async (e) => {
    e.preventDefault();

    const form = e.target;
    const submitMark = form.submit_marks.value;
    const feedback = form.feedback.value;

    if (user?.email === selectedAssignment?.userEmail) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot mark your own assignment.",
      });
    }

    const markedAssignment = {
      submitMark,
      feedback,
      userTitle: selectedAssignment?.userTitle,
      userMarks: selectedAssignment?.userMarks,
      userStatus: selectedAssignment?.status,
      userEmail: selectedAssignment?.userEmail,
      MarkedPersonEmail: user?.student?.email,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/marked-assignments`,
        markedAssignment
      );

      form.reset();

      Swal.fire({
        title: "Success!",
        text: "Marked Assignment Added successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });

      navigate("/assignments");
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
    <div className="px-4 mx-auto py-16 dark:bg-gray-900 dark:text-white">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          My Pending Assignments
        </h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 dark:text-white rounded-full">
          {assignments.length} assignments
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500 dark:text-white">
                      Title
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500 dark:text-white">
                      Marks
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500 dark:text-white">
                      Examinee Name
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500 dark:text-white">
                      Status
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                  {assignments.map((assignment) => (
                    <tr key={assignment._id}>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-white">
                        {assignment.userTitle}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-white">
                        {assignment?.userMarks}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-white">
                        {assignment?.userName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-white">
                        <span>{assignment?.status}</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-white">
                        <button
                          className="text-blue-600 underline dark:text-blue-400"
                          onClick={() => handleOpenModal(assignment)}
                        >
                          Give Mark
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form
            className="bg-white p-6 rounded-lg w-96 dark:bg-gray-700"
            onSubmit={handleSubmitMarking}
          >
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Mark Assignment
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-white">
              <strong>Title:</strong> {selectedAssignment?.userTitle}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-white">
              <strong>Notes:</strong> {selectedAssignment?.note}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-white">
              <strong>Marks:</strong> {selectedAssignment?.userMarks}
            </p>
            <a
              href={selectedAssignment?.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block dark:text-blue-400"
            >
              View Google Docs
            </a>

            {/* Marks input */}
            <div className="mt-4">
              <label
                htmlFor="marks"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Marks
              </label>
              <input
                id="marks"
                name="submit_marks"
                type="number"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-600 dark:text-white dark:border-gray-500"
                required
              />
            </div>

            {/* Feedback input */}
            <div className="mt-4">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-600 dark:text-white dark:border-gray-500"
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md dark:bg-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PendingAssignments;
