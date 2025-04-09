// import React, { useState, useEffect } from "react";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// function HoursCalendar({events}) {

//   // const slotLabelFormat = {
//   //   hour: "2-digit",
//   //   minute: "2-digit",
//   //   omitZeroMinute: false,
//   //   hour12: false,
//   // };

//   // const handleDateClick = (clickInfo) => {
//   //   const userInput = prompt(
//   //     "Enter the title and end time for the new event (Title, End HH:mm):"
//   //   );
//   //   if (userInput) {
//   //     const [newTitle, newEndTime] = userInput
//   //       .split(",")
//   //       .map((item) => item.trim());

//   //     const [endHour, endMinute] = newEndTime.split(":");

//   //     const endDateTime = new Date(
//   //       clickInfo.date.getFullYear(),
//   //       clickInfo.date.getMonth(),
//   //       clickInfo.date.getDate(),
//   //       parseInt(endHour),
//   //       parseInt(endMinute)
//   //     );

//   //     const newEvent = {
//   //       title: newTitle,
//   //       start: clickInfo.date,
//   //       end: endDateTime,
//   //     };
//   //     setEvents([...events, newEvent]);
//   //     // we have to do the axios request to send the data to the server
//   //   } else {
//   //     alert("Please enter title and end time in the correct format.");
//   //   }
//   // };

//   if(!events){
//     return <div>Loading</div>
//   }

//   return (
//     <FullCalendar
//       plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
//       initialView="timeGridDay"
//       events={events}
//       // dateClick={handleDateClick}
//       // slotLabelFormat={slotLabelFormat}
//     />
//   );
// }

// export default HoursCalendar;

import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const HoursCalendar = ({ events, onDateClick, onEventClick, date = null }) => {
  const initialDate = date ? new Date(date) : new Date();

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridDay"
      events={events}
      dateClick={onDateClick}
      eventClick={onEventClick}
      eventContent={renderEventContent}
      initialDate={initialDate.toISOString().split("T")[0]}
      slotLabelContent={(slotInfo) =>
        renderSlotLabelContent(slotInfo, initialDate, onDateClick)
      }
      slotDuration="00:30:00"
      slotLabelInterval="00:30:00"
      slotLabelFormat={{
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }}
    />
  );
};

function renderSlotLabelContent(slotInfo, initialDate, onDateClick) {
  const slotTime = new Date(initialDate);
  const [hours, minutes] = slotInfo.text.split(":");

  // Adjust the slot date to match the displayed time
  slotTime.setHours(parseInt(hours), parseInt(minutes), 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 10px",
      }}
    >
      <span style={{ fontSize: "14px" }}>{slotInfo.text}</span>
      <button
        onClick={() => onDateClick(slotTime)}
        style={{
          background: "grey",
          border: "none",
          cursor: "pointer",
          fontSize: "10px",
          color: "white",
          marginLeft: "8px",
          borderRadius: "2px",
          padding: "2px 4px",
        }}
        title="Add Event"
      >
        Add
      </button>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div
      style={{
        background: eventInfo.event.extendedProps.clr,
        color: "#fff",
        overflow: "hidden",
        borderRadius: "4px",
      }}
      className="fc-daygrid-dot-event"
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
}

export default HoursCalendar;
