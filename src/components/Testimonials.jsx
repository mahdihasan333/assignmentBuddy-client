import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "John Doe",
    feedback: "This platform has transformed the way I study with my friends!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    feedback: "Assignments are so much easier to manage now. Great work!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Michael Lee",
    feedback: "Really intuitive UI and useful features. Highly recommend!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center text-yellow-400 text-lg">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index}>{index < rating ? "\u2605" : "\u2606"}</span>
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="max-w-6xl mx-auto my-16 p-6 text-center">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        What Our Users Say
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg flex flex-col items-center text-center"
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4 border-2 border-gray-300 dark:border-gray-600"
              />
              <StarRating rating={testimonial.rating} />
              <p className="text-gray-700 dark:text-gray-300 italic mt-2">
                "{testimonial.feedback}"
              </p>
              <h3 className="mt-4 font-semibold dark:text-white">
                - {testimonial.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
