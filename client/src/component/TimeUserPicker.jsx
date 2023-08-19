import React, { useEffect, useState } from "react";

const TimeUserPicker = ({ hour, minute, setHour, setMinute }) => {
   
    const handleHourChange = (event) => {
        setHour(event.target.value);
      };
    
      const handleMinuteChange = (event) => {
        setMinute(event.target.value);
      };
    
      // Update time state when the hour or minute changes
      useEffect(() => {
        const updatedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        // Here you can perform any additional actions when the time is updated, if needed
      }, [hour, minute]);

  return (
    <div className="flex items-center w-full">
      <div className="flex items-center rounded overflow-hidden w-full">
        <select
          value={hour}
          onChange={handleHourChange}
          className="w-full px-2 py-1 text-center text-white/60 font-semibold bg-transparent border-b-2  border-b-blue-800 appearance-none focus:outline-none"
        >
          {Array.from({ length: 24 }, (_, index) => index.toString().padStart(2, "0")).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <span className="px-2 text-red-600 font-bold text-lg">:</span>
        <select
          value={minute}
          onChange={handleMinuteChange}
          className="w-full px-2 py-1 text-center text-white/60 font-semibold bg-transparent border-b-2  border-b-blue-800 appearance-none focus:outline-none"
        >
          {Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, "0")).map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeUserPicker;
