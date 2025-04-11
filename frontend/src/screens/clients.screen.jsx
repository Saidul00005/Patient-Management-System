// import React, { useState, useEffect } from "react";
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Card,
//   CardContent,
//   Box,
//   Typography,
// } from "@mui/material";

// import axiosClient from "../axiosClient";

// const Clients = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axiosClient
//       .get("api/print_all_users/")
//       .then((data) => {
//         setUsers(data.data.custom_users);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="100%"
//       marginTop="16"
//     >
//       <Card elevation={16}>
//         <CardContent>
//           <TableContainer
//             component={Paper}
//             style={{ maxHeight: 400, overflowY: "auto", overflowX: "hidden" }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <Typography variant="h7" sx={{ fontWeight: "bold" }}>
//                       Name
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="h7" sx={{ fontWeight: "bold" }}>
//                       Surname
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="h7" sx={{ fontWeight: "bold" }}>
//                       Date of Birth
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="h7" sx={{ fontWeight: "bold" }}>
//                       Gender
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="h7" sx={{ fontWeight: "bold" }}>
//                       Email
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="h7" sx={{ fontWeight: "bold" }}>
//                       Role
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((row, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{row.first_name}</TableCell>
//                     <TableCell>{row.last_name}</TableCell>
//                     <TableCell>{row.date_birth}</TableCell>
//                     <TableCell>
//                       {row.gender == "M"
//                         ? "Male"
//                         : row.gender == "F"
//                         ? "Female"
//                         : "Non-decalred"}
//                     </TableCell>
//                     <TableCell>{row.email}</TableCell>
//                     <TableCell>{row.user_role}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default Clients;

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
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import axiosClient from "../axiosClient";
import { useTranslation } from "react-i18next";

const genderChoices = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
];

const roleChoices = [
  { label: "Secretary", value: "ADMIN" },
  { label: "Patient", value: "CLIENT" },
  { label: "Doctor", value: "STAFF" },
];

const Clients = () => {
  const [users, setUsers] = useState([]);
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

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
        console.log(data.data.custom_users);  
        setUsers(data.data.custom_users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [gender, role, search]);
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
                  {t("Search By")}
                </Typography>
                <TextField
                  fullWidth
                  id="search"
                  label={t("Search")}
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
                  {t("Filter By")}
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">{t("Role")}</InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      value={role}
                      label={t("Role")}
                      onChange={(e) => setRole(e.target.value)}
                      sx={{ textAlign: "left" }}
                    >
                      <MenuItem value="">Default</MenuItem>
                      {roleChoices.map((role, idx) => (
                        <MenuItem key={idx} value={role.value}>
                          {t(role.label)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="gender-select-label">
                      {t("Gender")}
                    </InputLabel>
                    <Select
                      labelId="gender-select-label"
                      id="gender-select"
                      value={gender}
                      label={t("Gender")}
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
                        {t("Name")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("Surname")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("Date of Birth")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("Gender")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("Email")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("Username")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("Phone Number")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("GESY NUMBER")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("Role")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("Assigned Staff")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("User ID")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("ID NUMBER")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("Agreed to GDPR Policy?")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("GDPR Policy Agreement Date")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h7"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        {t("Recorded IP Address on time of GDPR Policy Agreement")}
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
                      <TableCell>{row.gesy_number}</TableCell>

                      <TableCell>
                        {row.user_role === "STAFF"
                          ? t("DOCTOR")
                          : row.user_role === "CLIENT"
                          ? t("PATIENT")
                          : row.user_role === "ADMIN"
                          ? t("SECRETARY")
                          : t(row.user_role)}
                      </TableCell>
                      <TableCell>{row?.assigned_staff?.name}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.id_card || "  "}</TableCell>
                      <TableCell>
                        {row.gdpr_accepted ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        {row.gdpr_accepted
                          ? row.gdpr_agreement_date
                          : "Not Accepted"}
                      </TableCell>
                      <TableCell>
                        {row.gdpr_accepted
                          ? row.gdpr_ip
                          : "Not Accepted"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Clients;
