import { useEffect, useRef } from "react";
import axiosClient from "../axiosClient";

const AppointmentAlerts = ({ appointments }) => {
  const hasRun = useRef(false); // Track if it has run already

  useEffect(() => {
    if (hasRun.current) return; // Prevents multiple executions
    if (appointments.length > 0) hasRun.current = true; // Mark as executed

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part

    let twoDayAlerts = [];
    let weekAlerts = [];

    appointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.appointment_date);
      const daysDifference = Math.floor(
        (appointmentDate - today) / (1000 * 60 * 60 * 24)
      );

      if (
        daysDifference >= 0 &&
        daysDifference <= 2 &&
        !appointment.reminder_two_day
      ) {
        twoDayAlerts.push(
          `Reminder: ${appointment.title} has an appointment on ${appointment.appointment_date} in less than 2 days!`
        );
        axiosClient.patch(`api/appointment-edit/${appointment.id}/`, {
          reminder_two_day: true,
        });
      }

      if (
        daysDifference >= 0 &&
        daysDifference <= 7 &&
        !appointment.reminder_week
      ) {
        weekAlerts.push(
          `Reminder: ${appointment.title} has an appointment on ${appointment.appointment_date} in less than a week!`
        );
        axiosClient.patch(`api/appointment-edit/${appointment.id}/`, {
          reminder_week: true,
        });
      }
    });

    // Show alerts in correct order (week reminder first)
    if (weekAlerts.length > 0) {
      alert(weekAlerts.join("\n"));
    }

    if (twoDayAlerts.length > 0) {
      alert(twoDayAlerts.join("\n"));
    }
  }, [appointments]); // Empty dependency array ensures it runs once on mount

  return null;
};

export default AppointmentAlerts;
