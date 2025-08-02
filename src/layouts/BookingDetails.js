import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomizablePackages from "./CustomizablePackages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from "@fortawesome/free-solid-svg-icons";

const BookingDetails = () => {
  const { uuid: paramUuid } = useParams();
  const navigate = useNavigate();
  const [uuid, setUuid] = useState(paramUuid || "");
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refundLoading, setRefundLoading] = useState(false);
  const [refundError, setRefundError] = useState(null);
  const [refundStatus, setRefundStatus] = useState(null);

  // Update URL as user types
  useEffect(() => {
    if (uuid) {
      navigate(`/booking/${uuid}`, { replace: true });
    } else {
      navigate(`/booking`, { replace: true });
    }
  }, [uuid, navigate]);

  // Fetch booking details if UUID exists in URL
  useEffect(() => {
    if (paramUuid) {
      handleFetchBooking();
    }
  }, [paramUuid]);

  const handleFetchBooking = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);
    setBookingData(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}booking/${uuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer ThisIsTheComplexCode@123#123",
        },
      });

      if (!response.ok) {
        throw new Error("Booking not found or invalid UUID");
      }

      const data = await response.json();
      setBookingData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if refund is available (24 hours before travel date and has trip protection)
  const isRefundAvailable = () => {
    if (!bookingData || !bookingData.tripProtection) return false;
    
    const travelDate = new Date(bookingData.date);
    const currentDate = new Date();
    const timeDifference = travelDate.getTime() - currentDate.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);
    
    return hoursDifference >= 24;
  };

  // Handle refund action (initiate or check status)
  const handleRefundAction = async (isRefreshOnly = false) => {
    if (!bookingData) return;

    setRefundLoading(true);
    setRefundError(null);

    try {
      // If this is a refresh action, check if refund was already initiated
      if (isRefreshOnly && bookingData.paymentStatus !== 2) {
        setRefundError("Cannot refresh refund status - no refund has been initiated yet.");
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}booking/refund/check-or-initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer ThisIsTheComplexCode@123#123",
          },
          body: JSON.stringify({ uuid: bookingData.uuid }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Refund action failed");
      }

      // Update booking data with new payment status
      setBookingData(prev => ({
        ...prev,
        paymentStatus: data.paymentStatus || prev.paymentStatus,
        refundStatus: data.refundStatus
      }));

      setRefundStatus(data.message);
      
      // Show success message
      if (!isRefreshOnly) {
        alert("Refund initiated successfully! You will receive an email confirmation shortly.");
      }
    } catch (error) {
      console.error("Refund error:", error);
      setRefundError(error.message || "Error processing refund");
    } finally {
      setRefundLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 mt-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Booking Details</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your booking UUID to view your reservation details
            </p>
          </div>

          {/* UUID Input Form */}
          <form onSubmit={handleFetchBooking} className="space-y-6">
            <div className="relative">
              <label htmlFor="uuid" className="block text-sm font-medium text-gray-700">
                Booking UUID
              </label>
              <input
                type="text"
                id="uuid"
                value={uuid}
                onChange={(e) => setUuid(e.target.value)} // Update state and URL dynamically
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm p-3"
                placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm text-[#0c1b2b] bg-[#D4AF37] hover:bg-[#e0c056] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition disabled:opacity-50 font-bold"
            >
              {isLoading ? "Loading..." : "Fetch Booking Details"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {bookingData && (
            <div className="bg-gray-50 rounded-lg p-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Booking Information</h3>
                {bookingData && (
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      bookingData.bookingStatus === 0 
                        ? 'bg-gray-200 text-red-700' 
                        : 'bg-gray-200 text-green-900'
                    }`}
                  >
                    {bookingData.bookingStatus === 0 ? 'Pending' : 'Confirmed'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-medium">Full Name:</span>
                  <span className="text-gray-900">{bookingData.fullName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-medium">Email:</span>
                  <span className="text-gray-900">{bookingData.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-medium">Contact:</span>
                  <span className="text-gray-900">{bookingData.contact}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-medium">Travelers:</span>
                  <span className="text-gray-900">{bookingData.numberOfTravelers}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-medium">Infants:</span>
                  <span className="text-gray-900">{bookingData.infants}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-medium">Date:</span>
                  <span className="text-gray-900">
                    {new Date(bookingData.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-medium">Trip Protection:</span>
                  <span className="text-gray-900">{bookingData.tripProtection ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-600 font-medium">Total Cost:</span>
                  <span className="text-gray-900 font-semibold">${bookingData.totalCost} CAD</span>
                </div>
              </div>

              {/* Payment Status Section */}
              <div className="flex justify-between items-center border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700">Payment Status</h4>
                <span 
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    bookingData.paymentStatus === 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : bookingData.paymentStatus === 1
                      ? 'bg-green-100 text-green-800'
                      : bookingData.paymentStatus === 2
                      ? 'bg-blue-100 text-blue-800'
                      : bookingData.paymentStatus === 3
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {bookingData.paymentStatus === 0
                    ? 'Pending'
                    : bookingData.paymentStatus === 1
                    ? 'Paid'
                    : bookingData.paymentStatus === 2
                    ? 'Refund Initiated'
                    : bookingData.paymentStatus === 3
                    ? 'Refund Completed'
                    : 'Failed'}
                </span>
              </div>


              <div className="mt-4 text-xs font-extrabold text-gray-500">
                Payment ID: {bookingData.paymentId}
              </div>

              {/* Refund Section */}
              {bookingData.paymentStatus === 1 && (
                <div className="mt-6 border-t pt-4">
                {/* Header and Buttons Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Refund Options</h4>
                  <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
                    {/* Initiate Refund Button */}
                    {bookingData.tripProtection && isRefundAvailable() && bookingData.paymentStatus === 1 && (
                      <button
                        onClick={() => handleRefundAction(false)}
                        disabled={refundLoading}
                        style={{ backgroundColor: 'rgb(212 175 55)' }}
                        className="text-black text-medium font-semibold px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:bg-gray-400"
                      >
                        {refundLoading ? "Processing..." : "Initiate Refund"}
                      </button>
                    )}
              
                    {/* Refresh Refund Status Button */}
                    {bookingData.tripProtection && bookingData.paymentStatus >= 2 && (
                      <button
                        onClick={() => handleRefundAction(true)}
                        disabled={refundLoading || bookingData.paymentStatus === 3}
                        title={bookingData.paymentStatus === 3 ? "Refund completed" : "Check refund status"}
                        style={{ backgroundColor: 'rgb(212 175 55)' }}
                        className="text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
                      >
                        <FontAwesomeIcon icon={faSync} className={refundLoading ? "animate-spin" : ""} />
                        {refundLoading ? "Checking..." : "Refresh Status"}
                      </button>
                    )}
                  </div>
                </div>
              
                {/* Refund Error Message */}
                {refundError && (
                  <div className="mb-3 bg-red-50 border-l-4 border-red-400 p-3 rounded">
                    <p className="text-sm text-red-700">{refundError}</p>
                  </div>
                )}
              
                {/* Refund Status Message */}
                {refundStatus && (
                  <div className="mb-3 bg-green-50 border-l-4 border-green-400 p-3 rounded">
                    <p className="text-sm text-green-700">{refundStatus}</p>
                  </div>
                )}
              
                {/* Refund Information */}
                <div className="mt-3 text-xs text-gray-600">
                  {!bookingData.tripProtection && (
                    <p className="text-red-600">
                      ⚠️ Refunds are only available for bookings with trip protection.
                    </p>
                  )}
                  {bookingData.tripProtection && !isRefundAvailable() && (
                    <p className="text-orange-600">
                      ⏰ Refunds can only be requested at least 24 hours before your travel date.
                    </p>
                  )}
                </div>
              </div>
              
              )}
            </div>
          )}
        </div>
      </div>

      <CustomizablePackages />
    </>
  );
};

export default BookingDetails;
