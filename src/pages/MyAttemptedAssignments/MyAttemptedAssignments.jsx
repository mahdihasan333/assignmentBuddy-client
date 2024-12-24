import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const MyAttemptedAssignments = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, [user]);

  const fetchAssignments = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/marked-assignments/${user?.email}`
    );
    setAssignments(data);
    console.log(data);
  };

  console.log(assignments);

  return (
    <div className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800">
          My Attempted Assignments
        </h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {assignments?.length} assignment
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Status</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Assignment Marks</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Obtained Marks
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Feedback
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {/* Generate dynamic tr */}
                  {assignments.map((assignment) => (
                    <tr key={assignment._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {assignment.userTitle}
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className={`px-3 py-1  ${
                              assignment.userStatus === "Pending" &&
                              "text-yellow-500 bg-blue-100/60"
                            } 
                            ${
                              assignment.userStatus === "Completed" &&
                              "text-green-500 bg-green-100/60"
                            }
                            
                            text-xs  rounded-full`}
                          >
                            {assignment.userStatus}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {assignment.userMarks}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {assignment.submitMark}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {assignment?.feedback.substring(0, 5)}...
                        {/* {job?.description.substring(0, 18)}... */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttemptedAssignments;
