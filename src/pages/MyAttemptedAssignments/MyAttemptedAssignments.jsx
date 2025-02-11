import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const MyAttemptedAssignments = () => {
  const { user } = useContext(AuthContext);

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/marked-assignments/${user?.email}`, {withCredentials: true}
      );
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };
  console.log(assignments)


  return (
    <div className="w-11/12 px-10 mx-auto py-12">
      <div className="text-black dark:bg-gray-900 dark:text-white flex items-center gap-x-3">
        <h2 className="text-lg font-medium dark:text-white">
          My Attempted Assignments
        </h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {assignments?.length} assignment
        </span>
      </div>

      <div className="text-black dark:bg-gray-900 dark:text-white flex flex-col pt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-800 dark:text-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right dark:text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right dark:text-white"
                    >
                      <span>Status</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right dark:text-white"
                    >
                      <span>Assignment Marks</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right dark:text-white"
                    >
                      Obtained Marks
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right dark:text-white"
                    >
                      Feedback
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                  {assignments.map((assignment) => (
                    <tr key={assignment._id}>
                      <td className="px-4 py-4 text-sm dark:text-white whitespace-nowrap">
                        {assignment?.title}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p>
                            {assignment?.SubmitStatus ? assignment.SubmitStatus : assignment.status}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm dark:text-white whitespace-nowrap">
                        {assignment?.marks}
                      </td>
                      <td className="px-4 py-4 text-sm dark:text-white whitespace-nowrap">
                        {assignment?.submitMark}
                      </td>
                      <td className="px-4 py-4 text-sm dark:text-white whitespace-nowrap">
                        {assignment?.feedback?.substring(0, 5)}...
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
