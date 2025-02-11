import React from "react";
import Banner from "../../components/Banner";
import Faq from "../../components/Faq";
import Features from "../../components/Feature";
import Testimonials from "../../components/Testimonials";
import AssignmentShowcase from "../../components/AssignmentShowCase";
import HowItWorks from "../../components/HowItWork";

const Home = () => {
  return (
    <div className="bg-white mt-8 space-y-10 text-black dark:bg-gray-900 dark:text-gray-100">
      <Banner />
      <Features />
      {/* <AssignmentShowcase /> */}
      <HowItWorks />
      <Faq />
      <Testimonials />
    </div>
  );
};

export default Home;
