import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();

  // Check for token in localStorage on mount
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    }
  }, [navigate]);

  return (
    <div className="flex bg-gray-100 min-h-screen pt-28 sm:pt-32 md:pt-36">
      <LeftSidebar />
      <div className="flex-1 p-4 sm:p-6 md:pl-72 overflow-y-auto max-h-[calc(100vh-7rem)]">
        <div className="max-w-full sm:max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            This is your admin dashboard. Use the sidebar to navigate through different sections like bookings, settings.
          </p>
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Bookings</h3>
              <p className="text-gray-600 mt-2">View and manage recent booking requests.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">User Stats</h3>
              <p className="text-gray-600 mt-2">Monitor user activity and statistics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


export const LeftSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-16 right-4 z-50 p-3 text-white bg-[#0c1b2bf2] rounded-full shadow-lg hover:bg-[#D4AF37] hover:text-[#0c1b2bf2] transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>
      <div
        className={`fixed left-0 top-[64px] md:top-[72px] h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] bg-[#0c1b2bf2] text-white p-6 transition-transform duration-300 ${
          isOpen ? 'translate-x-0 top-18' : '-translate-x-full top-20'
        } md:translate-x-0 md:w-64 z-40`}
      >
        <nav className="space-y-4">
          <a href="/dashboard" className="block py-2 px-4 rounded hover:bg-[#D4AF37] transition">
            Dashboard
          </a>
          <a href="/dashboard/bookings" className="block py-2 px-4 rounded hover:bg-[#D4AF37] transition">
            Bookings
          </a>
          <a href="/booking" className="block py-2 px-4 rounded hover:bg-[#D4AF37] transition">
            Bookings Status
          </a>
          <a href="/dashboard/inquiry" className="block py-2 px-4 rounded hover:bg-[#D4AF37] transition">
            Bookings Inquiries
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-[#D4AF37] transition">
            Settings
          </a>
          <a
            href="#"
            onClick={() => {
              window.localStorage.removeItem('token');
              navigate('/login');
            }}
            className="block py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Logout
          </a>
        </nav>
      </div>
    </>
  );
};