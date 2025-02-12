import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const Contact = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to an API or email)
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Assignment Buddy | Contact</title>
      </Helmet>
      <section
        className={`w-full mt-8 py-16 px-6 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        } text-white`}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-500">Contact Me</h2>
          <p className="mt-2 text-lg text-gray-400">
            Feel free to reach out to me with any questions!
          </p>

          {/* Contact Form */}
          <div className="mt-8 max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Name */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="name"
                    className="text-gray-700 dark:text-black text-sm font-semibold mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="email"
                    className="text-gray-700 dark:text-black text-sm font-semibold mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mt-6">
                {/* Phone Number */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="phone"
                    className="text-gray-700 dark:text-black text-sm font-semibold mb-2"
                  >
                    Your Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="subject"
                    className="text-gray-700 dark:text-black text-sm font-semibold mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col mt-6">
                <label
                  htmlFor="message"
                  className="text-gray-700 dark:text-black text-sm font-semibold mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 h-40 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 w-full bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
