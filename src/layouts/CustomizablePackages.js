import React, { useEffect, useState } from "react";
import { WOW } from "wowjs";
import "animate.css";

const CustomizablePackages = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  
  // Body scroll lock when modal is open
  useEffect(() => {
    if (showModal || showSuccessModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal, showSuccessModal]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);

    // Create the payload to send to the API
    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      packageTitle: selectedPackage?.title || "Unknown Package"
    };

    // Send data to the API
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}booking/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ThisIsTheComplexCode@123#123',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setShowModal(false);
        setShowSuccessModal(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Failed to submit:", data);
        alert("Failed to submit inquiry. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const packages = [
    {
      id: 1,
      title: "The Best of Niagara Falls, Canada",
      duration: "",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/3Falls_Niagara.jpg",
      flights: 2,
      hotels: 1,
      activities: 4,
      transfers: 2,
      destinations: [{ name: "Niagara Falls", nights: "4N" }],
      highlights: ["Maid of the Mist", "Niagara-on-the-Lake"]
    },
    {
      id: 2,
      title: "Banff (National Park)",
      duration: "",
      image: "https://i.natgeofe.com/n/1d859fd3-6953-4aa3-bd30-d30d361ec614/h_00000223407440.jpg",
      flights: 0,
      hotels: 0,
      activities: 0,
      transfers: 0,
      destinations: [],
      highlights: ["Contact us via phone or email to customize your trip across Alberta, BC, Quebec and more."]
    },
    {
      id: 3,
      title: "Vancouver Vacation",
      duration: "",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Concord_Pacific_Master_Plan_Area.jpg",
      flights: 2,
      hotels: 3,
      activities: 10,
      transfers: 4,
      destinations: [
        { name: "Vancouver", nights: "2N" },
        { name: "Banff", nights: "1N" },
        { name: "1000 Islands", nights: "1N" }
      ],
      highlights: ["Scenic Cruise at 1000 Islands", "Explore Banff National Park", "City Tour of Vancouver"]
    }    
  ];

  return (
    <section id="packages" className="py-16 px-4 max-w-7xl mx-auto">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowSuccessModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Thank You for Your Inquiry!</h3>
              <p className="mt-2 text-gray-600">
                Your query has been successfully sent to our team. We will get in touch with you shortly.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-6 py-2 bg-[#D4AF37] text-[#0c1b2b] rounded-lg hover:bg-[#e0c056] transition font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Package Modal */}
      {showModal && selectedPackage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 m-4"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-extrabold text-[#0c1b2b] mb-2">
              {selectedPackage.title}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill out the form below and we'll get back to you soon.
            </p>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name" className="text-sm font-medium text-[#0c1b2b] block mb-1">Your Name *</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-[#0c1b2b] block mb-1">Your Email *</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-[#0c1b2b] block mb-1">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message..."
                  rows={4}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none"
                ></textarea>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#D4AF37] text-[#0c1b2b] font-semibold px-6 py-3 rounded-lg hover:bg-[#e0c056] transition focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-sm text-gray-500 hover:text-red-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="section-title text-center wow fadeInDown" data-wow-duration="1s">
        <span className="text-[#D4AF37] text-base sm:text-lg font-bold">EXPLORE WONDERFUL EXPERIENCE</span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-[#0c1b2b]">Customizable Travel Package</h2>
        <p className="mt-3 pb-10 text-gray-600 max-w-2xl mx-auto">
          Choose from our carefully crafted packages that can be tailored to your preferences.
          Each package includes flights, accommodation, activities, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div 
            key={pkg.id} 
            className="wow animate__fadeInUp border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            data-wow-delay={`${pkg.id * 0.1}s`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                loading="lazy"
              />
              {pkg.duration && (
                <div className="absolute bottom-3 right-3 bg-[#0c1b2b] text-white font-bold py-1 px-4 rounded-full">
                  {pkg.duration}
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-center mb-2">
                <span className="bg-gray-200 text-[#0c1b2b] text-xs font-medium px-2.5 py-0.5 rounded">
                  CUSTOMIZABLE
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0c1b2b] mb-4 line-clamp-2">{pkg.title}</h3>

              {/* <div className="grid grid-cols-4 text-center mb-6">
                <div className="flex flex-col items-center">
                  <div className="text-[#D4AF37] mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg text-[#0c1b2b]">{pkg.flights}</div>
                  <div className="text-xs text-gray-600">Flights</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-[#D4AF37] mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg text-[#0c1b2b]">{pkg.hotels}</div>
                  <div className="text-xs text-gray-600">{pkg.hotels !== 1 ? 'Hotels' : 'Hotel'}</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-[#D4AF37] mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg text-[#0c1b2b]">{pkg.activities}</div>
                  <div className="text-xs text-gray-600">Activities</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-[#D4AF37] mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg text-[#0c1b2b]">{pkg.transfers}</div>
                  <div className="text-xs text-gray-600">Transfers</div>
                </div>
              </div> */}

              <button
                onClick={() => {
                  setSelectedPackage(pkg);
                  setShowModal(true);
                }}
                className="w-full bg-[#D4AF37] text-[#0c1b2b] font-bold py-3 rounded-lg hover:bg-[#e0c056] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
              >
                Click to know more
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomizablePackages;