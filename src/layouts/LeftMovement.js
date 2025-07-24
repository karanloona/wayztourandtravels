import React from 'react';
import Image from '../assets/img/marque.png';

const MarqueeComponent = () => {
  const items = [
    "Comprehensive Trip Protection",
    "Family-Friendly Pricing",
    "Complimentary Pick-up & Drop-off",
    "Exclusive Scenic Tour Stops",
    "Customizable Travel Packages",
    "Special Event Arrangements",
    "Personalized Trip Planning",
  ];

  const items2 = [
    "Flexible Custom Destination Options",
    "Real-Time Itinerary Updates",
    "Affordable Travel Packages",
    "Luxury Travel Planning",
    "Fast & Secure Payments",
    "Best Price Guarantee",
    "Adventure Tour Packages",
    "Hassle-Free Reservations",
    "Seamless Flight Bookings"
  ];

  return (
    <>
      {/* First Marquee (Right to Left) */}
      <div className="bg-[#D4AF37] py-4 md:py-6 mt-24 overflow-hidden relative">
        <div className="flex gap-8  whitespace-nowrap">
          {/* First copy of items */}
          <div className="animate-marquee inline-flex">
            {items.map((text, i) => (
              <div key={i} className="flex items-center mx-8">
                <img src={Image} className="w-10 h-10 flex-shrink-0" alt="icon" />
                <h3 className="text-[#0c1b2b] font-semibold text-2xl ml-4 whitespace-nowrap">{text}</h3>
              </div>
            ))}
          </div>
          
          
        </div>
      </div>

      {/* Second Marquee (Left to Right) */}
      <div className="bg-[#0c1b2b] py-4 md:py-6 overflow-hidden relative">
        <div className="flex whitespace-nowrap">
          {/* First copy of items2 */}
          <div className="animate-marqueeReverse inline-flex">
            {items2.map((text, i) => (
              <div key={i} className="flex items-center mx-8">
                <img src={Image} className="w-10 h-10 flex-shrink-0" alt="icon" />
                <h3 className="text-[#D4AF37] font-semibold text-2xl ml-4">{text}</h3>
              </div>
            ))}
          </div>
          
          {/* Second copy of items2 (to ensure continuous scrolling) */}
          <div className="animate-marqueeReverse inline-flex absolute right-full">
            {items2.map((text, i) => (
              <div key={i} className="flex items-center mx-8">
                <img src={Image} className="w-10 h-10 flex-shrink-0" alt="icon" />
                <h3 className="text-[#D4AF37] font-semibold text-2xl ml-4">{text}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarqueeComponent;