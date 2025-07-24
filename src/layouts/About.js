import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPlane, faDollar, faEarthAmerica } from "@fortawesome/free-solid-svg-icons";
import Image2 from '../assets/img/2.webp';
import Image3 from '../assets/img/1.jpg';
import "../css/about.css";
import { WOW } from "wowjs";
import 'animate.css';

const About = () => {
  useEffect(() => {
    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 100,
      mobile: false,
      live: false,
    });
    wow.init();
  }, []);

  return (
    <div id="about" className="bg-gray-100">
      <section className="container mx-auto px-6 py-10 sm:py-20">
        <div className="section-title text-center wow animate__animated animate__fadeInUp px-4">
          <span className="text-[#D4AF37] text-base sm:text-lg font-bold">About Us</span>
          <h2 className="text-5xl sm:text-6xl font-bold mt-2 text-[#0c1b2b] leading-tight break-words">
            Discover Our Story
          </h2>
          <p className="mt-3 pb-10 text-gray-600 text-sm sm:text-base mx-auto">
            We are passionate about crafting unforgettable travel experiences, ensuring comfort, adventure, and seamless journeys. <br />
            Our dedicated team works tirelessly to bring you the best travel solutions tailored to your needs.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section - Images */}
          <div className="relative wow animate__animated animate__zoomIn">
            <img src={Image3} alt="Adventure" className="rounded-lg shadow-lg w-full" />
            <div className="absolute bottom-[-40px] left-[-40px] bg-white p-1 rounded-lg shadow-lg">
              <img src={Image2} alt="Nature" className="rounded-lg h-52 w-52" />
            </div>
            <div className="absolute top-0 right-0 bg-[#0c1b2b] text-white p-7 rounded-lg">
              <FontAwesomeIcon className="text-[60px]" icon={faEarthAmerica} />
            </div>
            <div className="absolute bottom-3 right-3 bg-gray-200 px-4 py-2 rounded-lg">
              <span className="text-[#D4AF37] text-3xl font-bold">24</span>
              <p className="text-gray-600 text-sm">Years of experience</p>
            </div>
          </div>

          {/* Right Section - Features */}
          <div className="wow animate__animated animate__fadeInRight">
          <span className="bg-gray-200 text-[#0c1b2b] px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
            About Company
          </span>
            <h2 className="text-5xl leading-tight font-bold mt-6 text-[#0c1b2b]">
              Great opportunity for
              <span className="text-[#D4AF37]"> adventure & travels</span>
            </h2>
            <div className="mt-6 space-y-6">
              {/* Feature 1 */}
              {/* Feature 1 */}
              <div className="flex items-center space-x-4 wow animate__animated animate__fadeInUp" data-wow-delay="0.2s">
                <div className="bg-[#0c1b2b] w-10 h-10 flex items-center justify-center rounded-full">
                  <FontAwesomeIcon className="text-md font-extrabold text-[#D4AF37]" icon={faLock} />
                </div>
                <div className="px-4 mt-1">
                  <h3 className="font-semibold text-2xl text-[#0c1b2b]">Safety first always</h3>
                  <p className="text-gray-600 text-sm">
                    Prioritize safety in every situation to prevent risks and harm.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              {/* Feature 2 */}
              <div className="flex items-center space-x-4 wow animate__animated animate__fadeInUp" data-wow-delay="0.4s">
                <div className="bg-[#0c1b2b] w-10 h-10 flex items-center justify-center rounded-full">
                  <FontAwesomeIcon className="text-md font-extrabold text-[#D4AF37]" icon={faDollar} />
                </div>
                <div className="px-4 mt-1">
                  <h3 className="font-semibold text-2xl text-[#0c1b2b]">Low price & friendly</h3>
                  <p className="text-gray-600 text-sm">
                    Affordable prices with a warm and welcoming experience for all.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center space-x-4 wow animate__animated animate__bounceIn delay-2s">
                <div className="bg-[#0c1b2b] w-10 h-10 flex items-center justify-center rounded-full">
                  <FontAwesomeIcon className="text-md font-extrabold text-[#D4AF37]" icon={faPlane} />
                </div>
                <div className="px-4 mt-1">
                  <h3 className="font-semibold text-2xl text-[#0c1b2b]">Trusted travel guide</h3>
                  <p className="text-gray-600 text-sm">
                    Your reliable companion for safe and unforgettable travel experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;