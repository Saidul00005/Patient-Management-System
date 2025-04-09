import React, { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import AppointmentEditModal from "../components/AppointmentEditModal";
import { useTranslation } from "react-i18next";
import AppointmentCommentModal from "../components/AppointmentCommentModal";
import { AddComment } from "@mui/icons-material";

const EditDeleteAppointment = ({ appointmentId, onSave, onDelete }) => {
  const [appointments, setAppointments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);

  const [id, setId] = useState();
  const { t } = useTranslation();

  const { user } = useStateContext();
  console.log(user);

  const handleModalOpen = (id) => {
    setId(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleCommentModalOpen = (id) => {
    setId(id);
    setOpenCommentModal(true);
  };

  const handleCommentModalClose = () => {
    setOpenCommentModal(false);
  };

  const getAppointment = () => {
    axiosClient
      .get("api/print_appointments/")
      .then((res) => {
        setAppointments(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(appointments);
  console.log(localStorage.getItem("USER"));

  useEffect(() => {
    getAppointment();
  }, []);

  const handleDelete = (appointmentId) => {
    axiosClient
      .delete(`api/appointment/${appointmentId}/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        getAppointment();
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
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

  const handleCheckboxChange = (appointmentId, isSelected, name) => {
    // Update state first
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, [name]: !isSelected } // Toggle selected field
          : appointment
      )
    );

    // Send updated data to backend
    axiosClient
      .patch(`api/appointment-edit/${appointmentId}/`, {
        [name]: !isSelected, // Send the toggled value
      })
      .then((res) => {
        // getAppointment(); // Refresh data after update
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // height="100%"
        marginTop="16"
      >
        <Card elevation={3}>
          <CardContent>
            <TableContainer
              component={Paper}
              style={{ overflowY: "auto", overflowX: "hidden" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {t("Staff")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {t("Client")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {t("Appointment Date")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {t("Appointment Start")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {t("Appointment End")}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {t("Action")}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {t("Patient Arival")}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {t("Patient Informed")}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {t("Send Email/SMS")}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        {t("Comment")}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment?.id}>
                      <TableCell>
                        {appointment.staff_name} {appointment.staff_surname}
                      </TableCell>
                      <TableCell>
                        {appointment.client_name} {appointment.client_surname}
                      </TableCell>
                      <TableCell>{appointment?.appointment_date}</TableCell>
                      <TableCell>{appointment?.appointment_start}</TableCell>
                      <TableCell>{appointment?.appointment_end}</TableCell>

                      <TableCell sx={{ textAlign: "center" }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <BorderColorOutlinedIcon
                            sx={{ cursor: "pointer", color: "blue" }}
                            onClick={() => handleModalOpen(appointment?.id)}
                          />
                          <Box>.</Box>
                          <DeleteOutlineOutlinedIcon
                            onClick={() => handleDelete(appointment?.id)}
                            sx={{ cursor: "pointer", color: "red" }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Checkbox
                          checked={appointment.patient_arival || false}
                          // checked={selectedAppointments.includes(
                          //   appointment.id
                          // )}
                          onChange={() =>
                            handleCheckboxChange(
                              appointment.id,
                              appointment.patient_arival,
                              "patient_arival"
                            )
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Checkbox
                          checked={appointment.patient_informed}
                          onChange={() =>
                            handleCheckboxChange(
                              appointment.id,
                              appointment.patient_informed,
                              "patient_informed"
                            )
                          }
                        />
                      </TableCell>

                      <TableCell sx={{ textAlign: "center" }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 0 }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleSendEmail(appointment?.id)}
                          >
                            Email
                          </Button>
                          <Box>.</Box>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleSendSMS(appointment?.id)}
                          >
                            SMS
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {(user.user_role === "ADMIN" ||
                          appointment.client_staff_id === user.id) && (
                          <Box>
                            <AddComment
                              sx={{ cursor: "pointer", color: "blue" }}
                              onClick={() =>
                                handleCommentModalOpen(appointment.id)
                              }
                            />
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
      <AppointmentEditModal
        open={openModal}
        handleClose={handleModalClose}
        id={id}
        getAppointment={getAppointment}
      />
      <AppointmentCommentModal
        open={openCommentModal}
        handleClose={handleCommentModalClose}
        id={id}
        getAppointment={getAppointment}
      ></AppointmentCommentModal>
    </>
  );
};

export default EditDeleteAppointment;
