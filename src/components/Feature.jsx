import React from "react";

const Features = () => {
  return (
    <section className="py-12 text-black">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold dark:text-white mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Create Assignments</h3>
            <p className="text-sm">
              Easily create assignments with due dates, difficulty levels, and
              thumbnail images
            </p>
          </div>

          <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">
              Collaborative Learning
            </h3>
            <p className="text-sm">
              Engage with friends by submitting assignments and grading each
              other’s work
            </p>
          </div>

          <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">
              Secure Authentication
            </h3>
            <p className="text-sm">
              Log in securely with email/password or social login and manage
              private routes seamlessly
            </p>
          </div>

          <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Theme Customization</h3>
            <p className="text-sm">
              Switch between light and dark modes for a comfortable experience
            </p>
          </div>

          <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
            <p className="text-sm">
              Enjoy a fully responsive interface on mobile, tablet, and desktop
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
