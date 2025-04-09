// import React, { useState } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper
// } from "@mui/material";
// import { useStateContext } from '../context/ContextProvider';

// const SearchUsers = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { user } = useStateContext();

//   const handleSearch = () => {
//     if (!searchTerm) {
//       setError("Please provide data to search.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     axios
//       .get(`http://134.119.216.82:8001/api/search-user/`, {
//         params: { id_number: searchTerm },
//         headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//       })
//       .then((response) => {
//         setUsers(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error response:", error.response);
//         setError(error.response?.data?.message || "An error occurred");
//         setLoading(false);
//       });
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop="16">
//       <Card elevation={16}>
//         <CardContent>
//           <Typography variant="h6">Search Users</Typography>
//           <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="16">
//             <TextField
//               label="Search Term"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               fullWidth
//             />
//             <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: 8 }}>
//               Search
//             </Button>
//           </Box>
//           {loading && <Typography>Loading...</Typography>}
//           {error && <Typography color="error">{error}</Typography>}
//           <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: "auto", overflowX: "hidden" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Surname</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Role</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.first_name}</TableCell>
//                     <TableCell>{user.last_name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.user_role}</TableCell>
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

// export default SearchUsers;
// import React, { useState } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper
// } from "@mui/material";
// import { useStateContext } from '../context/ContextProvider';

// const SearchUsers = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { user } = useStateContext();

//   console.log("User context:", user);

//   const handleSearch = () => {
//     if (!searchTerm) {
//       setError("Please provide data to search.");
//       return;
//     }

//     if (!user?.token) {
//       setError("User is not authenticated. Please log in.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     axios
//       .get(`http://134.119.216.82:8001/api/search-user/`, {
//         params: { id_number: searchTerm },
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       })
//       .then((response) => {
//         setUsers(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error response:", error.response);
//         if (error.response?.status === 401) {
//           setError("Unauthorized access. Please log in again.");
//           // Optionally, trigger a logout or token refresh here
//         } else {
//           setError(error.response?.data?.message || "An error occurred");
//         }
//         setLoading(false);
//       });
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginTop="16">
//       <Card elevation={16}>
//         <CardContent>
//           <Typography variant="h6">Search Users</Typography>
//           <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="16">
//             <TextField
//               label="Search Term"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               fullWidth
//             />
//             <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: 8 }}>
//               Search
//             </Button>
//           </Box>
//           {loading && <Typography>Loading...</Typography>}
//           {error && <Typography color="error">{error}</Typography>}
//           <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: "auto", overflowX: "hidden" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Surname</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Role</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.first_name}</TableCell>
//                     <TableCell>{user.last_name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.user_role}</TableCell>
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

// export default SearchUsers;
/////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { useStateContext } from "../context/ContextProvider";
// import axiosClient from "../axiosClient";
// import { useTranslation } from "react-i18next";

// const SearchUsers = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchCriteria, setSearchCriteria] = useState("username");
//   const [users, setUsers] = useState([]);
//   const [searchedUsers, setSearchedUsers] = useState(users);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { token } = useStateContext();
//   const { t } = useTranslation();

//   console.log("search creteria", users, searchCriteria);
//   const handleSearch = () => {
//     if (searchCriteria === "username") {
//       setSearchedUsers(
//         users.filter((user) => user.username.includes(searchTerm))
//       );
//     } else if (searchCriteria === "first_name") {
//       setSearchedUsers(
//         users.filter((user) => user.first_name.includes(searchTerm))
//       );
//     } else if (searchCriteria === "phone_number") {
//       setSearchedUsers(
//         users.filter((user) => String(user.phone_number).includes(searchTerm))
//       );
//     } else if (searchCriteria === "last_name") {
//       setSearchedUsers(
//         users.filter((user) => user.last_name.includes(searchTerm))
//       );
//     } else if (searchCriteria === "id_number") {
//       setSearchedUsers(
//         users.filter((user) => String(user.id).includes(searchTerm))
//       );
//     } else if (searchCriteria === "id_card") {
//       setSearchedUsers(
//         users.filter((user) => String(user.id_card).includes(searchTerm))
//       );
//     } else if (searchCriteria === "email") {
//       setSearchedUsers(
//         users.filter((user) => String(user.email).includes(searchTerm))
//       );
//     }

//     console.log("token", token);
//   };

//   useEffect(() => {
//     if (!token) {
//       setError("User is not authenticated. Please log in.");
//       return;
//     }

//     const fetchUsers = async () => {
//       setLoading(true);
//       setError(null);
//       setUsers([]); // Clear previous user data

//       try {
//         const { data } = await axiosClient.get("api/print_all_users/");
//         setUsers(data.custom_users);
//       } catch (error) {
//         console.error("Error response:", error.response);

//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               setError("Unauthorized access. Please log in again.");
//               break;
//             case 400:
//               setError(error.response.data?.Error || "Bad request.");
//               break;
//             case 404:
//               setError(error.response.data?.message || "Resource not found.");
//               break;
//             case 500:
//               setError("Server error. Please try again later.");
//               break;
//             default:
//               setError("An unexpected error occurred.");
//           }
//         } else {
//           setError("Network error. Please check your connection.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   useEffect(() => {
//     handleSearch();
//     // eslint-disable-next-line
//   }, [searchTerm, searchCriteria]);
//   useEffect(() => setSearchedUsers(users), [users]);
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
//           <Typography variant="h6">{t("Search Users")}</Typography>
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             marginBottom="16"
//           >
//             <FormControl fullWidth style={{ marginBottom: 16 }}>
//               <InputLabel>{t("Search By")}</InputLabel>
//               <Select
//                 value={searchCriteria}
//                 onChange={(e) => setSearchCriteria(e.target.value)}
//                 fullWidth
//               >
//                 <MenuItem value="username">{t("Username")}</MenuItem>
//                 <MenuItem value="first_name">{t("First Name")}</MenuItem>
//                 <MenuItem value="last_name">{t("Last Name")}</MenuItem>
//                 <MenuItem value="id_number">{t("ID Number")}</MenuItem>
//                 <MenuItem value="id_card">{t("ID Card")}</MenuItem>
//                 <MenuItem value="phone_number">{t("Phone Number")}</MenuItem>
//                 <MenuItem value="email">{t("Email")}</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               label={t("Search Term")}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               fullWidth
//               style={{ marginBottom: 16 }}
//             />
//             <Button variant="contained" color="primary" onClick={handleSearch}>
//               {t("Search")}
//             </Button>
//           </Box>
//           {loading && <Typography>Loading...</Typography>}
//           {error && <Typography color="error">{error}</Typography>}
//           <TableContainer
//             component={Paper}
//             style={{ maxHeight: 400, overflowY: "auto", overflowX: "hidden" }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>{t("Name")}</TableCell>
//                   <TableCell>{t("Surname")}</TableCell>
//                   <TableCell>{t("Email")}</TableCell>
//                   <TableCell>{t("Username")}</TableCell>
//                   <TableCell>{t("Phone Number")}</TableCell>
//                   <TableCell>{t("Role")}</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {searchedUsers.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.first_name}</TableCell>
//                     <TableCell>{user.last_name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.username}</TableCell>
//                     <TableCell>{user.phone_number}</TableCell>
//                     <TableCell>{user.user_role}</TableCell>
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

// export default SearchUsers;


// import React, { useEffect, useState, useCallback } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   useMediaQuery,
// } from "@mui/material";
// import { useStateContext } from "../context/ContextProvider";
// import axiosClient from "../axiosClient";
// import { useTranslation } from "react-i18next";

// const SearchUsers = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchCriteria, setSearchCriteria] = useState("username");
//   const [users, setUsers] = useState([]);
//   const [searchedUsers, setSearchedUsers] = useState(users);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { token } = useStateContext();
//   const { t } = useTranslation();
//   const isMobile = useMediaQuery("(max-width:600px)");

//   // Use useCallback to memoize handleSearch
//   const handleSearch = useCallback(() => {
//     let filteredUsers = users;
//     switch (searchCriteria) {
//       case "username":
//         filteredUsers = users.filter((user) =>
//           user.username.includes(searchTerm)
//         );
//         break;
//       case "first_name":
//         filteredUsers = users.filter((user) =>
//           user.first_name.includes(searchTerm)
//         );
//         break;
//       case "last_name":
//         filteredUsers = users.filter((user) =>
//           user.last_name.includes(searchTerm)
//         );
//         break;
//       case "id_number":
//         filteredUsers = users.filter((user) =>
//           String(user.id).includes(searchTerm)
//         );
//         break;
//       case "id_card":
//         filteredUsers = users.filter((user) =>
//           String(user.id_card).includes(searchTerm)
//         );
//         break;
//       case "email":
//         filteredUsers = users.filter((user) =>
//           user.email.includes(searchTerm)
//         );
//         break;
//       case "phone_number":
//         filteredUsers = users.filter((user) =>
//           String(user.phone_number).includes(searchTerm)
//         );
//         break;
//       default:
//         break;
//     }
//     setSearchedUsers(filteredUsers);
//   }, [searchCriteria, searchTerm, users]);

//   useEffect(() => {
//     if (!token) {
//       setError("User is not authenticated. Please log in.");
//       return;
//     }

//     const fetchUsers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const { data } = await axiosClient.get("api/print_all_users/");
//         setUsers(data.custom_users);
//       } catch (error) {
//         setError(
//           error.response?.data?.message || "An error occurred while fetching users."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   useEffect(() => {
//     handleSearch();
//   }, [handleSearch]);

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" p={2}>
//       <Card elevation={16} style={{ width: isMobile ? "100%" : "80%" }}>
//         <CardContent>
//           <Typography variant="h6" textAlign="center">
//             {t("Search Users")}
//           </Typography>
//           <Grid container spacing={2} marginBottom={2}>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>{t("Search By")}</InputLabel>
//                 <Select
//                   value={searchCriteria}
//                   onChange={(e) => setSearchCriteria(e.target.value)}
//                   fullWidth
//                 >
//                   <MenuItem value="username">{t("Username")}</MenuItem>
//                   <MenuItem value="first_name">{t("First Name")}</MenuItem>
//                   <MenuItem value="last_name">{t("Last Name")}</MenuItem>
//                   <MenuItem value="id_number">{t("ID Number")}</MenuItem>
//                   <MenuItem value="id_card">{t("ID Card")}</MenuItem>
//                   <MenuItem value="phone_number">{t("Phone Number")}</MenuItem>
//                   <MenuItem value="email">{t("Email")}</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label={t("Search Term")}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//           <Box textAlign="center" marginBottom={2}>
//             <Button variant="contained" color="primary" onClick={handleSearch}>
//               {t("Search")}
//             </Button>
//           </Box>
//           {loading && <Typography>Loading...</Typography>}
//           {error && <Typography color="error">{error}</Typography>}
//           <TableContainer
//             component={Paper}
//             style={{
//               maxHeight: isMobile ? 300 : 400,
//               overflowY: "auto",
//               overflowX: "hidden",
//             }}
//           >
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>{t("Name")}</TableCell>
//                   <TableCell>{t("Surname")}</TableCell>
//                   <TableCell>{t("Email")}</TableCell>
//                   <TableCell>{t("Username")}</TableCell>
//                   <TableCell>{t("Phone Number")}</TableCell>
//                   <TableCell>{t("Role")}</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {searchedUsers.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.first_name}</TableCell>
//                     <TableCell>{user.last_name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.username}</TableCell>
//                     <TableCell>{user.phone_number}</TableCell>
//                     <TableCell>{user.user_role}</TableCell>
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

// export default SearchUsers;



import React, { useEffect, useState, useCallback } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";
import { useTranslation } from "react-i18next";

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("username");
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState(users);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useStateContext();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = useCallback(() => {
    const filteredUsers = users.filter((user) => {
      const value = String(user[searchCriteria]).toLowerCase();
      return value.includes(searchTerm.toLowerCase());
    });
    setSearchedUsers(filteredUsers);
  }, [searchCriteria, searchTerm, users]);

  useEffect(() => {
    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axiosClient.get("api/print_all_users/");
        setUsers(data.custom_users);
      } catch (error) {
        setError(
          error.response?.data?.message || "An error occurred while fetching users."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card elevation={16} sx={{ width: '100%'}}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            {t("Search Users")}
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>{t("Search By")}</InputLabel>
                <Select
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                >
                  <MenuItem value="username">{t("Username")}</MenuItem>
                  <MenuItem value="first_name">{t("First Name")}</MenuItem>
                  <MenuItem value="last_name">{t("Last Name")}</MenuItem>
                  <MenuItem value="id">{t("ID Number")}</MenuItem>
                  <MenuItem value="id_card">{t("ID Card")}</MenuItem>
                  <MenuItem value="phone_number">{t("Phone Number")}</MenuItem>
                  <MenuItem value="email">{t("Email")}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t("Search Term")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSearch} size={isMobile ? "small" : "medium"}>
              {t("Search")}
            </Button>
          </Box>
          {loading && <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>}
          {error && <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}
            <TableContainer
            component={Paper}
            style={{
              maxHeight: isMobile ? 250 : 600,
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t("Name")}</TableCell>
                  <TableCell>{t("Surname")}</TableCell>
                  <TableCell>{t("Email")}</TableCell>
                  <TableCell>{t("Username")}</TableCell>
                  <TableCell>{t("Phone Number")}</TableCell>
                  <TableCell>{t("Role")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.phone_number}</TableCell>
                    <TableCell>{user.user_role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </CardContent>
      </Card>
    </Box>
  );
};

export default SearchUsers;

