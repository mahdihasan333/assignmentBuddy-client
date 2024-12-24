import React from "react";

const Features = () => {
  const features = [
    {
      title: "Create Assignments",
      description:
        "Easily create assignments with due dates, difficulty levels, and thumbnail images.",
      icon: "📝",
    },
    {
      title: "Collaborative Learning",
      description:
        "Engage with friends by submitting assignments and grading each other’s work.",
      icon: "🤝",
    },
    {
      title: "Secure Authentication",
      description:
        "Log in securely with email/password or social login and manage private routes seamlessly.",
      icon: "🔒",
    },
    {
      title: "Theme Customization",
      description:
        "Switch between light and dark modes for a comfortable experience.",
      icon: "🎨",
    },
    {
      title: "Responsive Design",
      description:
        "Enjoy a fully responsive interface on mobile, tablet, and desktop.",
      icon: "📱",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
