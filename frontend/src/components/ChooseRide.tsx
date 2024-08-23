import React, { useState } from "react";
import PaymentOptions from "./PaymentOptions";

const ChooseRide = () => {
  const rideOptions = [
    {
      type: "Uber Go",
      icon: "/ubergo.png", // Replace with your image path
      price: "₹607.11",
      time: "13 mins away · 3:59 PM",
      details: "Affordable compact rides",
      seats: 4,
    },
    {
      type: "Auto",
      icon: "/auto.png", // Replace with your image path
      price: "₹333.38",
      time: "6 mins away · 3:54 PM",
      details: "Pay directly to driver, cash/UPI only",
      seats: 3,
    },
    {
      type: "UberXL",
      icon: "/uberxl.png", // Replace with your image path
      price: "₹993.78",
      time: "8 mins away · 4:02 PM",
      details: "Comfortable SUVs",
      seats: 6,
    },
    {
      type: "Premier",
      icon: "/prem.png", // Replace with your image path
      price: "₹789.00",
      time: "8 mins away · 3:57 PM",
      details: "Premium rides at affordable rates",
      seats: 4,
    },
  ];

  const [isPaymentOptionsOpen, setPaymentOptionsOpen] = useState(false);

  const handlePaymentClick = () => {
    setPaymentOptionsOpen(true);
  };

  const closePaymentOptions = () => {
    setPaymentOptionsOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Choose a Ride</h3>

      <div className="space-y-4">
        {rideOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center p-4 border border-gray-300 rounded-lg hover:shadow-lg cursor-pointer"
          >
            <img
              src={option.icon}
              alt={option.type}
              className="w-16 h-16 mr-4"
            />
            <div className="flex-grow">
              <h4 className="text-lg font-semibold">{option.type}</h4>
              <p className="text-sm text-gray-500">
                {option.time} · {option.details}
              </p>
              <p className="text-sm text-gray-500">Seats: {option.seats}</p>
            </div>
            <div className="text-lg font-semibold text-right">
              {option.price}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button className="bg-black text-white rounded-lg py-2 px-4">
          Request {rideOptions[0].type}
        </button>
        <div className="flex flex-col">
          <div
            className="flex items-center cursor-pointer"
            onClick={handlePaymentClick}
          >
            <img
              src="/cash.png"
              alt="Cash"
              className="w-6 h-6 mr-2"
            />
            <span>Cash</span>
          </div>

          <PaymentOptions
            isOpen={isPaymentOptionsOpen}
            onClose={closePaymentOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseRide;
