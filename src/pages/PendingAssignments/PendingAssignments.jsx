import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import PendingTable from "../../components/PendingTable";

const PendingAssignments = () => {
  const { user } = useContext(AuthContext);

  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user-assignment`
    );
    setAssignments(data);
  };
  console.log(assignments);

  const handleOpenModal = (assignment) => {
    setSelectedAssignment(assignment);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedAssignment(null);
    setModalVisible(false);
    setMarks("");
    setFeedback("");
  };

  const handleSubmitMarking = async () => {
    if (!marks || !feedback) {
      alert("Please provide both marks and feedback.");
      return;
    }

    //
  };

  return (
    <div className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800">
          My Pending Assignments
        </h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {assignments.length} assignments
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Title
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Marks
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Examinee Name
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <PendingTable
                      key={assignment._id}
                      assignment={assignment}
                    />
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
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium text-gray-800">
              Mark Assignment
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Title:</strong> {selectedAssignment?.title}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Notes:</strong> {selectedAssignment?.notes}
            </p>
            <a
              href={selectedAssignment?.googleDocsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block"
            >
              View Google Docs
            </a>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Marks
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-md"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Feedback
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
                onClick={handleSubmitMarking}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAssignments;
