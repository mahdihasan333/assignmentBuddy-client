import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateAssignment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const [assignment, setAssignment] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.assignment_title.value;
    const email = form.email.value;
    const deadline = startDate;
    const difficulty = form.difficulty_level.value;
    const imageUrl = form.image_url.value;
    const marks = form.assignment_mark.value;
    const description = form.description.value;

    const formData = {
      title,
      student: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
      deadline,
      difficulty,
      imageUrl,
      marks,
      description,
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/update-assignment/${id}`, formData);

      form.reset();

      Swal.fire({
        title: "Success!",
        text: "Assignment Updated successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });

      navigate("/assignments");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-16 bg-base-200 text-black">
      <section className="p-4 sm:p-8 mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md w-full max-w-4xl">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 capitalize text-center">
          Update an Assignment
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div className="col-span-2">
              <label className="text-gray-700 dark:text-gray-300" htmlFor="assignment_title">
                Assignment Title
              </label>
              <input
                id="assignment_title"
                name="assignment_title"
                type="text"
                defaultValue={assignment?.title}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            <div className="col-span-2">
              <label className="text-gray-700 dark:text-gray-300" htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled={true}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-gray-700 dark:text-gray-300">Assignment Deadline</label>
              <DatePicker
                name="startDate"
                className="border text-black p-2 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-300" htmlFor="difficulty_level">
                Difficulty Level
              </label>
              <select
                name="difficulty_level"
                id="difficulty_level"
                defaultValue={assignment?.difficulty}
                className="border text-black p-2 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="easy">EASY</option>
                <option value="medium">MEDIUM</option>
                <option value="hard">HARD</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-gray-700 dark:text-gray-300" htmlFor="image_url">
                Image URL
              </label>
              <input
                id="image_url"
                name="image_url"
                defaultValue={assignment?.imageUrl}
                type="url"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            <div className="col-span-2">
              <label className="text-gray-700 dark:text-gray-300" htmlFor="assignment_mark">
                Assignment Marks
              </label>
              <input
                id="assignment_mark"
                name="assignment_mark"
                defaultValue={assignment?.marks}
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 dark:text-gray-300" htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring dark:bg-gray-700 dark:text-white dark:border-gray-600"
              name="description"
              id="description"
              defaultValue={assignment?.description}
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button className="w-full sm:w-auto px-8 py-2.5 leading-5 text-white transition-colors duration-300 bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateAssignment;
