// import React, { useState, useEffect, useRef } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// import axiosClient from "../axiosClient";

// const Staff = () => {
//   const stafRef = useRef(null);
//   const clientRef = useRef(null);

//   const [errors, setErrors] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [message, setMessage] = useState("");

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

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const payload = {
//       client_id: clientRef.current.value,
//       staff_id: stafRef.current.value,
//     };

//     console.log(payload);

//     axiosClient
//       .post("api/assign_client_to_staff/", payload)
//       .then((data) => {
//         setMessage("Client added to staff successfully");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <Card elevation={16}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           Clients to Staff
//         </Typography>
//         {errors && (
//           <Typography variant="body1" color="error" gutterBottom>
//             {errors.map((error) => {
//               return `${error}, `;
//             })}
//           </Typography>
//         )}
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
//               <InputLabel id="staff-select-label">Select Staff</InputLabel>
//               <Select
//                 labelId="staff-select-label"
//                 inputRef={stafRef}
//                 label="Select Staff"
//               >
//                 {staff.map((st) => (
//                   <MenuItem
//                     value={st.id}
//                     lastname={st.user.last_name}
//                   >{`${st.user.first_name} ${st.user.last_name}`}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default Staff;

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";
import { useTranslation } from "react-i18next";

const Staff = () => {
  const [errors] = useState([]);

  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedStaffId, setSelectedStaffId] = useState("");

  const [staffUsers, setStaffUsers] = useState([]);
  const [clientUsers, setClientUsers] = useState([]);

  const [message, setMessage] = useState("");
  const { token } = useStateContext();
  const { t } = useTranslation();

  useEffect(() => {
    Promise.all([
      axiosClient.get("api/staff-users/"),
      axiosClient.get("api/client-users/"),
    ]).then(([staffRes, clientRes]) => {
      setStaffUsers(staffRes?.data);
      setClientUsers(clientRes?.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      client_id: selectedClientId,
      staff_id: selectedStaffId,
    };

    axiosClient
      .post("api/assign_client_to_staff/", payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `JWT ${token}`,
        },
      })
      .then((data) => {
        setMessage("Client added to staff successfully", {
          Headers,
        });
        setSelectedStaffId("");
        setSelectedClientId("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card elevation={16}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {t("Clients to Staff")}
        </Typography>
        {errors && (
          <Typography variant="body1" color="error" gutterBottom>
            {errors.map((error) => {
              return `${error}, `;
            })}
          </Typography>
        )}
        {message && (
          <Typography variant="body1" color="green" gutterBottom>
            {message}
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
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                label={t("Select Staff")}
                sx={{
                  textAlign: "left", // Ensures text aligns to the left
                  ".MuiSelect-select": {
                    display: "flex",
                    justifyContent: "flex-start", // Ensures content aligns to the start (left)
                  },
                }}
              >
                {staffUsers.map((user) => (
                  <MenuItem
                    value={user.id}
                    lastname={user.custom_user.last_name}
                  >{`${user.custom_user.first_name} ${user.custom_user.last_name}`}</MenuItem>
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
                sx={{
                  textAlign: "left", // Ensures text aligns to the left
                  ".MuiSelect-select": {
                    display: "flex",
                    justifyContent: "flex-start", // Ensures content aligns to the start (left)
                  },
                }}
                labelId="client-select-label"
                value={selectedClientId}
                id="selectClient"
                onChange={(e) => setSelectedClientId(e.target.value)}
                label={t("Select Client")}
              >
                {clientUsers.map((user) => (
                  <MenuItem
                    onSelect={() => alert("select")}
                    value={user.id}
                    lastname={user.custom_user.last_name}
                  >{`${user.custom_user.first_name} ${user.custom_user.last_name}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            {t("Submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Staff;
