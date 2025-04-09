// import React, { useEffect, useState } from "react";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// import Typography from "@mui/material/Typography";
// function DaysCalendar({events}) {
//   // const handleDateClick = (dateClickInfo) => {
//   //   const userInput = prompt(
//   //     "Enter the title, start time, and end time for the new event (Title, Start HH:mm, End HH:mm):"
//   //   );

//   //   if (userInput) {
//   //     const [newTitle, newStartTime, newEndTime] = userInput
//   //       .split(",")
//   //       .map((item) => item.trim());

//   //     if (newTitle && newStartTime && newEndTime) {
//   //       const startDateTimeStr = `${dateClickInfo.dateStr}T${newStartTime}:00`;
//   //       const endDateTimeStr = `${dateClickInfo.dateStr}T${newEndTime}:00`;
//   //       const newEvent = {
//   //         title: newTitle,
//   //         start: startDateTimeStr,
//   //         end: endDateTimeStr,
//   //         allDay: false,
//   //       };
//   //       setEvents((prevEvents) => [...prevEvents, newEvent]);
//   //       // we have to do the axios request to send the data to the server
//   //     } else {
//   //       alert(
//   //         "Please enter title, start time, and end time in the correct format."
//   //       );
//   //     }
//   //   }
//   // };

//   // const eventContent = (arg) => {
//   //   const startTime = new Date(arg.event.start).toLocaleTimeString([], {
//   //     hour: "2-digit",
//   //     minute: "2-digit",
//   //   });
//   //   const endTime = new Date(arg.event.end).toLocaleTimeString([], {
//   //     hour: "2-digit",
//   //     minute: "2-digit",
//   //   });
//   //   return (
//   //     <div>
//   //       <div>
//   //         <Typography variant="body1">
//   //           {startTime} - {endTime}
//   //         </Typography>
//   //       </div>
//   //       <div>
//   //         <Typography variant="body1">{arg.event.title}</Typography>
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   if(!events){
//     return <div>Loading</div>
//   }

//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin, interactionPlugin]}
//       initialView="dayGridMonth"
//       events={events}
//       // dateClick={handleDateClick}
//       // eventContent={eventContent}
//     />
//   );
// }

// export default DaysCalendar;

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const DaysCalendar = ({ events, onDateClick, onEventClick }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={onDateClick}
      eventClick={onEventClick}
      eventContent={renderEventContent}
      hiddenDays={[0]} // 0 represents Sunday
    />
  );
};

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

export default DaysCalendar;
