import React from "react";

const Faq = () => {
  return (
    <div className="w-11/12 mx-auto py-16 text-black dark:bg-gray-900 dark:text-white">
      <div className="text-center space-y-5 mb-9">
        <h1 className="text-4xl font-bold">
          Frequently Asked Questions (FAQ)
        </h1>
        <p>
          Everything You Need to Know About Our Online Group Study Platform
        </p>
      </div>
      <div className="divider dark:border-b"></div>

      <div className="collapse collapse-plus text-black dark:bg-gray-900 dark:text-white">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          What is this platform about?
        </div>
        <div className="collapse-content">
          <p>
            Our platform is designed to facilitate online group study with
            friends. Users can create, submit, and evaluate assignments, making
            learning collaborative and fun.
          </p>
        </div>
      </div>
      <div className="divider dark:border-b"></div>

      <div className="collapse collapse-plus text-black dark:bg-gray-900 dark:text-white">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          How do I register for an account?
        </div>
        <div className="collapse-content">
          <p>
            Click on the "Register" button, fill in your name, email, password,
            and profile picture URL, and follow the instructions. Ensure your
            password meets the requirements.
          </p>
        </div>
      </div>
      <div className="divider dark:border-b"></div>

      <div className="collapse collapse-plus text-black dark:bg-gray-900 dark:text-white">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          Are private routes secure?
        </div>
        <div className="collapse-content">
          <p>
            Yes, private routes are protected with JWT authentication to ensure
            only authorized users can access them.
          </p>
        </div>
      </div>
      <div className="divider dark:border-b"></div>

      <div className="collapse collapse-plus text-black dark:bg-gray-900 dark:text-white">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          Can I access the platform without registering?
        </div>
        <div className="collapse-content">
          <p>
            You can browse the public pages like the home page and assignment
            list, but you need to register and log in to access private
            features.
          </p>
        </div>
      </div>
      <div className="divider dark:border-b"></div>

      <div className="collapse collapse-plus text-black dark:bg-gray-900 dark:text-white">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          How do I update an assignment?
        </div>
        <div className="collapse-content">
          <p>
            Click the update button on the assignment card. The form will
            auto-fill with current data for you to edit and resubmit.
          </p>
        </div>
      </div>
      <div className="divider dark:border-b"></div>
    </div>
  );
};

export default Faq;
