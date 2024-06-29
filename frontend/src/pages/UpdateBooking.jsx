import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingForm = () => {
  function getDate(date) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16);
  }
  function getDate2(date) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16);
  }

  const [priceDisplay, setPriceDisplay] = useState(useLocation().state.price);
  const [pricePerHour, setPricePerHour] = useState();
  const navigate = useNavigate();
  const [postUpdate, setPostUpdate] = useState(false);
  const [booking, setBooking] = useState({
    id: useLocation().state._id,
    userEmail: useLocation().state.userEmail,
    userName: useLocation().state.userName,
    roomNumber: useLocation().state.roomNumber,
    startTime: useLocation().state.startTime,
    endTime: useLocation().state.endTime,
    price: useLocation().state.price,
    paymentType: useLocation().state.paymentType,
    tip: useLocation().state.tip,
  });

  useEffect(() => {
    booking.startTime = getDate(booking.startTime);
    booking.endTime = getDate2(booking.endTime);
  }, [booking]);

  useEffect(() => {
    if (postUpdate) {
      navigate("/view");
    }
  }, [postUpdate, navigate]);

  useEffect(() => {
    if (booking.endTime === "" || booking.startTime === "") return;
    const milliseconds = Math.ceil(
      Math.abs(Date.parse(booking.endTime) - Date.parse(booking.startTime))
    );
    const hours = Math.ceil(milliseconds / 36e5);
    const priceDisplay = hours * pricePerHour;
    setPriceDisplay(priceDisplay);
  }, [booking, pricePerHour]);

  useEffect(() => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/rooms/${booking.roomNumber}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setPricePerHour(response.data.pricePerHour);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [booking.roomNumber]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const milliseconds = Math.ceil(
      Math.abs(Date.parse(booking.endTime) - Date.parse(booking.startTime))
    );
    const hours = Math.ceil(milliseconds / 36e5);
    const price = hours * pricePerHour;
    const updatedBooking = { ...booking, price };
    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/bookings/${booking.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: updatedBooking,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.acknowledged === true) {
          toast.success("Booking Updated");
          setPostUpdate(true);
        } else toast.error("Booking Failed");
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-4">Update Booking</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Guest Email address
        </label>
        <input
          type="email"
          placeholder="Enter email"
          value={booking.userEmail}
          name="userEmail"
          onChange={handleInputChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Guest Name
        </label>
        <input
          type="text"
          placeholder="Enter name"
          value={booking.userName}
          name="userName"
          onChange={handleInputChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Room Number
        </label>
        <input
          type="text"
          name="roomNumber"
          value={booking.roomNumber}
          onChange={handleInputChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Start Time
        </label>
        <input
          type="datetime-local"
          name="startTime"
          value={booking.startTime}
          onChange={handleInputChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          End Time
        </label>
        <input
          type="datetime-local"
          name="endTime"
          value={booking.endTime}
          onChange={handleInputChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={priceDisplay}
          required
          disabled
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Payment Type
        </label>
        <input
          type="text"
          name="paymentType"
          value={booking.paymentType}
          onChange={handleInputChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tip
        </label>
        <input
          type="number"
          name="tip"
          value={booking.tip}
          onChange={handleInputChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p className="text-gray-600 text-xs italic mt-2">
          A tip is not required but is appreciated
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Booking
      </button>
    </form>
  );
};

export default BookingForm;
