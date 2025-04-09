// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, Box, Typography } from '@mui/material';

// function EditDeleteUsers({ userId, onSave, onDelete }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (userId) {
//       axios.get(`http://134.119.216.82:8001/api/user/${userId}/`)
//         .then(response => {
//           setUser(response.data);
//           setLoading(false);
//         })
//         .catch(error => {
//           setError(error);
//           setLoading(false);
//         });
//     }
//   }, [userId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSave = () => {
//     axios.patch(`http://134.119.216.82:8001/api/user/${userId}/`, user)
//       .then(response => {
//         onSave();
//       })
//       .catch(error => {
//         setError(error);
//       });
//   };

//   const handleDelete = () => {
//     axios.delete(`http://134.119.216.82:8001/api/user/${userId}/`)
//       .then(response => {
//         onDelete();
//       })
//       .catch(error => {
//         setError(error);
//       });
//   };

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography>Error loading user data.</Typography>;

//   return (
//     <Box>
//       <Typography variant="h6">Edit User</Typography>
//       <TextField
//         label="First Name"
//         name="first_name"
//         value={user.first_name || ''}
//         onChange={handleInputChange}
//         fullWidth
//       />
//       <TextField
//         label="Last Name"
//         name="last_name"
//         value={user.last_name || ''}
//         onChange={handleInputChange}
//         fullWidth
//       />
//       <TextField
//         label="Email"
//         name="email"
//         value={user.email || ''}
//         onChange={handleInputChange}
//         fullWidth
//       />
//       <TextField
//         label="Role"
//         name="user_role"
//         value={user.user_role || ''}
//         onChange={handleInputChange}
//         fullWidth
//       />
//       <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
//       <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
//     </Box>
//   );
// }

// export default EditDeleteUsers;

import React, { useState, useEffect } from "react";
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
  Alert,
  Snackbar,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useStateContext } from "../context/ContextProvider";

import axiosClient from "../axiosClient";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import UserEditModal from "../components/UserEditModal";
import ClientComment from "../components/ClientComment";

import { AddComment } from "@mui/icons-material";

const genderChoices = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
];

const roleChoices = [
  { label: "Admin", value: "ADMIN" },
  { label: "Client", value: "CLIENT" },
  { label: "Staff", value: "STAFF" },
];

const EditDeleteUsers = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const { user } = useStateContext();
  const [id, setId] = useState();

  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");

  const handleModalOpen = (id) => {
    setId(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleClientModalOpen = (id) => {
    setId(id);
    setOpenClientModal(true);
  };

  const handleClientModalClose = () => {
    setOpenClientModal(false);
  };

  const getUsers = () => {
    const params = {};

    if (role) {
      params["role"] = role;
    }

    if (gender) {
      params["gender"] = gender;
    }

    if (search) {
      params["search"] = search;
    }

    axiosClient
      .get("api/print_all_users/", { params: params })
      .then((data) => {
        setUsers(data.data.custom_users);
        console.log(data.data.custom_users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (userId) => {
    axiosClient
      .delete(`api/user/${userId}/`)
      .then((response) => {
        getUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [gender, role, search]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleSend = async (email) => {
    try {
      const response = await axiosClient.post("/auth/forgot_password/", {
        email,
      });
      console.log(response.data);
      // alert("Password reset email sent successfully!");
      setSnackbar({
        open: true,
        message: "Password reset email sent successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error sending email:", error.response.data);
      // alert("Failed to send password reset email.");
      setSnackbar({
        open: true,
        message: "Failed to send password reset email.",
        severity: "error",
      });
    }
  };
  const handleClose = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // height="100%"
        marginTop="16"
      >
        <Card elevation={16}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 5,
                gap: 2,
                width: "100%",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "left", mb: 1, fontWeight: "bold" }}
                >
                  Search By
                </Typography>
                <TextField
                  fullWidth
                  id="search"
                  label="Search"
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "left", mb: 1, fontWeight: "bold" }}
                >
                  Filter By
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      value={role}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                      sx={{ textAlign: "left" }}
                    >
                      <MenuItem value="">Default</MenuItem>
                      {roleChoices.map((role, idx) => (
                        <MenuItem key={idx} value={role.value}>
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="gender-select-label">Gender</InputLabel>
                    <Select
                      labelId="gender-select-label"
                      id="gender-select"
                      value={gender}
                      label="Gender"
                      onChange={(e) => setGender(e.target.value)}
                      sx={{ textAlign: "left" }}
                    >
                      <MenuItem value="">Default</MenuItem>
                      {genderChoices.map((gender, idx) => (
                        <MenuItem key={idx} value={gender.value}>
                          {gender.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>

            <TableContainer component={Paper} style={{ maxHeight: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Surname
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Date of Birth
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Gender
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Username
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Phone Number
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Role
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Assigned Staff
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        User ID
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        ID NUMBER
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        Action
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Forgot Password
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Comment
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.date_birth}</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.gender === "M"
                          ? "Male"
                          : row.gender === "F"
                          ? "Female"
                          : "Non-declared"}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.phone_number}</TableCell>
                      <TableCell>{row.user_role}</TableCell>
                      <TableCell>{row?.assigned_staff?.name}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.id_card || "  "}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <BorderColorOutlinedIcon
                            onClick={() => handleModalOpen(row?.id)}
                            sx={{ cursor: "pointer", color: "blue" }}
                          />
                          <Box>.</Box>
                          <DeleteOutlineOutlinedIcon
                            onClick={() => handleDelete(row?.id)}
                            sx={{ cursor: "pointer", color: "red" }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            user.user_role === "STAFF" &&
                            !(
                              row.user_role === "ADMIN" ||
                              row.assigned_staff.id === user.id
                            )
                          }
                          variant="contained"
                          onClick={() => handleSend(row.email)}
                        >
                          Send
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <AddComment
                            sx={{ cursor: "pointer", color: "blue" }}
                            onClick={() => handleClientModalOpen(row.id)}
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
      <UserEditModal
        open={openModal}
        handleClose={handleModalClose}
        id={id}
        getUsers={getUsers}
      />
      <ClientComment
        open={openClientModal}
        handleClose={handleClientModalClose}
        id={id}
        getUsers={getUsers}
      >
        {" "}
      </ClientComment>
    </>
  );
};

export default EditDeleteUsers;
