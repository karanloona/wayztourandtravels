import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Image2 from '../assets/img/caption.jpg';
import { v4 as uuidv4 } from 'uuid';
import '../css/about.css'

const stripePromise = loadStripe('pk_test_51R7P0JPwfkgz3ElA4cw3l9kPbb9V0RVBd67LE1JTi1o8exWZ2bCc9gg7NohFh45NzcqK6kjtzlUAkDkksIaQCKNc00w00T419L');

const CheckoutForm = ({ bookingData, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  
  const [billingAddress, setBillingAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'CA',
  });

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setPaymentLoading(true);
    setPaymentError(null);

    try {
      const amountInCents = Math.round(bookingData.totalCost * 100);
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}booking/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ThisIsTheComplexCode@123#123',
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency: 'cad',
          uuid: bookingData.uuid,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment intent');
      }
      
      const { clientSecret, paymentId } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${bookingData.firstName} ${bookingData.lastName}`,
            email: bookingData.email,
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      await fetch(`${process.env.REACT_APP_BACKEND_URL}booking/update-payment-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ThisIsTheComplexCode@123#123',
        },
        body: JSON.stringify({
          uuid: bookingData.uuid,
          paymentStatus: 1,
        }),
      });

      onSuccess();
    } catch (error) {
      setPaymentError(error.message);
      onError(error);

      await fetch(`${process.env.REACT_APP_BACKEND_URL}booking/update-payment-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ThisIsTheComplexCode@123#123',
        },
        body: JSON.stringify({
          uuid: bookingData.uuid,
          paymentStatus: 2,
        }),
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="bg-[#122336] rounded-xl shadow-lg mb-6 overflow-hidden">
        <div className="bg-[#0c1b2b] p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Order Summary</h2>
        </div>
        <div className="p-4">
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-300">Trip Date</span>
            <span className="text-white font-medium">{bookingData.date}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-300">Travelers</span>
            <span className="text-white font-medium">{bookingData.numberOfTravelers}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-300">Infants</span>
            <span className="text-white font-medium">{bookingData.infants}</span>
          </div>
          {bookingData.tripProtection && (
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-300">Trip Protection</span>
              <span className="text-green-400">Included</span>
            </div>
          )}
          <div className="flex justify-between py-3 mt-2">
            <span className="text-white font-bold">Total</span>
            <span className="text-[#D4AF37] font-bold text-xl">${bookingData.totalCost} CAD</span>
          </div>
        </div>
      </div>

      <form onSubmit={handlePayment} className="space-y-6">
        <div className="bg-[#122336] rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#0c1b2b] p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Payment Details</h2>
          </div>
          
          <div className="p-4">
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-300">We accept</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded opacity-90"></div>
                  <div className="w-8 h-5 bg-red-500 rounded opacity-90"></div>
                  <div className="w-8 h-5 bg-yellow-400 rounded opacity-90"></div>
                  <div className="w-8 h-5 bg-green-500 rounded opacity-90"></div>
                </div>
              </div>
              
              <div className="mt-3 bg-white/10 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Card Information
                </label>
                <div className="bg-white rounded-md overflow-hidden">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                          iconColor: '#D4AF37',
                        },
                        invalid: {
                          color: '#e25950',
                          iconColor: '#e25950',
                        },
                      },
                      hidePostalCode: true,
                    }}
                    className="w-full p-3 border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#122336] rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#0c1b2b] p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Billing Address</h2>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                name="line1"
                value={billingAddress.line1}
                onChange={handleBillingChange}
                className="w-full p-3 bg-[#0c1b2b] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                placeholder="Street address"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Address Line 2 <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                name="line2"
                value={billingAddress.line2}
                onChange={handleBillingChange}
                className="w-full p-3 bg-[#0c1b2b] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                placeholder="Apt, suite, etc."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={billingAddress.city}
                  onChange={handleBillingChange}
                  className="w-full p-3 bg-[#0c1b2b] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={billingAddress.state}
                  onChange={handleBillingChange}
                  className="w-full p-3 bg-[#0c1b2b] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  placeholder="Province"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={billingAddress.postalCode}
                  onChange={handleBillingChange}
                  className="w-full p-3 bg-[#0c1b2b] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  placeholder="Postal code"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={billingAddress.country}
                  onChange={handleBillingChange}
                  className="w-full p-3 bg-[#0c1b2b] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  required
                >
                  <option value="CA">Canada</option>
                  <option value="US">United States</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0c1b2b]/70 rounded-lg p-3 flex items-center space-x-3">
          <div className="text-[#D4AF37]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm text-gray-300">All transactions are secure and encrypted</span>
        </div>

        {paymentError && (
          <div className="bg-red-900/50 border border-red-500 text-white px-4 py-3 rounded-lg" role="alert">
            <div className="flex">
              <div className="py-1">
                <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>{paymentError}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || paymentLoading}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#e0c056] text-[#0c1b2b] p-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-70 flex items-center justify-center"
        >
          {paymentLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0c1b2b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Payment...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pay ${bookingData.totalCost} Securely
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const Booking = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [infants, setInfants] = useState(0);
  const [date, setDate] = useState('');
  const [tripProtection, setTripProtection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingUuid, setBookingUuid] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    travelers: '',
    infants: '',
    date: '',
  });
  const [showTrip, setShowTrip] = useState(false);

  const handleTravelerChange = (increment) => {
    setTravelers(prev => {
      const newValue = prev + increment;
      return newValue < 1 ? 1 : newValue > 20 ? 20 : newValue;
    });
    if (errors.travelers) setErrors({ ...errors, travelers: '' });
  };

  const handleInfantChange = (increment) => {
    setInfants(prev => {
      const newValue = prev + increment;
      return newValue < 0 ? 0 : newValue > 20 ? 20 : newValue;
    });
    if (errors.infants) setErrors({ ...errors, infants: '' });
  };

  const calculateTotal = () => {
    const baseCost = tripProtection ? 108 : 90;
    const subtotal = baseCost * travelers;
    const hst = subtotal * 0.13;
    return Math.round((subtotal + hst) * 100) / 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      travelers: '',
      infants: '',
      date: '',
    });

    let hasError = false;
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      hasError = true;
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      hasError = true;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }
    if (!contact.trim()) {
      newErrors.contact = 'Contact is required';
      hasError = true;
    }
    if (travelers < 1) {
      newErrors.travelers = 'Number of travelers must be at least 1';
      hasError = true;
    }
    if (infants < 0) {
      newErrors.infants = 'Number of infants cannot be negative';
      hasError = true;
    }
    if (!date) {
      newErrors.date = 'Date is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const data = {
        firstName,
        lastName,
        email,
        contact: Number(contact),
        numberOfTravelers: Number(travelers),
        infants: Number(infants),
        date,
        tripProtection,
        totalCost: calculateTotal(),
        uuid: uuidv4(),
      };

      const bookingResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ThisIsTheComplexCode@123#123',
        },
        body: JSON.stringify(data),
      });

      if (!bookingResponse.ok) throw new Error('Failed to save booking');
      await bookingResponse.json();

      setBookingUuid(data.uuid);
      setShowPayment(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred while processing your booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowModal(true);
    setShowPayment(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setContact('');
    setTravelers(1);
    setInfants(0);
    setDate('');
    setTripProtection(false);
    setBookingUuid('');
  };

  const BookingModal = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">Booking Sent!</h3>
          <p className="mt-2 text-gray-600">
            Thank you for your booking. Please check your email for further details and confirmation.
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
  );

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 items-stretch transition-opacity duration-1000 mt-10 md:mt-20 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      id="home"
    >
      <div
        className="relative min-h-[300px] md:h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Image2})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4 md:p-8">
          <h2 className="text-white text-3xl md:text-6xl font-bold">
            Explore. Dream. Discover.
          </h2>
          <p className="text-white text-base md:text-xl mt-4 max-w-2xl">
            "Escape the ordinary and experience the extraordinary. Let every journey be a story worth telling."
          </p>
          <a
            href="/booking"
            className="mt-6 inline-block px-6 py-3 border border-white text-white text-lg rounded-lg hover:bg-[#D4AF37] hover:text-[#0c1b2b] transition"
          >
            Check Booking Details
          </a>
        </div>
      </div>

      <div className="bg-[#0c1b2bf2] flex text-white h-full">
        <div className="w-full px-6 py-8 relative">
          <p className="text-3xl md:text-5xl font-bold text-white mb-4">
            Experience Niagara Falls
          </p>
          <p className="text-base md:text-lg font-semibold text-white">
            To reserve seats, please complete and submit the booking form.
          </p>
          <hr className="mt-4 mb-6 border-gray-300" />
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="w-12 h-12 border-4 border-t-4 border-[#D4AF37] border-solid rounded-full animate-spin"></div>
            </div>
          )}

          <div className="min-h-[500px] flex flex-col justify-between">
            {!showPayment ? (
              <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm md:text-md font-semibold text-white">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      className={`w-full text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errors.firstName) setErrors({ ...errors, firstName: '' });
                      }}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm md:text-md font-semibold text-white">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      className={`w-full text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (errors.lastName) setErrors({ ...errors, lastName: '' });
                      }}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm md:text-md font-semibold text-white">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <input
                      type="email"
                      className={`w-full text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm md:text-md font-semibold text-white">
                    Contact <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <input
                      type="number"
                      className={`w-full text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                        errors.contact ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Phone Number"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        if (errors.contact) setErrors({ ...errors, contact: '' });
                      }}
                      required
                    />
                    {errors.contact && (
                      <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm md:text-md font-semibold text-white">
                    Date/Time <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <input
                      type="date"
                      className={`w-full text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                        errors.date ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        setDate(e.target.value);
                        if (errors.date) setErrors({ ...errors, date: '' });
                      }}
                      required
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm md:text-md font-semibold text-white">
                    Travelers <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <div className="flex items-center space-x-3 p-2 rounded-lg">
                      <button
                        type="button"
                        onClick={() => handleTravelerChange(-1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#D4AF37] text-[#0c1b2b] rounded-full hover:bg-[#e0c056] disabled:opacity-50 transition"
                        disabled={travelers <= 1}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-12 text-center text-white font-semibold">{travelers}</span>
                      <button
                        type="button"
                        onClick={() => handleTravelerChange(1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#D4AF37] text-[#0c1b2b] rounded-full hover:bg-[#e0c056] disabled:opacity-50 transition"
                        disabled={travelers >= 20}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <p className="text-gray-400 text-xs mt-1">Max 20 travelers</p>
                    </div>
                    
                    {errors.travelers && (
                      <p className="text-red-500 text-xs mt-1">{errors.travelers}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm md:text-md font-semibold text-white">
                    Infants
                  </label>
                  <div className="col-span-2">
                    <div className="flex items-center space-x-3 p-2 rounded-lg">
                      <button
                        type="button"
                        onClick={() => handleInfantChange(-1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#D4AF37] text-[#0c1b2b] rounded-full hover:bg-[#e0c056] disabled:opacity-50 transition"
                        disabled={infants <= 0}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-12 text-center text-white font-semibold">{infants}</span>
                      <button
                        type="button"
                        onClick={() => handleInfantChange(1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#D4AF37] text-[#0c1b2b] rounded-full hover:bg-[#e0c056] disabled:opacity-50 transition"
                        disabled={infants >= 20}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <p className="text-gray-400 text-xs mt-1">Max 20 infants</p>
                    </div>
                    
                    {errors.infants && (
                      <p className="text-red-500 text-xs mt-1">{errors.infants}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tripProtection}
                    onChange={() => setTripProtection(!tripProtection)}
                    className="h-5 w-5 text-[#D4AF37] border-gray-300 rounded"
                  />
                  <span className="text-white text-sm md:text-md">Add Trip Protection (+$18)</span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTrip(true);
                    }}
                    className="text-[#D4AF37] text-sm ml-2 underline hover:text-white transition-colors duration-300"
                  >
                    View Trip Protection
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] text-[#0c1b2b] p-3 rounded mt-6 hover:bg-[#e0c056] transition font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : `Pay $${calculateTotal()} CAD (incl. HST)`}
                </button>
              </form>
            ) : (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  bookingData={{
                    firstName,
                    lastName,
                    email,
                    contact: Number(contact),
                    numberOfTravelers: Number(travelers),
                    infants: Number(infants),
                    date,
                    tripProtection,
                    totalCost: calculateTotal(),
                    uuid: bookingUuid,
                  }}
                  onSuccess={handlePaymentSuccess}
                  onError={(error) => console.error(error)}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
      {showModal && <BookingModal />}
      {showTrip && (
        <div
          className="fixed inset-0 bg-[#0c1b2b]/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={(e) => e.target === e.currentTarget && setShowTrip(false)}
        >
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh] animate-fadeIn">
            <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              ★ Recommended
            </span>
            <button
              onClick={() => setShowTrip(false)}
              className="absolute top-4 right-4 text-gray-(encoded) 700 hover:text-[#D4AF37] text-2xl transition duration-300"
              aria-label="Close modal"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold text-[#0c1b2b] tracking-wide mb-6 text-center">
              🛡️ Protect Your Stay
            </h2>
            <div className="space-y-5">
              {[
                "Cancellation and interruption coverage up to 100% of your trip cost",
                "Travel delay expenses up to CA $1,500 per plan",
                "Medical expenses coverage up to CA $25,000 per plan",
                "Emergency assistance and transportation up to CA $25,000 per plan",
                "Material misrepresentation of advertised property up to CA $100 per plan",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-[#D4AF37]/10 text-[#D4AF37] p-2 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800 text-base leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;