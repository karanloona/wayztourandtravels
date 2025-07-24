import React, { useEffect } from "react";
import { WOW } from "wowjs";
import "animate.css";

const TourInformation = () => {
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
    <section id="tour-information" className="py-16 bg-amber-50">
        <div className="section-title text-center">
            <span className="text-[#D4AF37] text-base sm:text-lg font-bold">Tour Information</span>
            <h2 className="text-5xl sm:text-6xl font-bold mt-2 text-[#0c1b2b] leading-tight break-words">Explore Our Travel Details</h2>
            <p className="text-gray-600 text-sm sm:text-base mx-auto">
                Get all the essential details about your tour, including itinerary, pricing, and special offers.  
                <br /> Plan your trip effortlessly with our comprehensive tour information.
            </p>
        </div>

      <div className="container mt-10 mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Trip Protection Info */}
          <div className="bg-white p-6 rounded-lg shadow-lg wow animate__fadeInUp transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-teal-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Trip Protection</h3>
            <p className="text-gray-600 text-center">
              Our optional trip protection covers unforeseen circumstances requiring cancellation. 
              Unlike the standard $90 cancellation fee, trip protection ensures a full refund 
              if you need to cancel for covered reasons such as illness or emergency.
            </p>
          </div>
          
          {/* Children Policy */}
          <div className="bg-white p-6 rounded-lg shadow-lg wow animate__fadeInUp transform transition duration-300 hover:scale-105 hover:shadow-xl" data-wow-delay="0.2s">
            <div className="text-indigo-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Family-Friendly Pricing</h3>
            <p className="text-gray-600 text-center">
              We believe that family adventures should be easy and affordable. Young children under 2 years old are welcome aboard at no cost, so you can focus on making memories together.
            </p>
          </div>
          
          {/* Pick-up and Drop-off */}
          <div className="bg-white p-6 rounded-lg shadow-lg wow animate__fadeInUp transform transition duration-300 hover:scale-105 hover:shadow-xl" data-wow-delay="0.4s">
            <div className="text-rose-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Pick-up & Drop-off</h3>
            <p className="text-gray-600 text-center">
              Complimentary pick-up service is available from the Hotel Garden Inn, Toronto Airport, between 7:00 AM and 7:45 AM. 
              Tours return to Toronto around 6:30 PM, with drop-off provided at hotels near the airport.
            </p>
          </div>
          
          {/* Tour Stops */}
          <div className="bg-white p-6 rounded-lg shadow-lg wow animate__fadeInUp transform transition duration-300 hover:scale-105 hover:shadow-xl" data-wow-delay="0.6s">
            <div className="text-cyan-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Scenic Tour Stops</h3>
            <p className="text-gray-600 text-center">
              Enjoy two exclusive stops on your journey to Niagara Falls. 
              Visit the historic Niagara-on-the-Lake town with its charming shops, 
              and experience a premium wine tasting at a local vineyard, all included in your tour price.
            </p>
          </div>
          
          {/* Custom Packages */}
          <div className="bg-white p-6 rounded-lg shadow-lg wow animate__fadeInUp transform transition duration-300 hover:scale-105 hover:shadow-xl" data-wow-delay="0.8s">
            <div className="text-emerald-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Custom Destinations</h3>
            <p className="text-gray-600 text-center">
              Beyond our signature Niagara experience, we offer custom packages to 
              other popular destinations including Algonquin Park, Blue Mountain, 
              and Prince Edward County. Contact our team for personalized itineraries.
            </p>
          </div>
          
          {/* Special Arrangements */}
          <div className="bg-white p-6 rounded-lg shadow-lg wow animate__fadeInUp transform transition duration-300 hover:scale-105 hover:shadow-xl" data-wow-delay="1s">
            <div className="text-violet-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Special Events</h3>
            <p className="text-gray-600 text-center">
              Planning a wedding or corporate event? We provide special arrangements 
              for weddings, conferences, and group events with customized experiences, 
              private transportation, and exclusive venue access. Ask about our event planning services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourInformation;