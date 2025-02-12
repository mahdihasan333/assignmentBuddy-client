import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const MyAttemptedAssignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/marked-assignments/${user?.email}`,
        { withCredentials: true }
      );
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Assignment Buddy | My Attempted Assignments</title>
      </Helmet>

      <div className="w-full mt-8 px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            My Attempted Assignments
          </h2>
          
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
          <table className="min-w-full text-left bg-white dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-6 py-3 text-sm font-medium">Title</th>
                <th className="px-6 py-3 text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-sm font-medium">Total Marks</th>
                <th className="px-6 py-3 text-sm font-medium">Obtained Marks</th>
                <th className="px-6 py-3 text-sm font-medium">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <tr
                    key={assignment._id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">
                      {assignment?.title}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          assignment?.SubmitStatus === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : assignment?.SubmitStatus === "Approved"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {assignment?.SubmitStatus || assignment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {assignment?.marks}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {assignment?.submitMark || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      <span
                        className="tooltip cursor-pointer"
                        title={assignment?.feedback || "No feedback available"}
                      >
                        {assignment?.feedback
                          ? assignment.feedback.length > 10
                            ? assignment.feedback.substring(0, 10) + "..."
                            : assignment.feedback
                          : "No Feedback"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 text-sm"
                  >
                    No attempted assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyAttemptedAssignments;
