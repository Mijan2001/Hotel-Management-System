import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingCard from "../components/Booking";
import { toast } from "react-toastify";

const ViewBooking = () => {
  function getDate(date) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16);
  }

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/bookings").then((response) => {
      setBookings(response.data);
      console.log(response.data);
    });
  }, []);

  function notify(temp) {
    if (parseInt(temp) < 24) toast.info("Booking Deleted - NO REFUND");
    else if (parseInt(temp) < 48)
      toast.info("Booking Deleted - Partial REFUND");
    else toast.info("Booking Deleted - Full REFUND");
  }

  const handleDelete = (id) => {
    if (window.confirm("Do you want to continue delete the booking?")) {
      axios.get(`http://localhost:8080/bookings/${id}`).then((response) => {
        let currentDate = new Date();
        currentDate = getDate(currentDate);
        let createdAt = getDate(response.data.startTime);
        const milliseconds = Math.abs(
          Date.parse(currentDate) - Date.parse(createdAt)
        );
        let temp = milliseconds / 36e5;

        notify(temp);
      });
      axios.delete(`http://localhost:8080/bookings/${id}`).then(() => {
        setBookings(bookings.filter((booking) => booking._id !== id));
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-8">View Bookings</h2>
      <div className="flex flex-col items-center">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="w-full max-w-md mb-6 bg-white rounded-lg shadow-md p-4"
          >
            <BookingCard booking={booking} />
            <button
              className="mt-4 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => handleDelete(booking._id)}
            >
              Delete Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBooking;
