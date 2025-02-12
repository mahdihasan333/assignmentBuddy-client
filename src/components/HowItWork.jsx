import React from "react";
import { FaClipboardList, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    title: "Create Assignments",
    description: "Easily create assignments with a title, description, marks, and due date.",
    icon: <FaClipboardList className="text-blue-500 dark:text-blue-400 text-5xl" />,
  },
  {
    title: "Submit Assignments",
    description: "Students can submit their completed assignments effortlessly.",
    icon: <FaPaperPlane className="text-green-500 dark:text-green-400 text-5xl" />,
  },
  {
    title: "Evaluate & Feedback",
    description: "Review submissions, provide feedback, and assign grades.",
    icon: <FaCheckCircle className="text-yellow-500 dark:text-yellow-400 text-5xl" />,
  },
];

const HowItWorks = ({ isDarkMode }) => {
  return (
    <div className="w-11/12 mx-auto my-16 text-center">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-6 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 ${
              isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
            } rounded-lg flex flex-col items-center text-center`}
          >
            {step.icon}
            <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
            <p className="mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
