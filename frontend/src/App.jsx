import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import RoomList from "./pages/ViewRooms";
import Bookings from "./pages/ViewBooking";
import BookingForm from "./pages/AddBooking";
import UpdateBookingForm from "./pages/UpdateBooking";
import UploadRoom from "./pages/UploadRoom";
import Contact from "./pages/Contact";
import Login from "./pages/Login"; // Import the Login component
import Signup from "./pages/Signup"; // Import the Signup component
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navigation />
      <div className="container mx-auto px-4">
        <Routes>
          <Route exact path="/" element={<RoomList />} />
          <Route path="/view" element={<Bookings />} />
          <Route path="/add" element={<BookingForm />} />
          <Route path="/update" element={<UpdateBookingForm />} />
          <Route path="/uploadroom" element={<UploadRoom />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
