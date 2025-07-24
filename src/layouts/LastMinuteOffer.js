import React, { useEffect } from "react";
import { WOW } from "wowjs";
import 'animate.css';

const LastMinuteOffer = () => {
  

  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center mt-40"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1533094602577-198d3beab8ea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlhZ2FyYSUyMGZhbGxzfGVufDB8fDB8fHww')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative flex flex-col md:flex-row items-center px-5 md:px-16 lg:px-24 max-w-7xl mx-auto">
        
        {/* Discount Image with Slide-in Effect */}
        <img
          src="https://roam.qodeinteractive.com/wp-content/uploads/2017/08/h2-img-1.png"
          alt="37% Discount"
          className="w-2/3 md:w-1/2 max-w-lg md:max-w-xl wow animate__animated animate__slideInLeft"
          data-wow-duration="1.2s"
        />

        {/* Offer Details with Fade-in Effect */}
        <div
          className="text-white md:ml-10 text-center md:text-left max-w-lg wow animate__animated animate__fadeInRight"
          data-wow-duration="1.2s"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-amber-300">Last Minute Offer</h2>
          <p className="italic text-lg mt-2 text-amber-100">
          Aerial view of Niagara Falls with mist rising.
          </p>
          <p className="mt-4 text-sm md:text-base">
          Discover the breathtaking beauty of Niagara Falls. Book now for an unforgettable adventure!
          </p>

          {/* Button with Bounce-in Effect */}
          <button
            className="mt-6 px-6 py-3 bg-amber-500 text-indigo-900 font-bold uppercase shadow-md hover:bg-amber-400 transition-colors duration-300 wow animate__animated animate__bounceIn"
            data-wow-duration="1.5s"
            data-wow-delay="0.5s"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastMinuteOffer;