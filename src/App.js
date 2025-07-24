import About from './layouts/About';
import Booking from './layouts/Booking';
import Testimonials from './layouts/Testimonials';
import Gallery from './layouts/Gallery';
import Header from './layouts/Header';
import LastMinuteOffer from './layouts/LastMinuteOffer';
import PromoSection from './layouts/PromoSection';
import LeftMovement from './layouts/LeftMovement';
import 'animate.css';
import Footer from './layouts/Footer';
import TourInformation from './layouts/TourInformation';
import CustomizablePackages from './layouts/CustomizablePackages';
import Login from './layouts/Pages/Login';
import { Dashboard } from './layouts/Pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingAdmin from './layouts/Pages/BookingAdmin';
import BookingDetails from './layouts/BookingDetails';
import InquiryAdmin from './layouts/Pages/InquiryAdmin';

export default function App() {
  return (
    <Router>
      <Header /> {/* Header remains on all pages */}
      <Routes>
        {/* Main page route */}
        <Route
          path="/"
          element={
            <>
              <Booking />
              {/* <About /> */}
              <TourInformation />
              <CustomizablePackages />
              {/* <Testimonials /> */}
              <Gallery />
              <LeftMovement />
              <PromoSection />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/booking"
          element={
            <>
              <BookingDetails />
              <Footer />
            </>
          }
        />
        <Route path="/booking/:uuid" element={
            <>
              <BookingDetails />
              <Footer />
            </>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/bookings" element={<BookingAdmin />} />
        <Route path="/dashboard/inquiry" element={<InquiryAdmin />} />
        
      </Routes>
    </Router>
  );
}