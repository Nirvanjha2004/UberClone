import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDate, getTime } from '../features/counter/pickUpTimeSlice';

const PickupModal = ({ isOpen, onClose }) => {

    const [date, setDate] = useState();
    const [time, setTime] = useState();

    const dispatch = useDispatch();
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          width: '350px',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h2 className="font-bold text-lg mb-4">When do you want to be picked up?</h2>

        {/* Date Selection */}
        <div className="mb-4"
        onChange={(e)=>{
            e.preventDefault();
            dispatch(getDate(e.target.value));
            setDate(e.target.value);
        }}>
          <label className="block font-semibold mb-2" htmlFor="pickupDate">
            Date
          </label>
          <select id="pickupDate" className="w-full border rounded p-2">
            <option>Today</option>
            <option>Tomorrow</option>
            <option>In 2 Days</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Time Selection */}
        <div className="mb-4" onChange={(e)=>{
            e.preventDefault();
            dispatch(getTime(e.target.value));
            setTime(e.target.value);
        }}>
          <label className="block font-semibold mb-2" htmlFor="pickupTime">
            Time
          </label>
          <select id="pickupTime" className="w-full border rounded p-2">
            <option>Now</option>
            <option>In 30 minutes</option>
            <option>In 1 hour</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="text-left">
          <p className="text-sm">Choose your pickup time up to 90 days in advance.</p>
          <p className="text-sm">Extra wait time included to meet your ride.</p>
          <p className="text-sm">Cancel at no charge up to 60 minutes in advance.</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-black text-white rounded-lg py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PickupModal;
