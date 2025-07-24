import { useState } from "react";
import "../css/about.css";

const PromoSection = () => {
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '' });
  const [showModal, setShowModal] = useState(false);  // For success modal
  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      email: '',
    });

    // Validation checks
    let hasError = false;
    const newErrors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const data = {
        name: 'Subscribe',  // Fixed name
        email,
        message: '',        // Empty message
      };

      const subscribeResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}booking/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ThisIsTheComplexCode@123#123',
        },
        body: JSON.stringify(data),
      });

      if (!subscribeResponse.ok) throw new Error('Failed to subscribe');
      await subscribeResponse.json();
      setEmail("")

      setShowModal(true);  // Show success modal

    } catch (error) {
      console.error('Subscription error:', error);
      alert('An error occurred while processing your subscription');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12">
      {/* Section Title */}
      <div className="section-title text-center mt-10">
        <span className="text-[#D4AF37] text-base sm:text-lg font-bold">Subscribe</span>
        <h2 className="text-3xl sm:text-5xl font-bold mt-2 text-[#0c1b2b] leading-tight break-words">
          Stay Updated with Our Newsletter
        </h2>
        <p className="mt-3 pb-8 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Join our mailing list to receive the latest travel deals, exclusive offers, and inspiring travel stories.
          Stay connected and never miss an adventure!
        </p>
      </div>

      {/* Main Flex Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Card */}
        <div className="relative w-full md:w-1/2 h-72 md:h-80 rounded-xl overflow-hidden">
          <img
            src="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/494000/494918-niagara-falls.jpg"
            alt="Special Deals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 md:px-8">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
              Discover Special Deals!
            </h2>
            <p className="text-white text-sm sm:text-base md:text-lg mt-4">
              Make sure to check out these special promotions
            </p>
            <button className="mt-4 bg-[#D4AF37] text-[#0c1b2b] text-sm font-bold px-5 py-2 rounded-lg w-fit">
              See Tours
            </button>
          </div>
        </div>

        {/* Newsletter Card */}
        <div className="w-full md:w-1/2 bg-gray-100 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Don’t miss a thing</h2>
          <p className="text-gray-600 text-sm sm:text-lg mt-6">
            Get updates on special deals and exclusive offers. <br /> Sign up for our newsletter!
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubscribeSubmit} className="w-full bg-white rounded-2xl shadow-md p-3 mt-5">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          {/* Email input with icon */}
          <div className="flex items-center bg-white border border-gray-300 rounded-full w-full px-3 py-2">
            <span className="text-gray-500 text-lg mr-2">✉️</span>
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 outline-none text-sm sm:text-base text-gray-700 bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Subscribe button */}
          <button
            type="submit"
            className="bg-[#D4AF37] text-[#0c1b2b] px-5 py-2 text-sm sm:text-base rounded-full font-bold w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'SUBSCRIBE'}
          </button>
        </div>
          </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 animate-fade-in">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Subscribed Successfully!</h3>
              <p className="mt-2 text-gray-600">
                Thank you for subscribing. You will receive updates in your inbox.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-[#D4AF37] text-[#0c1b2b] rounded-lg hover:bg-[#e0c056] transition font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    



        </div>
      </div>
    </div>
  );
};

export default PromoSection;
