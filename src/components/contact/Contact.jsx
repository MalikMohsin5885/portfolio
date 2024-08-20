import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-lilac-chi.vercel.app/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin" : "*",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error sending the message.");
    }
  };

  const handleGetRequest = async () => {
    try {
      const response = await fetch("https://backend-lilac-chi.vercel.app/contact");
      if (response.ok) {
        const data = await response.json();
        console.log("GET Response:", data);
        alert("GET request was successful!");
      } else {
        alert("GET request failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error with the GET request.");
    }
  };

  return (
    <div id="contact" className="container m-auto mt-16">
      <div className="relative mb-5">
        <h3 className="text-3xl font-black text-gray-400 sm:text-2xl">Contact</h3>
        <span className="h-[1.1px] right-0 absolute w-[92%] bg-gray-300 block"></span>
      </div>

      {/* card */}
      <div className="card-wrapper w-[90%] sm:w-[100%] mx-auto mt-5 flex items-center justify-center sm:flex-col">
        <div className="left w-[70%] flex-1 flex items-center justify-center sm:flex-col sm:w-full">
          <div className="flex-3 w-1/2 gap-3 flex items-end justify-end flex-col sm:w-3/4">
            <div data-aos="zoom-in">
              <h1 className="text-5xl font-bold sm:text-3xl">You Need</h1>
              <h3 className="text-xl sm:text-lg">Beautiful design for your website leave a request</h3>
            </div>
          </div>
          <div className="flex p-5 items-center justify-center">
            <button
              data-aos="zoom-in"
              className="text-yellow-500 font-extrabold text-3xl p-2 rounded-lg shadow-[0_0_10px_1px_rgba(0,0,0,0.1)]"
            >
              <BsArrowRight className="md:rotate-90" />
            </button>
          </div>
        </div>
        <div className="right flex-1">
          <form
            data-aos="zoom-in"
            className="flex justify-center items-center flex-col gap-5 w-[70%] md:w-[100%] sm:w-[95%] mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              className="px-3 shadow-[0_0_16px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg w-full"
              type="email"
              placeholder="e.g. example@email.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="px-3 shadow-[0_0_16px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg w-full"
              type="text"
              placeholder="e.g. John Doe"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              className="px-3 shadow-[0_0_16px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg w-full"
              rows="4"
              placeholder="Write your message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button
              className="bg-yellow-500 w-full text-white font-semibold p-2 rounded-lg flex items-center justify-center space-x-1"
              type="submit"
            >
              <span>Send</span>
              <RiSendPlaneFill />
            </button>
          </form>
          <button
            className="bg-blue-500 mt-5 w-full text-white font-semibold p-2 rounded-lg flex items-center justify-center space-x-1"
            onClick={handleGetRequest}
          >
            <span>Get Req</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
