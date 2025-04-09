import React, { useEffect, useState } from "react";

const DailyPopup = () => {
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const today = now.toDateString();

      const lastDismissed = localStorage.getItem("popupDismissed");
      if (hours >= 18 && lastDismissed !== today) {
        // Show popup if not dismissed today
        alert("Please fill if a patient arrival to appointment.");

        // Store today's date in localStorage **AFTER** user clicks "OK"
        localStorage.setItem("popupDismissed", today);
      }
    };

    const interval = setInterval(checkTime, 600); // Check every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return null;
};

export default DailyPopup;
