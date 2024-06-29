import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomNumber = location.state?.roomNumber || "";
  const pricePerHour = location.state?.pricePerHour || 0;

  const [postAdded, setPostAdded] = useState(false);
  const [priceDisplay, setPriceDisplay] = useState(0);
  const [booking, setBooking] = useState({
    userEmail: "",
    userName: "",
    roomNumber: roomNumber,
    startTime: "",
    endTime: "",
    price: 0,
    paymentType: "Card",
    tip: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
  };

  useEffect(() => {
    if (postAdded) {
      navigate("/view");
    }
  }, [postAdded, navigate]);

  useEffect(() => {
    if (booking.endTime === "" || booking.startTime === "") return;
    const milliseconds = Math.abs(
      new Date(booking.endTime) - new Date(booking.startTime)
    );
    const hours = milliseconds / 36e5;
    const calculatedPrice = hours * pricePerHour;
    setPriceDisplay(calculatedPrice);
  }, [booking.startTime, booking.endTime, pricePerHour]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const milliseconds = Math.abs(
      new Date(booking.endTime) - new Date(booking.startTime)
    );
    const hours = milliseconds / 36e5;
    const price = hours * pricePerHour;
    const updatedBooking = { ...booking, price };

    try {
      const response = await axios.post(
        "http://localhost:8080/bookings",
        updatedBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data._id) {
        toast.success("Booking Made");
        setPostAdded(true);
      } else {
        toast.error("Booking Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Error: " + (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Add Booking</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Guest Email-address</label>
        <input
          type="email"
          name="userEmail"
          value={booking.userEmail}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Guest Name</label>
        <input
          type="text"
          name="userName"
          value={booking.userName}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Room Number</label>
        <input
          type="text"
          name="roomNumber"
          value={booking.roomNumber}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Start Time</label>
        <input
          type="datetime-local"
          name="startTime"
          value={booking.startTime}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">End Time</label>
        <input
          type="datetime-local"
          name="endTime"
          value={booking.endTime}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={priceDisplay}
          readOnly
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Payment Type</label>
        <select
          name="paymentType"
          value={booking.paymentType}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Tip</label>
        <input
          type="number"
          name="tip"
          value={booking.tip}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-gray-500 text-sm">
          A tip is not required but is appreciated
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
