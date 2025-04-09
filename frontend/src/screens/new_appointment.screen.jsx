// import React, { useState, useRef, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// import axiosClient from "../axiosClient";

// const AppointmentForm = () => {
//   const [message, setMessage] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [staff, setStaff] = useState([]);

//   const dateRef = useRef(null);
//   const clientRef = useRef(null);
//   const timestartRef = useRef(null);
//   const timeendRef = useRef(null);
//   const staffRef = useRef(null);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const payload = {
//       client_id: clientRef.current.value,
//       staff_id: staffRef.current.value,
//       appointment_start_time_str: timestartRef.current.value,
//       appointment_finish_time_str: timeendRef.current.value,
//       appointment_date: dateRef.current.value,
//     };

//     axiosClient
//       .post("api/create_appointment/", payload)
//       .then(() => {
//         setMessage("Appointment added successfully!");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     axiosClient
//       .get("api/print_all_users/")
//       .then((data) => {
//         setUsers(data.data.clients);
//         setStaff(data.data.staff_members);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <Card elevation={16}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           Appointment Details
//         </Typography>
//         {message && (
//           <Typography variant="body1" color="green" gutterBottom>
//             {message}
//           </Typography>
//         )}
//         <form onSubmit={handleSubmit}>
//           <Box sx={{ "& .MuiTextField-root": { marginBottom: "1rem" } }}>
//             <FormControl
//               fullWidth
//               variant="outlined"
//               sx={{ marginBottom: "1rem" }}
//             >
//               <InputLabel id="client-select-label">Select Client</InputLabel>
//               <Select
//                 labelId="client-select-label"
//                 inputRef={clientRef}
//                 label="Select Client"
//               >
//                 {users.map((user) => (
//                   <MenuItem
//                     value={user.id}
//                     lastname={user.user.last_name}
//                   >{`${user.user.first_name} ${user.user.last_name}`}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl
//               fullWidth
//               variant="outlined"
//               sx={{ marginBottom: "1rem" }}
//             >
//               <InputLabel id="client-select-label">Select Staff</InputLabel>
//               <Select
//                 labelId="client-select-label"
//                 inputRef={staffRef}
//                 label="Select Client"
//               >
//                 {staff.map((st) => (
//                   <MenuItem
//                     value={st.id}
//                     lastname={st.user.last_name}
//                   >{`${st.user.first_name} ${st.user.last_name}`}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               type="date"
//               label="Date of Appointment"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               inputRef={dateRef}
//             />
//             <TextField
//               fullWidth
//               type="time"
//               label="Time of Appointment (start)"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               inputRef={timestartRef}
//             />
//             <TextField
//               fullWidth
//               type="time"
//               label="Time of Appointment (end)"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               inputRef={timeendRef}
//             />
//           </Box>
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default AppointmentForm;
/////////////////////////////////////////////////////////////////

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { SketchPicker } from "react-color";

// import axiosClient from "../axiosClient";

// const AppointmentForm = () => {
//   const [message, setMessage] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [color, setColor] = useState("#ffffff");

//   const dateRef = useRef(null);
//   const clientRef = useRef(null);
//   const timestartRef = useRef(null);
//   const timeendRef = useRef(null);
//   const staffRef = useRef(null);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const payload = {
//       client_id: clientRef.current.value,
//       staff_id: staffRef.current.value,
//       appointment_start_time_str: timestartRef.current.value,
//       appointment_finish_time_str: timeendRef.current.value,
//       appointment_date: dateRef.current.value,
//       color: color,
//     };

//     axiosClient
//       .post("api/create_appointment/", payload)
//       .then(() => {
//         setMessage("Appointment added successfully!");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     axiosClient
//       .get("api/print_all_users/")
//       .then((data) => {
//         setUsers(data.data.clients);
//         setStaff(data.data.staff_members);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <Card elevation={16}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           Appointment Details
//         </Typography>
//         {message && (
//           <Typography variant="body1" color="green" gutterBottom>
//             {message}
//           </Typography>
//         )}
//         <form onSubmit={handleSubmit}>
//           <Box sx={{ "& .MuiTextField-root": { marginBottom: "1rem" } }}>
//             <FormControl
//               fullWidth
//               variant="outlined"
//               sx={{ marginBottom: "1rem" }}
//             >
//               <InputLabel id="client-select-label">Select Client</InputLabel>
//               <Select
//                 labelId="client-select-label"
//                 inputRef={clientRef}
//                 label="Select Client"
//               >
//                 {users.map((user) => (
//                   <MenuItem
//                     key={user.id}
//                     value={user.id}
//                     lastname={user.user.last_name}
//                   >{`${user.user.first_name} ${user.user.last_name}`}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl
//               fullWidth
//               variant="outlined"
//               sx={{ marginBottom: "1rem" }}
//             >
//               <InputLabel id="client-select-label">Select Staff</InputLabel>
//               <Select
//                 labelId="client-select-label"
//                 inputRef={staffRef}
//                 label="Select Client"
//               >
//                 {staff.map((st) => (
//                   <MenuItem
//                     key={st.id}
//                     value={st.id}
//                     lastname={st.user.last_name}
//                   >{`${st.user.first_name} ${st.user.last_name}`}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               type="date"
//               label="Date of Appointment"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               inputRef={dateRef}
//             />
//             <TextField
//               fullWidth
//               type="time"
//               label="Time of Appointment (start)"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               inputRef={timestartRef}
//             />
//             <TextField
//               fullWidth
//               type="time"
//               label="Time of Appointment (end)"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               inputRef={timeendRef}
//             />
//             <Typography variant="body1" gutterBottom>
//               Pick a color for the appointment:
//             </Typography>
//             <SketchPicker color={color} onChangeComplete={newColor => setColor(newColor.hex)} />
//           </Box>
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default AppointmentForm;

//////////////////////////////
import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import axiosClient from "../axiosClient";
import { useTranslation } from "react-i18next";
import CalendarCheckbox from "../components/SmallCalendar";
const patients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Michael Johnson" },
  { id: 4, name: "Michael Johnson" },
  { id: 5, name: "Michael Johnson" },
  { id: 6, name: "Michael Johnson" },
  { id: 7, name: "Michael Johnson 123123123" },
];
const AppointmentForm = () => {
  const [message, setMessage] = useState([]);
  const [error, setError] = useState("");

  const [staffUsers, setStaffUsers] = useState([]);
  const [clientUsers, setClientUsers] = useState([]);

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isSendSMS, setIsSendSMS] = useState(false);
  const [isCheckEarlier, setIsCheckEarlier] = useState(false);

  const [earlierPatientsList, setEarlierPatientsList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Stores the selected date

  const [selectedDateCalendar, setSelectedDateCalendar] = useState(new Date());

  const { t } = useTranslation();

  const dateRef = useRef(null);
  const clientRef = useRef(null);
  const timestartRef = useRef(null);
  const timeendRef = useRef(null);
  const staffRef = useRef(null);

  useEffect(() => {
    if (selectedDate && selectedStaff) {
      getEarlierPatients(dateRef.current.value, selectedStaff);
    }
  }, [selectedDate, selectedStaff]);

  const getEarlierPatients = (date, staff) => {
    axiosClient
      .get("api/print_appointments/?earlier_date=" + date + "&staff=" + staff)
      .then((data) => {
        setEarlierPatientsList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Clear previous messages and set loading state
    setMessage("");
    setError("");

    const payload = {
      client_id: selectedClient,
      staff_id: selectedStaff,
      appointment_start_time_str: timestartRef.current.value,
      appointment_finish_time_str: timeendRef.current.value,
      appointment_date: dateRef.current.value,
    };
    if (selectedDateCalendar) {
      const date = formatDate(selectedDateCalendar);

      payload.earlier_date = date;
    }

    // Basic validation
    if (
      !selectedClient ||
      !selectedStaff ||
      !payload.appointment_start_time_str ||
      !payload.appointment_finish_time_str ||
      !payload.appointment_date
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    axiosClient
      .post("api/appointment/", payload)
      .then((res) => {
        if (res?.status === 201) {
          if (isSendEmail) handleSendEmail(res?.data?.id);
          if (isSendSMS) handleSendSMS(res?.data?.id);

          setMessage("Appointment added successfully!");
        }
      })
      .catch((err) => {
        setError(err?.response?.data?.error || "An unexpected error occurred.");
        alert("something went wrong");
      });
  };

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
    Promise.all([
      axiosClient.get("api/staff-users/"),
      axiosClient.get("api/client-users/"),
    ]).then(([staffRes, clientRes]) => {
      setStaffUsers(staffRes?.data);
      setClientUsers(clientRes?.data);
    });
  }, []);

  // Update state when the input value changes
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    if (selectedStaff) {
      const filteredData = clientUsers.filter(
        (user) => user.assigned_staff === selectedStaff
      );
      setClientUsers(filteredData);
    }
    // eslint-disable-next-line
  }, [selectedStaff]);

  return (
    <Card elevation={16}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {t("Appointment Details")}
        </Typography>
        {message && (
          <Typography variant="body1" color="green" gutterBottom>
            {message}
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="red" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Box sx={{ "& .MuiTextField-root": { marginBottom: "1rem" } }}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "1rem" }}
            >
              <InputLabel id="staff-select-label">
                {t("Select Staff")}
              </InputLabel>
              <Select
                labelId="staff-select-label"
                inputRef={staffRef}
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                label={t("Select Staff")}
              >
                {staffUsers.map((st) => (
                  <MenuItem
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
                inputRef={clientRef}
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                label={t("Select Client")}
              >
                {clientUsers.map((user) => (
                  <MenuItem
                    value={user.id}
                    lastname={user.custom_user.last_name}
                  >{`${user.custom_user.first_name} ${user.custom_user.last_name}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="date"
              label={t("Date of Appointment")}
              variant="outlined"
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              inputRef={dateRef}
            />
            <TextField
              fullWidth
              type="time"
              label={t("Time of Appointment (start)")}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              inputRef={timestartRef}
            />
            <TextField
              fullWidth
              type="time"
              label={t("Time of Appointment (end)")}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              inputRef={timeendRef}
            />
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => setIsSendEmail(e.target.checked)}
                  />
                }
                label={t("Send Email to client")}
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => setIsSendSMS(e.target.checked)} />
                }
                label={t("Send SMS to client")}
              />

              <CalendarCheckbox
                selectedDateCalendar={selectedDateCalendar}
                setSelectedDateCalendar={setSelectedDateCalendar}
                selectedClient={selectedClient}
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
          <Button type="submit" variant="contained" color="primary">
            {t("Submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
