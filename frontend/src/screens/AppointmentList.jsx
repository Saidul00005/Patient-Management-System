import React, { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";
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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MyAppointmentCommentModal from "../components/MyAppointmentCommentModal";
import { AddComment } from "@mui/icons-material";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);

  const [id, setId] = useState();
  const { t } = useTranslation();

  const { user } = useStateContext();
  console.log(user);

  // const handleModalOpen = (id) => {
  //     setId(id);
  //     setOpenModal(true);
  // }

  // const handleModalClose = () => {
  //     setOpenModal(false);
  // }
  const handleCommentModalOpen = (id) => {
    setId(id);
    setOpenCommentModal(true);
  };

  const handleCommentModalClose = () => {
    setOpenCommentModal(false);
  };

  const getAppointment = () => {
    axiosClient
      .get("api/my_appointments/")
      .then((res) => {
        setAppointments(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(appointments);

  useEffect(() => {
    getAppointment();
  }, []);

  //   const handleDelete = (appointmentId) => {
  //     axiosClient.delete(`api/appointment/${appointmentId}/`, {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     })
  //       .then((response) => {
  //         getAppointment();
  //       })
  //       .catch((error) => {
  //         console.error('Error deleting appointment:', error);
  //       });
  //   };
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        marginTop="16"
      >
        <Card elevation={16}>
          <CardContent>
            <TableContainer
              component={Paper}
              style={{ maxHeight: 400, overflowY: "auto", overflowX: "hidden" }}
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
                      {/* <TableCell sx={{ textAlign: 'center' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <BorderColorOutlinedIcon sx={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleModalOpen(appointment?.id)} />
                                                    <Box>.</Box>
                                                    <DeleteOutlineOutlinedIcon onClick={() => handleDelete(appointment?.id)} sx={{ cursor: 'pointer', color: 'red' }} />
                                                </Box>
                                            </TableCell> */}
                      <TableCell sx={{ textAlign: "center" }}>
                        <Box>
                          <AddComment
                            sx={{ cursor: "pointer", color: "blue" }}
                            onClick={() =>
                              handleCommentModalOpen(appointment.id)
                            }
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
      <MyAppointmentCommentModal
        open={openCommentModal}
        handleClose={handleCommentModalClose}
        id={id}
        getAppointment={getAppointment}
      ></MyAppointmentCommentModal>
    </>
  );
};

export default AppointmentList;
