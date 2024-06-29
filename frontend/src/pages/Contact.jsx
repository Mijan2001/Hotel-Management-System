import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/contact", formData)
      .then((res) => {
        console.log(res.data);
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error sending message");
        navigate("/");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 p-5">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-gray-800 text-2xl mb-5">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 text-lg rounded border border-gray-300 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 text-lg rounded border border-gray-300 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-600">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="p-3 text-lg rounded border border-gray-300 outline-none resize-none"
              rows="4"
              required
            />
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className="p-3 text-lg text-white bg-indigo-500 rounded cursor-pointer transition-colors duration-300 hover:bg-indigo-700"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
