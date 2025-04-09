import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useStateContext } from "../context/ContextProvider";
import { useTranslation } from "react-i18next";
import CalendarCheckbox from "./SmallCalendar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AppointmentEditModal({
  id,
  open,
  handleClose,
  getAppointment,
  isDelete = false,
}) {
  const [staffUsers, setStaffUsers] = useState([]);
  const [clientUsers, setClientUsers] = useState([]);
  const [appointment, setAppointment] = useState({});

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedDateCalendar, setSelectedDateCalendar] = useState(new Date());

  const { t } = useTranslation();

  const { user } = useStateContext();

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (user?.user_role === "ADMIN" || user?.user_role === "STAFF") {
      Promise.all([
        axiosClient.get("api/staff-users/"),
        axiosClient.get("api/client-users/"),
      ])
        .then(([staffRes, clientRes]) => {
          setStaffUsers(staffRes?.data);
          setClientUsers(clientRes?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (id && open) {
      const fetchData = async () => {
        const getAppointmentResponse = await axiosClient.get(
          `api/appointment/${id}/`
        );
        const getAppointmentComments = await axiosClient.get(
          `api/comments/${id}/`
        );

        setAppointment({
          ...getAppointmentResponse?.data,
          comments: getAppointmentComments.data,
        });
        setSelectedClient(getAppointmentResponse?.data?.client_id);
        setSelectedStaff(getAppointmentResponse?.data?.staff_id);
      };
      fetchData();
    }
  }, [open, id]);
  // useEffect(() => {
  //     if (selectedStaff) {
  //         const filteredData = clientUsers.filter(user => user.assigned_staff === selectedStaff);
  //         setClientUsers(filteredData);
  //     }
  // }, [selectedStaff])

  const handleDelete = () => {
    axiosClient
      .delete(`api/appointment/${id}/`)
      .then((res) => {
        getAppointment();
        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    appointment["client_id"] = selectedClient
      ? selectedClient
      : appointment?.client_id;
    appointment["staff_id"] = selectedStaff
      ? selectedStaff
      : appointment?.staff_id;
    appointment["appointment_start_time_str"] =
      appointment?.appointment_start?.length === 5
        ? `${appointment?.appointment_start}:00`
        : appointment?.appointment_start;
    appointment["appointment_finish_time_str"] =
      appointment?.appointment_end?.length === 5
        ? `${appointment?.appointment_end}:00`
        : appointment?.appointment_end;
    if (selectedDateCalendar) {
      const date = formatDate(selectedDateCalendar);
      appointment["earlier_date"] = date;
    }
    axiosClient
      .put(`api/appointment-edit/${id}/`, appointment)
      .then((res) => {
        getAppointment();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              id="modal-modal-title"
              sx={{ fontSize: "18px", fontWeight: "500" }}
              variant="h4"
              component="h2"
            >
              Edit Appointment
            </Typography>
            <Typography
              onClick={handleClose}
              sx={{ cursor: "pointer" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              <CloseOutlinedIcon />
            </Typography>
          </Box>
          <hr
            style={{
              border: "none",
              borderBottom: "1px solid #e6ebf1",
              marginBottom: "25px",
            }}
          />
          <form onSubmit={handleSubmit}>
            <Box sx={{ "& .MuiTextField-root": { marginBottom: "1rem" } }}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{ marginBottom: "1rem" }}
              >
                <InputLabel id="client-select-label">Select Staff</InputLabel>
                <Select
                  labelId="client-select-label"
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                  label="Select Client"
                  disabled
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
                <InputLabel id="client-select-label">Select Client</InputLabel>
                <Select
                  labelId="client-select-label"
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  label="Select Client"
                  disabled
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
                type="date"
                label="Date of Appointment"
                variant="outlined"
                name="appointment_date"
                InputLabelProps={{ shrink: true }}
                value={appointment?.appointment_date}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                type="time"
                label="Time of Appointment (start)"
                variant="outlined"
                name="appointment_start"
                InputLabelProps={{ shrink: true }}
                value={appointment?.appointment_start}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                type="time"
                label="Time of Appointment (end)"
                variant="outlined"
                name="appointment_end"
                InputLabelProps={{ shrink: true }}
                value={appointment?.appointment_end}
                onChange={handleChange}
              />
              <CalendarCheckbox
                selectedDateCalendar={selectedDateCalendar}
                setSelectedDateCalendar={setSelectedDateCalendar}
                selectedClient={selectedClient}
              />
              <Box sx={{ my: 2 }}>
                <Typography
                  id="modal-modal-title"
                  sx={{ fontSize: "18px", fontWeight: "500" }}
                  variant="h4"
                  component="h2"
                >
                  Comments
                </Typography>
                <hr
                  style={{
                    border: "none",
                    borderBottom: "1px solid #e6ebf1",
                    marginBottom: 1,
                  }}
                />
                {appointment &&
                  appointment?.comments &&
                  appointment?.comments.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{
                                color: "text.primary",
                                display: "inline",
                                mr: 1,
                                fontWeight: "bold",
                              }}
                            >
                              {item?.comment_text}
                            </Typography>
                            {`— by ${item?.user?.username}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
              </Box>
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            {isDelete && (
              <Button
                type="button"
                onClick={handleDelete}
                variant="contained"
                sx={{ ml: 1 }}
                color="error"
              >
                Delete
              </Button>
            )}
          </form>
        </Box>
      </Modal>
    </div>
  );
}
