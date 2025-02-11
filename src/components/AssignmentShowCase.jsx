import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AssignmentShowcase = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/assignments`
        );
        setAssignments(data.slice(0, 3)); 
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
      setLoading(false);
    };
    fetchAssignments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-16 p-6 text-center">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">
        Recent Assignments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-lg text-gray-500 dark:text-gray-300">
            Loading assignments...
          </p>
        ) : assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg text-left"
            >
              <h3 className="text-xl font-semibold dark:text-white">
                {assignment.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 my-2">
                {assignment.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Due: {assignment.dueDate}
              </p>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500 dark:text-gray-300">
            No assignments available.
          </p>
        )}
      </div>
      <Link to="/assignments">
        <button className="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600">
          View All Assignments
        </button>
      </Link>
    </div>
  );
};

export default AssignmentShowcase;
