import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PendingAssignments = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user-assignment`);
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <>
      <Helmet>
        <title>Assignment Buddy | Pending Assignments</title>
      </Helmet>

      <div className="w-11/12 mt-8 mx-auto py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          My Pending Assignments
        </h2>

        {/* Responsive Table */}
        <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
          <table className="w-full min-w-max text-left bg-white dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3 text-sm font-medium">Title</th>
                <th className="px-4 py-3 text-sm font-medium">Marks</th>
                <th className="px-4 py-3 text-sm font-medium">Examinee</th>
                <th className="px-4 py-3 text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr
                  key={assignment._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
                    {assignment?.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                    {assignment?.marks}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                    {assignment?.userName}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        assignment?.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : assignment?.status === "Approved"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {assignment?.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      className="text-blue-600 underline dark:text-blue-400"
                      onClick={handleOpenModal}
                    >
                      Give Mark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form
              className="bg-white p-6 rounded-lg w-96 dark:bg-gray-700"
              onSubmit={() => {}}
            >
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Mark Assignment
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-white">
                <strong>Title:</strong> {assignments[0]?.title}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-white">
                <strong>Marks:</strong> {assignments[0]?.marks}
              </p>
              <a
                href={assignments[0]?.docs}
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
    </>
  );
};

export default PendingAssignments;
