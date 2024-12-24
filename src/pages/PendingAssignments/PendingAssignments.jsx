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

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user-assignment`
    );
    setAssignments(data);
    console.log(data);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmitMarking = async (e) => {
    e.preventDefault();

    const form = e.target;
    const submitMark = form.submit_marks.value;
    console.log(submitMark);
    const feedback = form.feedback.value;
    const userTitle = assignments[0]?.userTitle;
    const userMarks = assignments[0]?.userMarks;
    console.log(userMarks);
    const userEmail = assignments[0]?.userEmail;
    const userStatus = assignments[0]?.status;

    // if (submitMark > userMarks)
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: `Action forbidden!`,
    //   });

    if (user?.email === userEmail)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot mark your own assignment.",
      });

    // Check submitMark is greater than userMarks
    // if (submitMark > userMarks) {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "You cannot give more marks than the original marks.",
    //   });
    // }

    const markedAssignment = {
      submitMark,
      feedback,
      userTitle,
      userMarks,
      userStatus,
      userEmail,
    };

    try {
      // server site post request
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/marked-assignment`,
        markedAssignment
      );

      // reset form
      form.reset();

      // show sweet alert and navigate to assignments page
      Swal.fire({
        title: "Success!",
        text: "User Assignment Added successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      console.log(data);

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
                    <tr key={assignment._id}>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {assignment.userTitle}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {assignment?.userMarks}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {assignment?.userName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <span>{assignment?.status}</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <button
                          className="text-blue-600 underline"
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
            className="bg-white p-6 rounded-lg w-96"
            onSubmit={handleSubmitMarking}
          >
            <h3 className="text-lg font-medium text-gray-800">
              Mark Assignment
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Title:</strong> {assignments[0]?.userTitle}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Notes:</strong> {assignments[0]?.note}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Marks:</strong> {assignments[0]?.userMarks}
            </p>
            <a
              href={assignments[0]?.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block"
            >
              View Google Docs
            </a>

            {/* Marks input */}
            <div className="mt-4">
              <label
                htmlFor="marks"
                className="block text-sm font-medium text-gray-700"
              >
                Marks
              </label>
              <input
                id="marks"
                name="submit_marks"
                type="number"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Feedback input */}
            <div className="mt-4">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700"
              >
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                className="w-full px-3 py-2 border rounded-md"
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
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
