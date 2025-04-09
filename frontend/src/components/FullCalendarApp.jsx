// import React, { useState, useEffect } from "react";

// import Button from "@mui/material/Button";
// import DaysCalendar from "./DaysCalendar";
// import HoursCalendar from "./HoursCalendar";

// import axiosClient from "../axiosClient";
// import { useStateContext } from "../context/ContextProvider";

// function FullCalendarApp() {
//   const [view, setView] = useState("dayGridMonth");
//   const [events, setEvents] = useState([]);
//   const { user } = useStateContext();

//   const handleSwitchView = () => {
//     setView(view === "dayGridMonth" ? "timeGridDay" : "dayGridMonth");
//   };

//   useEffect(() => {
//     axiosClient
//       .get("api/print_appointments/")
//       .then((data) => {
//         const correctData = data.data.filter((event) => {
//           if (
//             (event.staff_name == user.first_name &&
//               event.staff_surname == user.last_name &&
//               user.user_role == "STAFF") ||
//             (event.client_name == user.first_name &&
//               event.client_surname == user.last_name &&
//               user.user_role == "CLIENT") ||
//             user.user_role == "ADMIN"
//           ) {
//             return event;
//           }
//         });
//         const transformedResult = Object.entries(correctData).map(
//           ([key, value]) => {
//             return {
//               title: `${value.client_name} ${value.client_surname}`,
//               start: `${value.appointment_date}T${value.appointment_start}`,
//               end: `${value.appointment_date}T${value.appointment_end}`,
//             };
//           }
//           // Transformation logic goes here
//         );
//         console.log(transformedResult);
//         setEvents(transformedResult);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [user]);

//   return (
//     <div>
//       <Button variant="contained" onClick={handleSwitchView}>
//         {view === "dayGridMonth"
//           ? "Switch to Daily Schedule"
//           : "Switch to Month View"}
//       </Button>
//       {view === "dayGridMonth" ? (
//         <DaysCalendar events={events} />
//       ) : (
//         <HoursCalendar events={events} />
//       )}
//     </div>
//   );
// }

// export default FullCalendarApp;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DaysCalendar from "./DaysCalendar";
import HoursCalendar from "./HoursCalendar";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";
import AppointmentEditModal from "./AppointmentEditModal";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AppointmentAlerts from "./AppointmentReminder";
import CalendarCheckbox from "./SmallCalendar";

function FullCalendarApp() {
  const [view, setCalendarView] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [displayComment, setDisplayComment] = useState(false); // Default checked

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  const [date, setDate] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { t } = useTranslation();

  const [color] = useState("#ffffff");
  // const [formData, setFormData] = useState({
  //   client_id: "",
  //   staff_id: "",
  //   appointment_start_time_str: "",
  //   appointment_finish_time_str: "",
  // });

  const [staffUsers, setStaffUsers] = useState([]);
  const [clientUsers, setClientUsers] = useState([]);

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isSendSMS, setIsSendSMS] = useState(false);
  const [isCheckEarlier, setIsCheckEarlier] = useState(false);
  const [earlierPatientsList, setEarlierPatientsList] = useState([]);
  const [selectedDateCalendar, setSelectedDateCalendar] = useState(new Date());

  const { user, setView } = useStateContext();

  const getEarlierPatients = (selectedStaff) => {
    axiosClient
      .get(
        "api/print_appointments/?earlier_date=" +
          date +
          "&staff=" +
          selectedStaff
      )
      .then((data) => {
        setEarlierPatientsList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (selectedDateCalendar && selectedStaff) {
      getEarlierPatients(selectedStaff);
    }
  }, [selectedDateCalendar, selectedStaff]);

  useEffect(() => {
    if (open) {
      setEarlierPatientsList([]);
    }
  }, [open]);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSwitchView = () => {
    setCalendarView(view === "dayGridMonth" ? "timeGridDay" : "dayGridMonth");
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  const getEventList = () => {
    axiosClient
      .get("api/print_appointments/")
      .then((data) => {
        const correctData = data.data.filter((event) => {
          if (
            (event.staff_name === user.first_name &&
              event.staff_surname === user.last_name &&
              user.user_role === "STAFF") ||
            (event.client_name === user.first_name &&
              event.client_surname === user.last_name &&
              user.user_role === "CLIENT") ||
            user.user_role === "ADMIN"
          ) {
            return event;
          }
          return null;
        });
        const transformedResult = correctData.map((value) => {
          return {
            title: `${value.client_name} ${value.client_surname}`,
            start: `${value.appointment_date}T${value.appointment_start}`,
            end: `${value.appointment_date}T${value.appointment_end}`,
            clr: value.color || "#000000",
            appointmentId: value?.id,
            reminder_two_day: value.reminder_two_day,
            reminder_week: value.reminder_week,
            appointment_date: value.appointment_date,
            id: value.id,
          };
        });
        setEvents(transformedResult);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user?.user_role === "STAFF" || user?.user_role === "ADMIN") {
      getEventList();
    }

    if (user?.user_role === "CLIENT") {
      axiosClient
        .get(`api/client-appointments/${user?.id}`)
        .then((res) => {
          const transformedResult = res?.data?.map((value) => {
            return {
              title: `${value.staff_name} ${value.staff_surname}`,
              start: `${value.appointment_date}T${value.appointment_start}`,
              end: `${value.appointment_date}T${value.appointment_end}`,
              clr: value.color || "#000000",
              appointmentId: value?.id,
            };
          });
          setEvents(transformedResult);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [user]);

  const handleSendEmail = (id) => {
    axiosClient
      .post("api/send_email/", {
        appointment_id: id,
      })
      .then((res) => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSendSMS = (id) => {
    axiosClient
      .post(`api/send_appointment_info/${id}/`)
      .then((res) => {
        console.log("SMS sent");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user?.user_role === "ADMIN" || user?.user_role === "STAFF") {
      Promise.all([
        axiosClient.get("api/staff-users/"),
        axiosClient.get("api/client-users/"),
      ]).then(([staffRes, clientRes]) => {
        setStaffUsers(staffRes?.data);
        setClientUsers(clientRes?.data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedStaff) {
      const filteredData = clientUsers.filter(
        (user) => user.assigned_staff === selectedStaff
      );
      setClientUsers(filteredData);
    }
    // eslint-disable-next-line
  }, [selectedStaff]);

  const handleDateClick = (arg) => {
    setCalendarView("timeGridDay");
    setDate(arg.dateStr);
    // if (user?.user_role === 'STAFF' || user?.user_role === 'ADMIN') {
    //   setDate(arg.dateStr);
    //   setOpen(true);
    // }
  };

  const handleHourClick = (arg) => {
    console.log("========", arg);

    if (arg.dateStr) {
      if (user?.user_role === "STAFF" || user?.user_role === "ADMIN") {
        setOpen(true);

        const dateTime = new Date(arg.dateStr);
        const startTime = new Date(arg.dateStr);
        const endTime = new Date(startTime.getTime() + 30 * 60000);

        setDate(formatDate(dateTime));
        setStartTime(formatTime(startTime));
        setEndTime(formatTime(endTime));
      }
    } else {
      if (user?.user_role === "STAFF" || user?.user_role === "ADMIN") {
        setOpen(true);

        const dateTime = arg;
        const startTime = arg;
        const endTime = new Date(startTime.getTime() + 30 * 60000);

        setDate(formatDate(dateTime));
        setStartTime(formatTime(startTime));
        setEndTime(formatTime(endTime));
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient("");
    setSelectedStaff("");
    setStartTime("");
    setEndTime("");
  };

  const handleEventClick = (event) => {
    if (user?.user_role === "STAFF" || user?.user_role === "ADMIN") {
      setOpenEditModal(true);
      setSelectedEvent(event?.event?.extendedProps?.appointmentId);
    }
  };

  const [comment, setComment] = useState("");
  const [visibility, setVisibility] = useState(true);
  const handleSubmit = () => {
    // Check if the comment is required
    if (displayComment) {
      if (!comment || typeof comment !== "string" || !comment.trim()) {
        alert("Please fill out the required comment field.");
        return; // Exit if the comment is invalid
      }
    }

    if (
      !selectedClient ||
      !selectedStaff ||
      !startTime ||
      !endTime ||
      !date ||
      !color
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    const payload = {
      client_id: selectedClient,
      staff_id: selectedStaff,
      appointment_start_time_str: startTime,
      appointment_finish_time_str: endTime,
      appointment_date: date,
      color: color,
    };
    if (selectedDateCalendar) {
      const date = formatDate(selectedDateCalendar);
      payload.earlier_date = date;
    }

    axiosClient
      .post("api/appointment/", payload)
      .then((response) => {
        if (response?.status === 201) {
          // Handle optional actions
          if (displayComment) handleSave(response?.data?.id);
          if (isSendEmail) handleSendEmail(response?.data?.id);
          if (isSendSMS) handleSendSMS(response?.data?.id);

          // Refresh and close modal
          getEventList();
          handleClose();
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.error || "An error occurred. Please try again.";
        console.error("Submission Error:", errorMessage);
        alert(errorMessage);
      });
  };

  const handleSave = async (id) => {
    try {
      const response = await axiosClient.post("api/comments/create/", {
        appointment: id,
        comment_text: comment,
        visibility: visibility, // Uncomment and add this if the API expects it
      });
      console.log("Comment saved:", response.data);
      setComment("");
    } catch (error) {
      // Log the full error response
      if (error.response) {
        console.error("Error response:", error.response);
        alert(`Error saving comment: ${error.response.data}`);
      } else {
        console.error("Error saving comment:", error);
      }
    }
  };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  return (
    <div>
      <Button variant="contained" onClick={handleSwitchView}>
        {view === "dayGridMonth"
          ? `${t("Switch to Daily Schedule")}`
          : `${t("Switch to Month View")}`}
      </Button>
      {view === "dayGridMonth" ? (
        <DaysCalendar
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      ) : (
        <HoursCalendar
          events={events}
          onDateClick={handleHourClick}
          onEventClick={handleEventClick}
          date={date}
        />
      )}
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>{t("Add New Appointment")}</DialogTitle>
        <Box
          fullWidth
          sx={{ display: "flex", gap: 2, mx: 3, justifyContent: "center" }}
        >
          <Button
            onClick={() => setView("edit_delete_appointment")}
            variant="contained"
          >
            {t("Edit / Delete Appointment")}
          </Button>
          <Button onClick={() => setView("staff")} variant="contained">
            {t("Client to Staff")}
          </Button>
        </Box>
        <DialogContent>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
          >
            <InputLabel id="staff-select-label">{t("Select Staff")}</InputLabel>
            <Select
              labelId="client-select-label"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              label={`${t("Select Staff")}`}
              required
            >
              {staffUsers.map((st, i) => (
                <MenuItem
                  key={i}
                  value={st.id}
                  lastname={st.custom_user.last_name}
                >{`${st.custom_user.first_name} ${st.custom_user.last_name}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
          >
            <InputLabel id="client-select-label">
              {t("Select Client")}
            </InputLabel>
            <Select
              labelId="client-select-label"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              label={`${t("Select Client")}`}
              required
            >
              {clientUsers.map((user, i) => (
                <MenuItem
                  key={i}
                  value={user.id}
                  lastname={user.custom_user.last_name}
                >{`${user.custom_user.first_name} ${user.custom_user.last_name}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="time"
            label={`${t("Time of Appointment (start)")}`}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="appointment_start_time_str"
            value={startTime || ""}
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
            sx={{ marginBottom: "1rem" }}
            required
          />
          <TextField
            fullWidth
            type="time"
            label={`${t("Time of Appointment (end)")}`}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="appointment_finish_time_str"
            value={endTime || ""}
            onChange={(e) => setEndTime(e.target.value)}
            sx={{ marginBottom: "1rem" }}
            required
          />

          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => setDisplayComment(e.target.checked)} // Set visibility state based on checkbox
              />
            }
            label="Comment"
          />
          {displayComment && (
            <Box>
              <FormGroup sx={{ mt: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => setVisibility(e.target.checked)} // Use e.target.checked
                    />
                  }
                  label="View By Client"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={1}
                  value={comment}
                  variant="outlined"
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your comment"
                  sx={{ my: 1 }}
                />
              </FormGroup>
            </Box>
          )}
          <Box display={"flex"}>
            <FormGroup sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => setIsSendEmail(e.target.checked)}
                  />
                }
                label={`${t("Send Email to client")}`}
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => setIsSendSMS(e.target.checked)} />
                }
                label={`${t("Send SMS to client")}`}
              />
              <CalendarCheckbox
                selectedDateCalendar={selectedDateCalendar}
                setSelectedDateCalendar={setSelectedDateCalendar}
              />
            </FormGroup>
            <Box
              sx={{
                maxWidth: "100%",
                overflowX: "auto",
                border: "1px solid black",
                padding: 2,
                maxHeight: "300px",
              }}
            >
              <h4>Patients</h4>

              <List>
                {earlierPatientsList.map((patient) => (
                  <ListItem key={patient.id} divider>
                    <ListItemText primary={patient.client_name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
      <AppointmentEditModal
        open={openEditModal}
        id={selectedEvent}
        handleClose={handleEditModalClose}
        getAppointment={getEventList}
        isDelete={true}
      />
      {user && (user.user_role === "STAFF" || user.user_role === "ADMIN") && (
        <AppointmentAlerts appointments={events} />
      )}
    </div>
  );
}

export default FullCalendarApp;
