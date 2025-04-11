// import React, { useState, useEffect } from "react";

// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// import MenuIcon from "@mui/icons-material/Menu";
// import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import PasswordIcon from "@mui/icons-material/Password";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import FullCalendarApp from "./FullCalendarApp";
// import Clients from "../screens/clients.screen";
// import UserForm from "../screens/new_client.screen";
// import AppointmentForm from "../screens/new_appointment.screen";
// import Staff from "../screens/staff.screen";
// import ResetPasswordForm from "../screens/reset_password.screen";
// import MakeExcelFile from "../screens/make.excel.file.screen";

// import Reports from '../screens/reports.screen';

// import { useStateContext } from "../context/ContextProvider";
// import axiosClient from "../axiosClient";

// function DrawerApp() {
//   const drawerWidth = 240;

//   const { user, _setUser, setToken } = useStateContext();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [view, setView] = useState("appointments");

//   useEffect(() => {
//     //needs api get call to give token from headers authorization and give back the details of the user to be correct on the refresh
//   }, []);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const drawer = (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 2,
//           marginBottom: 2,
//         }}
//       >
//         <AccountCircleIcon />
//         <Typography variant="h6" align="center">
//           {`${user.first_name} ${user.last_name}`}
//         </Typography>
//       </Box>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Appointments",
//             icon: <CalendarViewMonthIcon />,
//             handleClick: () => {
//               setView("appointments");
//             },
//             canSee: ["ADMIN", "STAFF", "CLIENT"],
//           },
//           {
//             name: "Users",
//             icon: <PersonIcon />,
//             handleClick: () => {
//               setView("clients");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "New user",
//             icon: <PersonAddIcon />,
//             handleClick: () => {
//               setView("new_user");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Clients to staff",
//             icon: <TransferWithinAStationIcon />,
//             handleClick: () => {
//               setView("staff");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Create appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => {
//               setView("create_appointment");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Make excel file",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("make_excel_file");
//             },
//             canSee: ["ADMIN"],
//           },
//           {
//             name: "Reports",
//             icon: <InsertDriveFileIcon />, // Use an appropriate icon
//             handleClick: () => {
//             setView("reports");
//             },
//             canSee: ["ADMIN","STAFF"],
//           },

//         ].map((object, index) => {
//           if (object.canSee.includes(user.user_role)) {
//             return (
//               <ListItem key={object.name} disablePadding>
//                 <ListItemButton onClick={object.handleClick}>
//                   <ListItemIcon>
//                     <ListItemIcon>{object.icon}</ListItemIcon>
//                   </ListItemIcon>
//                   <ListItemText primary={object.name} />
//                 </ListItemButton>
//               </ListItem>
//             );
//           }
//         })}
//       </List>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Reset password",
//             icon: <PasswordIcon />,
//             handleClick: () => {
//               setView("reset_password");
//             },
//           },
//           {
//             name: "Logout",
//             icon: <LogoutIcon />,
//             handleClick: () => {
//               // axiosClient
//               //   .post("auth/logout/")
//               //   .then((data) => {
//               //     console.log(data);
//               //   })
//               //   .catch((err) => {
//               //     console.log(err);
//               //   });
//               setToken(null);
//               _setUser({});
//               window.location.reload();
//             },
//           },
//         ].map((object, index) => (
//           <ListItem key={object.name} disablePadding>
//             <ListItemButton onClick={object.handleClick}>
//               <ListItemIcon>
//                 <ListItemIcon>{object.icon}</ListItemIcon>
//               </ListItemIcon>
//               <ListItemText primary={object.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div className="App">
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div">
//               Company name goes here
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Box
//           component="nav"
//           sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//           aria-label="mailbox folders"
//         >
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onTransitionEnd={handleDrawerTransitionEnd}
//             onClose={handleDrawerClose}
//             ModalProps={{
//               keepMounted: true,
//             }}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//           }}
//         >
//           <Toolbar />

//           {view === "appointments" ? (
//             <FullCalendarApp />
//           ) : view === "clients" ? (
//             <Clients />
//           ) : view === "new_user" ? (
//             <UserForm />
//           ) : view === "staff" ? (
//             <Staff />
//           ) : view === "create_appointment" ? (
//             <AppointmentForm />
//           ): view === "reports" ? (  /////////////
//           <Reports />
//           ): view === "reset_password" ? (
//             <ResetPasswordForm />
//           ) : view === "make_excel_file" ? (
//             <MakeExcelFile />
//           ) : (
//             <Typography variant="h4">Oops something went wrong!</Typography>
//           )}
//          }
//         </Box>
//       </Box>
//     </div>
//   );
// }
// export default DrawerApp;
// import React, { useState, useEffect } from "react";

// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// import MenuIcon from "@mui/icons-material/Menu";
// import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import PasswordIcon from "@mui/icons-material/Password";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import FullCalendarApp from "./FullCalendarApp";
// import Clients from "../screens/clients.screen";
// import UserForm from "../screens/new_client.screen";
// import AppointmentForm from "../screens/new_appointment.screen";
// import Staff from "../screens/staff.screen";
// import ResetPasswordForm from "../screens/reset_password.screen";
// import MakeExcelFile from "../screens/make.excel.file.screen";
// import Reports from '../screens/reports.screen';  // Ensure Reports component is imported
// import AssignedClientStats from "../screens/AssignedClientStats" ;

// import { useStateContext } from "../context/ContextProvider";
// import axiosClient from "../axiosClient";

// function DrawerApp() {
//   const drawerWidth = 240;

//   const { user, _setUser, setToken } = useStateContext();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [view, setView] = useState("appointments");

//   useEffect(() => {
//     //needs api get call to give token from headers authorization and give back the details of the user to be correct on the refresh
//   }, []);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const drawer = (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 2,
//           marginBottom: 2,
//         }}
//       >
//         <AccountCircleIcon />
//         <Typography variant="h6" align="center">
//           {`${user.first_name} ${user.last_name}`}
//         </Typography>
//       </Box>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Appointments",
//             icon: <CalendarViewMonthIcon />,
//             handleClick: () => {
//               setView("appointments");
//             },
//             canSee: ["ADMIN", "STAFF", "CLIENT"],
//           },
//           {
//             name: "Users",
//             icon: <PersonIcon />,
//             handleClick: () => {
//               setView("clients");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "New user",
//             icon: <PersonAddIcon />,
//             handleClick: () => {
//               setView("new_user");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Clients to staff",
//             icon: <TransferWithinAStationIcon />,
//             handleClick: () => {
//               setView("staff");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Create appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => {
//               setView("create_appointment");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Make excel file",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("make_excel_file");
//             },
//             canSee: ["ADMIN"],
//           },
//           {
//             name: "Reports",
//             icon: <InsertDriveFileIcon />, // Use an appropriate icon
//             handleClick: () => {
//               setView("reports");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Assigned Client Stats",
//             icon: <InsertDriveFileIcon />, // Use an appropriate icon
//             handleClick: () => {
//               setView("assigned_client_stats");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//         ].map((object, index) => {
//           if (object.canSee.includes(user.user_role)) {
//             return (
//               <ListItem key={object.name} disablePadding>
//                 <ListItemButton onClick={object.handleClick}>
//                   <ListItemIcon>{object.icon}</ListItemIcon>
//                   <ListItemText primary={object.name} />
//                 </ListItemButton>
//               </ListItem>
//             );
//           } else {
//             return null; // Return null for items that the user cannot see
//           }
//         })}
//       </List>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Reset password",
//             icon: <PasswordIcon />,
//             handleClick: () => {
//               setView("reset_password");
//             },
//           },
//           {
//             name: "Logout",
//             icon: <LogoutIcon />,
//             handleClick: () => {
//               setToken(null);
//               _setUser({});
//               window.location.reload();
//             },
//           },
//         ].map((object, index) => (
//           <ListItem key={object.name} disablePadding>
//             <ListItemButton onClick={object.handleClick}>
//               <ListItemIcon>{object.icon}</ListItemIcon>
//               <ListItemText primary={object.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div className="App">
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div">
//               Company name goes here
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Box
//           component="nav"
//           sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//           aria-label="mailbox folders"
//         >
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onTransitionEnd={handleDrawerTransitionEnd}
//             onClose={handleDrawerClose}
//             ModalProps={{
//               keepMounted: true,
//             }}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//           }}
//         >
//           <Toolbar />
//           {view === "appointments" ? (
//             <FullCalendarApp />
//           ) : view === "clients" ? (
//             <Clients />
//           ) : view === "new_user" ? (
//             <UserForm />
//           ) : view === "staff" ? (
//             <Staff />
//           ) : view === "create_appointment" ? (
//             <AppointmentForm />
//           ) : view === "reports" ? (
//             <Reports />
//           ) : view === "reset_password" ? (
//             <ResetPasswordForm />
//           ) : view === "make_excel_file" ? (
//             <MakeExcelFile />
//           ) : view === "AssignedClientStats" ? (
//             <AssignedClientStats />
//           ):
//          (
//             <Typography variant="h4">Oops something went wrong!</Typography>
//           )}
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default DrawerApp;

// import React, { useState, useEffect } from "react";

// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// import MenuIcon from "@mui/icons-material/Menu";
// import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import PasswordIcon from "@mui/icons-material/Password";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import FullCalendarApp from "./FullCalendarApp";
// import Clients from "../screens/clients.screen";
// import UserForm from "../screens/new_client.screen";
// import AppointmentForm from "../screens/new_appointment.screen";
// import Staff from "../screens/staff.screen";
// import ResetPasswordForm from "../screens/reset_password.screen";
// import MakeExcelFile from "../screens/make.excel.file.screen";
// import Reports from '../screens/reports.screen';  // Ensure Reports component is imported
// import AssignedClientStats from "../screens/AssignedClientStats";

// import { useStateContext } from "../context/ContextProvider";
// import axiosClient from "../axiosClient";

// function DrawerApp() {
//   const drawerWidth = 240;

//   const { user, _setUser, setToken } = useStateContext();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [view, setView] = useState("appointments");

//   useEffect(() => {
//     //needs api get call to give token from headers authorization and give back the details of the user to be correct on the refresh
//   }, []);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const drawer = (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 2,
//           marginBottom: 2,
//         }}
//       >
//         <AccountCircleIcon />
//         <Typography variant="h6" align="center">
//           {`${user.first_name} ${user.last_name}`}
//         </Typography>
//       </Box>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Appointments",
//             icon: <CalendarViewMonthIcon />,
//             handleClick: () => {
//               setView("appointments");
//             },
//             canSee: ["ADMIN", "STAFF", "CLIENT"],
//           },
//           {
//             name: "Users",
//             icon: <PersonIcon />,
//             handleClick: () => {
//               setView("clients");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "New user",
//             icon: <PersonAddIcon />,
//             handleClick: () => {
//               setView("new_user");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Clients to staff",
//             icon: <TransferWithinAStationIcon />,
//             handleClick: () => {
//               setView("staff");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Create appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => {
//               setView("create_appointment");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Make excel file",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("make_excel_file");
//             },
//             canSee: ["ADMIN"],
//           },
//           {
//             name: "Reports",
//             icon: <InsertDriveFileIcon />, // Use an appropriate icon
//             handleClick: () => {
//               setView("reports");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Assigned Client Stats",
//             icon: <InsertDriveFileIcon />, // Use an appropriate icon
//             handleClick: () => {
//               setView("assigned_client_stats");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//         ].map((object, index) => {
//           if (object.canSee.includes(user.user_role)) {
//             return (
//               <ListItem key={object.name} disablePadding>
//                 <ListItemButton onClick={object.handleClick}>
//                   <ListItemIcon>{object.icon}</ListItemIcon>
//                   <ListItemText primary={object.name} />
//                 </ListItemButton>
//               </ListItem>
//             );
//           } else {
//             return null; // Return null for items that the user cannot see
//           }
//         })}
//       </List>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Reset password",
//             icon: <PasswordIcon />,
//             handleClick: () => {
//               setView("reset_password");
//             },
//           },
//           {
//             name: "Logout",
//             icon: <LogoutIcon />,
//             handleClick: () => {
//               setToken(null);
//               _setUser({});
//               window.location.reload();
//             },
//           },
//         ].map((object, index) => (
//           <ListItem key={object.name} disablePadding>
//             <ListItemButton onClick={object.handleClick}>
//               <ListItemIcon>{object.icon}</ListItemIcon>
//               <ListItemText primary={object.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div className="App">
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div">
//               Company name goes here
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Box
//           component="nav"
//           sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//           aria-label="mailbox folders"
//         >
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onTransitionEnd={handleDrawerTransitionEnd}
//             onClose={handleDrawerClose}
//             ModalProps={{
//               keepMounted: true,
//             }}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//           }}
//         >
//           <Toolbar />
//           {view === "appointments" ? (
//             <FullCalendarApp />
//           ) : view === "clients" ? (
//             <Clients />
//           ) : view === "new_user" ? (
//             <UserForm />
//           ) : view === "staff" ? (
//             <Staff />
//           ) : view === "create_appointment" ? (
//             <AppointmentForm />
//           ) : view === "reports" ? (
//             <Reports />
//           ) : view === "reset_password" ? (
//             <ResetPasswordForm />
//           ) : view === "make_excel_file" ? (
//             <MakeExcelFile />
//           ) : view === "assigned_client_stats" ? ( // Ensure this matches the string set in the click handler
//             <AssignedClientStats />
//           ) : (
//             <Typography variant="h4">Oops something went wrong!</Typography>
//           )}
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default DrawerApp;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// import MenuIcon from "@mui/icons-material/Menu";
// import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import PasswordIcon from "@mui/icons-material/Password";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import FullCalendarApp from "./FullCalendarApp";
// import Clients from "../screens/clients.screen";
// import UserForm from "../screens/new_client.screen";
// import AppointmentForm from "../screens/new_appointment.screen";
// import Staff from "../screens/staff.screen";
// import ResetPasswordForm from "../screens/reset_password.screen";
// import MakeExcelFile from "../screens/make.excel.file.screen";
// import Reports from '../screens/reports.screen';  // Ensure Reports component is imported
// import AssignedClientStats from "../screens/AssignedClientStats";
// import EditDeleteAppointment from "../screens/EditDeleteAppointment"; // Import the combined component
// import ClientStats from "../screens/ClientStats"; // Correct the import

// import { useStateContext } from "../context/ContextProvider";

// function DrawerApp() {
//   const drawerWidth = 240;
//   const { user, _setUser, setToken } = useStateContext();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [view, setView] = useState("appointments");
//   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

//   useEffect(() => {
//     //needs api get call to give token from headers authorization and give back the details of the user to be correct on the refresh
//   }, []);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const handleEditAppointment = (appointmentId) => {
//     setSelectedAppointmentId(appointmentId);
//     setView("edit_delete_appointment");
//   };

//   const handleSaveAppointment = () => {
//     setSelectedAppointmentId(null);
//     setView("appointments");
//   };

//   const handleDeleteAppointment = () => {
//     setSelectedAppointmentId(null);
//     setView("appointments");
//   };

//   const drawer = (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 2,
//           marginBottom: 2,
//         }}
//       >
//         <AccountCircleIcon />
//         <Typography variant="h6" align="center">
//           {`${user.first_name} ${user.last_name}`}
//         </Typography>
//       </Box>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Appointments",
//             icon: <CalendarViewMonthIcon />,
//             handleClick: () => {
//               setView("appointments");
//             },
//             canSee: ["ADMIN", "STAFF", "CLIENT"],
//           },
//           {
//             name: "Users",
//             icon: <PersonIcon />,
//             handleClick: () => {
//               setView("clients");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "New user",
//             icon: <PersonAddIcon />,
//             handleClick: () => {
//               setView("new_user");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Clients to staff",
//             icon: <TransferWithinAStationIcon />,
//             handleClick: () => {
//               setView("staff");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Create appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => {
//               setView("create_appointment");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Edit/Delete appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => {
//               setView("edit_delete_appointment");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Make excel file",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("make_excel_file");
//             },
//             canSee: ["ADMIN"],
//           },
//           {
//             name: "Reports",
//             icon: <InsertDriveFileIcon />, // Use an appropriate icon
//             handleClick: () => {
//               setView("reports");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Assigned Client Stats",
//             icon: <InsertDriveFileIcon />, // Use an appropriate icon
//             handleClick: () => {
//               setView("assigned_client_stats");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Client Stats",
//             icon: <InsertDriveFileIcon />, // Use an appropriate icon
//             handleClick: () => {
//               setView("client_stats");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//         ].map((object, index) => {
//           if (object.canSee.includes(user.user_role)) {
//             return (
//               <ListItem key={object.name} disablePadding>
//                 <ListItemButton onClick={object.handleClick}>
//                   <ListItemIcon>{object.icon}</ListItemIcon>
//                   <ListItemText primary={object.name} />
//                 </ListItemButton>
//               </ListItem>
//             );
//           } else {
//             return null; // Return null for items that the user cannot see
//           }
//         })}
//       </List>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Reset password",
//             icon: <PasswordIcon />,
//             handleClick: () => {
//               setView("reset_password");
//             },
//           },
//           {
//             name: "Logout",
//             icon: <LogoutIcon />,
//             handleClick: () => {
//               setToken(null);
//               _setUser({});
//               window.location.reload();
//             },
//           },
//         ].map((object, index) => (
//           <ListItem key={object.name} disablePadding>
//             <ListItemButton onClick={object.handleClick}>
//               <ListItemIcon>{object.icon}</ListItemIcon>
//               <ListItemText primary={object.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div className="App">
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div">
//               Company name goes here
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Box
//           component="nav"
//           sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//           aria-label="mailbox folders"
//         >
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onTransitionEnd={handleDrawerTransitionEnd}
//             onClose={handleDrawerClose}
//             ModalProps={{
//               keepMounted: true,
//             }}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//           }}
//         >
//           <Toolbar />
//           {view === "appointments" ? (
//             <FullCalendarApp />
//           ) : view === "clients" ? (
//             <Clients />
//           ) : view === "new_user" ? (
//             <UserForm />
//           ) : view === "staff" ? (
//             <Staff />
//           ) : view === "create_appointment" ? (
//             <AppointmentForm />
//           ) : view === "edit_delete_appointment" ? (
//             <EditDeleteAppointment
//               appointmentId={selectedAppointmentId}
//               onSave={handleSaveAppointment}
//               onDelete={handleDeleteAppointment}
//             />
//           ) : view === "reports" ? (
//             <Reports />
//           ) : view === "reset_password" ? (
//             <ResetPasswordForm />
//           ) : view === "make_excel_file" ? (
//             <MakeExcelFile />
//           ) : view === "assigned_client_stats" ? (
//             <AssignedClientStats />
//           ) : view === "client_stats" ? (
//             <ClientStats />
//           ) : (
//             <Typography variant="h4">Oops something went wrong!</Typography>
//           )}
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default DrawerApp;

///////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// import MenuIcon from "@mui/icons-material/Menu";
// import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import PasswordIcon from "@mui/icons-material/Password";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import FullCalendarApp from "./FullCalendarApp";
// import Clients from "../screens/clients.screen";
// import UserForm from "../screens/new_client.screen";
// import AppointmentForm from "../screens/new_appointment.screen";
// import Staff from "../screens/staff.screen";
// import ResetPasswordForm from "../screens/reset_password.screen";
// import MakeExcelFile from "../screens/make.excel.file.screen";
// import Reports from '../screens/reports.screen';
// import AssignedClientStats from "../screens/AssignedClientStats";
// import EditDeleteAppointment from "../screens/EditDeleteAppointment";
// import ClientStats from "../screens/ClientStats";
// import EditDeleteUsers from "../screens/EditDeleteUsers"; // Import the new component

// import { useStateContext } from "../context/ContextProvider";

// function DrawerApp() {
//   const drawerWidth = 240;
//   const { user, _setUser, setToken } = useStateContext();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [view, setView] = useState("appointments");
//   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
//   const [selectedUserId, setSelectedUserId] = useState(null); // Add state for selected user ID

//   useEffect(() => {
//     // needs api get call to give token from headers authorization and give back the details of the user to be correct on the refresh
//   }, []);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const handleSaveAppointment = () => {
//     setSelectedAppointmentId(null);
//     setView("appointments");
//   };

//   const handleDeleteAppointment = () => {
//     setSelectedAppointmentId(null);
//     setView("appointments");
//   };

//   const handleSaveUser = () => {
//     setSelectedUserId(null);
//     setView("clients");
//   };

//   const handleDeleteUser = () => {
//     setSelectedUserId(null);
//     setView("clients");
//   };

//   const drawer = (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 2,
//           marginBottom: 2,
//         }}
//       >
//         <AccountCircleIcon />
//         <Typography variant="h6" align="center">
//           {`${user.first_name} ${user.last_name}`}
//         </Typography>
//       </Box>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Appointments",
//             icon: <CalendarViewMonthIcon />,
//             handleClick: () => {
//               setView("appointments");
//             },
//             canSee: ["ADMIN", "STAFF", "CLIENT"],
//           },
//           {
//             name: "Users",
//             icon: <PersonIcon />,
//             handleClick: () => {
//               setView("clients");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "New user",
//             icon: <PersonAddIcon />,
//             handleClick: () => {
//               setView("new_user");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Clients to staff",
//             icon: <TransferWithinAStationIcon />,
//             handleClick: () => {
//               setView("staff");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Create appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => {
//               setView("create_appointment");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Edit/Delete appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => {
//               setView("edit_delete_appointment");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Make excel file",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("make_excel_file");
//             },
//             canSee: ["ADMIN"],
//           },
//           {
//             name: "Reports",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("reports");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Assigned Client Stats",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("assigned_client_stats");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Client Stats",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("client_stats");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Edit/Delete User",
//             icon: <PersonIcon />,
//             handleClick: () => {
//               const userId = prompt("Enter user ID to edit/delete:"); // For simplicity, using prompt to get user ID. You may replace this with a better UI.
//               setSelectedUserId(userId);
//               setView("edit_delete_user");
//             },
//             canSee: ["ADMIN"],
//           },
//         ].map((object, index) => {
//           if (object.canSee.includes(user.user_role)) {
//             return (
//               <ListItem key={object.name} disablePadding>
//                 <ListItemButton onClick={object.handleClick}>
//                   <ListItemIcon>{object.icon}</ListItemIcon>
//                   <ListItemText primary={object.name} />
//                 </ListItemButton>
//               </ListItem>
//             );
//           } else {
//             return null; // Return null for items that the user cannot see
//           }
//         })}
//       </List>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Reset password",
//             icon: <PasswordIcon />,
//             handleClick: () => {
//               setView("reset_password");
//             },
//           },
//           {
//             name: "Logout",
//             icon: <LogoutIcon />,
//             handleClick: () => {
//               setToken(null);
//               _setUser({});
//               window.location.reload();
//             },
//           },
//         ].map((object, index) => (
//           <ListItem key={object.name} disablePadding>
//             <ListItemButton onClick={object.handleClick}>
//               <ListItemIcon>{object.icon}</ListItemIcon>
//               <ListItemText primary={object.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div className="App">
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div">
//               Company name goes here
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Box
//           component="nav"
//           sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//           aria-label="mailbox folders"
//         >
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onTransitionEnd={handleDrawerTransitionEnd}
//             onClose={handleDrawerClose}
//             ModalProps={{
//               keepMounted: true,
//             }}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//           }}
//         >
//           <Toolbar />
//           {view === "appointments" ? (
//             <FullCalendarApp />
//           ) : view === "clients" ? (
//             <Clients />
//           ) : view === "new_user" ? (
//             <UserForm />
//           ) : view === "staff" ? (
//             <Staff />
//           ) : view === "create_appointment" ? (
//             <AppointmentForm />
//           ) : view === "edit_delete_appointment" ? (
//             <EditDeleteAppointment
//               appointmentId={selectedAppointmentId}
//               onSave={handleSaveAppointment}
//               onDelete={handleDeleteAppointment}
//             />
//           ) : view === "reports" ? (
//             <Reports />
//           ) : view === "reset_password" ? (
//             <ResetPasswordForm />
//           ) : view === "make_excel_file" ? (
//             <MakeExcelFile />
//           ) : view === "assigned_client_stats" ? (
//             <AssignedClientStats />
//           ) : view === "client_stats" ? (
//             <ClientStats />
//           ) : view === "edit_delete_user" ? (
//             <EditDeleteUsers
//               userId={selectedUserId}
//               onSave={handleSaveUser}
//               onDelete={handleDeleteUser}
//             />
//           ) : (
//             <Typography variant="h4">Oops something went wrong!</Typography>
//           )}
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default DrawerApp;

////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// import MenuIcon from "@mui/icons-material/Menu";
// import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import PasswordIcon from "@mui/icons-material/Password";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from '@mui/icons-material/Search';

// import FullCalendarApp from "./FullCalendarApp";
// import Clients from "../screens/clients.screen";
// import UserForm from "../screens/new_client.screen";
// import AppointmentForm from "../screens/new_appointment.screen";
// import Staff from "../screens/staff.screen";
// import ResetPasswordForm from "../screens/reset_password.screen";
// import MakeExcelFile from "../screens/make.excel.file.screen";
// import Reports from '../screens/reports.screen';
// import AssignedClientStats from "../screens/AssignedClientStats";
// import EditDeleteAppointment from "../screens/EditDeleteAppointment";
// import ClientStats from "../screens/ClientStats";
// import EditDeleteUsers from "../screens/EditDeleteUsers";
// import SearchUsers from "../screens/SearchUsers"; // Import the new component

// import { useStateContext } from "../context/ContextProvider";

// function DrawerApp() {
//   const drawerWidth = 240;
//   const { user, _setUser, setToken } = useStateContext();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [view, setView] = useState("appointments");
//   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
//   const [selectedUserId, setSelectedUserId] = useState(null);

//   useEffect(() => {
//     // needs api get call to give token from headers authorization and give back the details of the user to be correct on the refresh
//   }, []);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const handleSaveAppointment = () => {
//     setSelectedAppointmentId(null);
//     setView("appointments");
//   };

//   const handleDeleteAppointment = () => {
//     setSelectedAppointmentId(null);
//     setView("appointments");
//   };

//   const handleSaveUser = () => {
//     setSelectedUserId(null);
//     setView("clients");
//   };

//   const handleDeleteUser = () => {
//     setSelectedUserId(null);
//     setView("clients");
//   };

//   const drawer = (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 2,
//           marginBottom: 2,
//         }}
//       >
//         <AccountCircleIcon />
//         <Typography variant="h6" align="center">
//           {`${user.first_name} ${user.last_name}`}
//         </Typography>
//       </Box>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Appointments",
//             icon: <CalendarViewMonthIcon />,
//             handleClick: () => {
//               setView("appointments");
//             },
//             canSee: ["ADMIN", "STAFF", "CLIENT"],
//           },
//           {
//             name: "Users",
//             icon: <PersonIcon />,
//             handleClick: () => {
//               setView("clients");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "New user",
//             icon: <PersonAddIcon />,
//             handleClick: () => {
//               setView("new_user");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Clients to staff",
//             icon: <TransferWithinAStationIcon />,
//             handleClick: () => {
//               setView("staff");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Create appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => {
//               setView("create_appointment");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Edit/Delete appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => {
//               setView("edit_delete_appointment");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Make excel file",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("make_excel_file");
//             },
//             canSee: ["ADMIN"],
//           },
//           {
//             name: "Reports",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("reports");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Assigned Client Stats",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("assigned_client_stats");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Client Stats",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => {
//               setView("client_stats");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Edit/Delete User",
//             icon: <PersonIcon />,
//             handleClick: () => {
//               const userId = prompt("Enter user ID to edit/delete:"); // For simplicity, using prompt to get user ID. You may replace this with a better UI.
//               setSelectedUserId(userId);
//               setView("edit_delete_user");
//             },
//             canSee: ["ADMIN"],
//           },
//           {
//             name: "Search Users",
//             icon: <SearchIcon />,
//             handleClick: () => {
//               setView("search_users");
//             },
//             canSee: ["ADMIN", "STAFF"],
//           },
//         ].map((object, index) => {
//           if (object.canSee.includes(user.user_role)) {
//             return (
//               <ListItem key={object.name} disablePadding>
//                 <ListItemButton onClick={object.handleClick}>
//                   <ListItemIcon>{object.icon}</ListItemIcon>
//                   <ListItemText primary={object.name} />
//                 </ListItemButton>
//               </ListItem>
//             );
//           } else {
//             return null; // Return null for items that the user cannot see
//           }
//         })}
//       </List>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Reset password",
//             icon: <PasswordIcon />,
//             handleClick: () => {
//               setView("reset_password");
//             },
//           },
//           {
//             name: "Logout",
//             icon: <LogoutIcon />,
//             handleClick: () => {
//               setToken(null);
//               _setUser({});
//               window.location.reload();
//             },
//           },
//         ].map((object, index) => (
//           <ListItem key={object.name} disablePadding>
//             <ListItemButton onClick={object.handleClick}>
//               <ListItemIcon>{object.icon}</ListItemIcon>
//               <ListItemText primary={object.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div className="App">
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div">
//               Company name goes here
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Box
//           component="nav"
//           sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//           aria-label="mailbox folders"
//         >
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onTransitionEnd={handleDrawerTransitionEnd}
//             onClose={handleDrawerClose}
//             ModalProps={{
//               keepMounted: true,
//             }}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//           }}
//         >
//           <Toolbar />
//           {view === "appointments" ? (
//             <FullCalendarApp />
//           ) : view === "clients" ? (
//             <Clients />
//           ) : view === "new_user" ? (
//             <UserForm />
//           ) : view === "staff" ? (
//             <Staff />
//           ) : view === "create_appointment" ? (
//             <AppointmentForm />
//           ) : view === "edit_delete_appointment" ? (
//             <EditDeleteAppointment
//               appointmentId={selectedAppointmentId}
//               onSave={handleSaveAppointment}
//               onDelete={handleDeleteAppointment}
//             />
//           ) : view === "reports" ? (
//             <Reports />
//           ) : view === "reset_password" ? (
//             <ResetPasswordForm />
//           ) : view === "make_excel_file" ? (
//             <MakeExcelFile />
//           ) : view === "assigned_client_stats" ? (
//             <AssignedClientStats />
//           ) : view === "client_stats" ? (
//             <ClientStats />
//           ) : view === "edit_delete_user" ? (
//             <EditDeleteUsers
//               userId={selectedUserId}
//               onSave={handleSaveUser}
//               onDelete={handleDeleteUser}
//             />
//           ) : view === "search_users" ? (
//             <SearchUsers />
//           ) : (
//             <Typography variant="h4">Oops something went wrong!</Typography>
//           )}
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default DrawerApp;

// /////////////////////////////////////////////////////
//TRY TO ADD COLOUR TO APPOINTMENT
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PasswordIcon from "@mui/icons-material/Password";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

import FullCalendarApp from "./FullCalendarApp";
import Clients from "../screens/clients.screen";
import UserForm from "../screens/new_client.screen";
import AppointmentForm from "../screens/new_appointment.screen";
import Staff from "../screens/staff.screen";
import ResetPasswordForm from "../screens/reset_password.screen";
import MakeExcelFile from "../screens/make.excel.file.screen";
import Reports from "../screens/reports.screen";
import AssignedClientStats from "../screens/AssignedClientStats";
import EditDeleteAppointment from "../screens/EditDeleteAppointment";
import ClientStats from "../screens/ClientStats";
import EditDeleteUsers from "../screens/EditDeleteUsers";
import SearchUsers from "../screens/SearchUsers"; // Import the new component
import SendEmailSMS from "../screens/SendEmailSMSExel";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

import { useStateContext } from "../context/ContextProvider";
// import { LegendToggle, Note, Task } from "@mui/icons-material";
import { LegendToggle, Note } from "@mui/icons-material";
import AppointmentList from "../screens/AppointmentList";
import Notes from "../screens/Notes";
import axiosClient from "../axiosClient";
import GDPRPOLICY from "../screens/GdprPolicyScreen";
// import TaskManagement from "../screens/TaskManagement";
import Modal from "@mui/material/Modal";


function DrawerApp() {
  const drawerWidth = 240;
  const { user, _setUser, setToken, token } = useStateContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  // const [view, setView] = useState("appointments");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  // const [selectedUserId, setSelectedUserId] = useState(null);
  const [showGDPRModal, setShowGDPRModal] = useState(false);
  const [isSubmittingAgreement, setIsSubmittingAgreement] = useState(false);

  const { view, setView } = useStateContext();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    // needs api get call to give token from headers authorization and give back the details of the user to be correct on the refresh
  }, []);

  useEffect(() => {
    if (user?.user_role === 'CLIENT' && !user.gdpr_accepted) {
      setShowGDPRModal(true);
    }
  }, [user]);
  

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleSaveAppointment = () => {
    setSelectedAppointmentId(null);
    setView("appointments");
  };

  const handleDeleteAppointment = () => {
    setSelectedAppointmentId(null);
    setView("appointments");
  };

  const downloadGDPRreport = async () => {
    try {
      const response = await axiosClient.get("api/gdpr-report", {
        responseType: "blob", // Important for downloading files
      });

      // Create a blob URL
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link to trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report.pdf`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the PDF", error);
    }
  };

  // const handleSaveUser = () => {
  //   setSelectedUserId(null);
  //   setView("clients");
  // };

  // const handleDeleteUser = () => {
  //   setSelectedUserId(null);
  //   setView("clients");
  // };
  const [submenuOpen, setSubmenuOpen] = useState(false); // State to handle submenu open/close

  const handleGDPRAgreement = async () => {
    setIsSubmittingAgreement(true);
    try {
      // Get client IP
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipRes.json();
      
      // Send agreement to backend
      await axiosClient.post('/api/gdpr/accept/', {
        ip_address: ip,
        agreement_time: new Date().toISOString()
      },{
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `JWT-${token}`,
        },
      });
  
      // Update user context
      _setUser({ ...user, gdpr_accepted: true });
      setShowGDPRModal(false);
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data[0] || 'Failed to accept GDPR.');
      } else {
        console.error('GDPR agreement failed:', err);
      }
    } finally {
      setIsSubmittingAgreement(false);
    }
  };

  const drawer = (
      <div>
      {showGDPRModal && (
      <Modal
        open={showGDPRModal}
        onClose={() => {}}
        disableEscapeKeyDown
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 800,
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}>
          <GDPRPOLICY 
            onAgree={handleGDPRAgreement}
            isModal={true}
            isSubmitting={isSubmittingAgreement}
          />
        </Box>
      </Modal>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <AccountCircleIcon />
        <Typography variant="h6" align="center">
          {`${user.first_name} ${user.last_name}`}
        </Typography>
      </Box>
      <Divider />
      <List>
        {[
          {
            name: `${t("Appointments")}`,
            icon: <CalendarViewMonthIcon />,
            handleClick: () => {
              setView("appointments");
            },
            canSee: ["ADMIN", "STAFF", "CLIENT"],
          },
          {
            name: `${t("MY Appointments")}`,
            icon: <CalendarViewMonthIcon />,
            handleClick: () => {
              setView("my_appointment");
            },
            canSee: ["CLIENT"],
          },
          {
            name: `${t("Users")}`,
            icon: <PersonIcon />,
            handleClick: () => {
              setView("clients");
            },
            canSee: ["ADMIN", "STAFF"],
          },
          {
            name: `${t("Search Users")}`,
            icon: <SearchIcon />,
            handleClick: () => {
              setView("search_users");
            },
            canSee: ["ADMIN", "STAFF"],
          },
          {
            name: `${t("new_user")}`,
            icon: <PersonAddIcon />,
            handleClick: () => {
              setView("new_user");
            },
            canSee: ["ADMIN", "STAFF"],
          },
          {
            name: `${t("Clients to staff")}`,
            icon: <TransferWithinAStationIcon />,
            handleClick: () => {
              setView("staff");
            },
            canSee: ["ADMIN", "STAFF"],
          },
          {
            name: `${t("Edit/Delete User")}`,
            icon: <PersonIcon />,
            handleClick: () => {
              setView("edit_delete_user");
            },
            canSee: ["ADMIN", "STAFF"],
          },
          {
            name: `${t("Create appointment")}`,
            icon: <EditCalendarIcon />,
            handleClick: () => {
              setView("create_appointment");
            },
            canSee: ["ADMIN", "STAFF"],
          },
          {
            name: `${t("Edit/Delete appointment")}`,
            icon: <EditCalendarIcon />,
            handleClick: () => {
              setView("edit_delete_appointment");
            },
            canSee: ["ADMIN", "STAFF"],
          },

          {
            name: `${t("Notes")}`,
            icon: <Note />,
            handleClick: () => {
              setView("notes");
            },
            canSee: ["ADMIN"],
          },
          {
            name: `${t("GDPR REPORT")}`,
            icon: <Note />,
            handleClick: () => {
              downloadGDPRreport();
            },
            canSee: ["CLIENT"],
          },
          {
            name: `${t("GDPR POLICY")}`,
            icon: <Note />,
            handleClick: () => {
              setView("gdpr_policy");
            },
            canSee: ["ADMIN","STAFF","CLIENT"],
          },


          // {
          //   name: `${t("Task Management")}`,
          //   icon: <Task />,
          //   handleClick: () => {
          //     setView("task");
          //   },
          //   canSee: ["ADMIN", "STAFF"],
          // },
        ].map((object) => {
          if (object.canSee.includes(user.user_role)) {
            return (
              <ListItem key={object.name} disablePadding>
                <ListItemButton onClick={object.handleClick}>
                  <ListItemIcon>{object.icon}</ListItemIcon>
                  <ListItemText primary={object.name} />
                </ListItemButton>
              </ListItem>
            );
          } else {
            return null; // Return null for items that the user cannot see
          }
        })}
        {(user.user_role === "ADMIN" || user.user_role === "STAFF") && (
          <>
            <ListItem button onClick={() => setSubmenuOpen(!submenuOpen)}>
              <ListItemIcon>
                <LegendToggle />
              </ListItemIcon>
              <ListItemText primary={t("Monitoring")} />
            </ListItem>
            {submenuOpen && (
              <List component="div" disablePadding>
                <ListItem button onClick={() => setView("make_excel_file")}>
                  <ListItemText inset primary={t("Make Excel file")} />
                </ListItem>
                <ListItem button onClick={() => setView("send_email_sms")}>
                  <ListItemText
                    inset
                    primary={t("Send Email/SMS excel file")}
                  />
                </ListItem>
                <ListItem button onClick={() => setView("reports")}>
                  <ListItemText inset primary={t("Reports")} />
                </ListItem>

                <ListItem
                  button
                  onClick={() => setView("assigned_client_stats")}
                >
                  <ListItemText inset primary={t("Assigned Client Stats")} />
                </ListItem>
                <ListItem button onClick={() => setView("client_stats")}>
                  <ListItemText inset primary={t("Client Stats")} />
                </ListItem>
              </List>
            )}
          </>
        )}
      </List>
      <Divider />
      <List>
        {[
          {
            name: `${t("Reset password")}`,
            icon: <PasswordIcon />,
            handleClick: () => {
              setView("reset_password");
            },
          },
          {
            name: `${t("Logout")}`,
            icon: <LogoutIcon />,
            handleClick: () => {
              setToken(null);
              _setUser({});
              window.location.reload();
            },
          },
        ].map((object) => (
          <ListItem key={object.name} disablePadding>
            <ListItemButton onClick={object.handleClick}>
              <ListItemIcon>{object.icon}</ListItemIcon>
              <ListItemText primary={object.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h6" noWrap component="div">
                {t("Patient Hub - A simple patient management system")}
              </Typography>
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={Cookies.get("i18next")}
              >
                <option value="en">English</option>
                <option value="el">Greek</option>
              </select>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                // background: 'red'  // A
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowX: "auto",
          }}
        >
          <Toolbar />
          {view === "appointments" ? (
            <FullCalendarApp />
          ) : view === "clients" ? (
            <Clients />
          ) : view === "new_user" ? (
            <UserForm />
          ) : view === "staff" ? (
            <Staff />
          ) : view === "create_appointment" ? (
            <AppointmentForm />
          ) : view === "edit_delete_appointment" ? (
            <EditDeleteAppointment
              appointmentId={selectedAppointmentId}
              onSave={handleSaveAppointment}
              onDelete={handleDeleteAppointment}
            />
          ) : view === "reports" ? (
            <Reports />
          ) : view === "reset_password" ? (
            <ResetPasswordForm />
          ) : view === "make_excel_file" ? (
            <MakeExcelFile />
          ) : view === "send_email_sms" ? (
            <SendEmailSMS />
          ) : view === "assigned_client_stats" ? (
            <AssignedClientStats />
          ) : view === "client_stats" ? (
            <ClientStats />
          ) : view === "my_appointment" ? (
            <AppointmentList />
          ) : view === "edit_delete_user" ? (
            <EditDeleteUsers />
          ) : view === "notes" ? (
            <Notes />
          ) : // : view === "task" ? (
          //   <TaskManagement />
          // )
          view === "search_users" ? (
            <SearchUsers />
          ): view === "gdpr_policy" ? (
            <GDPRPOLICY/>
          ) : (
            <Typography variant="h4">Oops something went wrong!</Typography>
          )}
        </Box>
      </Box>
      
    </div>
  );
}

export default DrawerApp;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import MenuIcon from "@mui/icons-material/Menu";
// import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import PasswordIcon from "@mui/icons-material/Password";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";

// import FullCalendarApp from "./FullCalendarApp";
// import Clients from "../screens/clients.screen";
// import UserForm from "../screens/new_client.screen";
// import AppointmentForm from "../screens/new_appointment.screen";
// import Staff from "../screens/staff.screen";
// import ResetPasswordForm from "../screens/reset_password.screen";
// import MakeExcelFile from "../screens/make.excel.file.screen";
// import Reports from "../screens/reports.screen";
// import AssignedClientStats from "../screens/AssignedClientStats";
// import EditDeleteAppointment from "../screens/EditDeleteAppointment";
// import ClientStats from "../screens/ClientStats";
// import EditDeleteUsers from "../screens/EditDeleteUsers";
// import SearchUsers from "../screens/SearchUsers";

// import { useStateContext } from "../context/ContextProvider";

// function DrawerApp() {
//   const drawerWidth = 240;
//   const { user, _setUser, setToken } = useStateContext();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [view, setView] = useState("appointments");
//   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
//   const [selectedUserId, setSelectedUserId] = useState(null);

//   useEffect(() => {
//     // Add logic to fetch user details using the token, if necessary
//   }, []);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const handleSaveAppointment = () => {
//     setSelectedAppointmentId(null);
//     setView("appointments");
//   };

//   const handleDeleteAppointment = () => {
//     setSelectedAppointmentId(null);
//     setView("appointments");
//   };

//   const handleSaveUser = () => {
//     setSelectedUserId(null);
//     setView("clients");
//   };

//   const handleDeleteUser = () => {
//     setSelectedUserId(null);
//     setView("clients");
//   };

//   const drawer = (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 2,
//           marginBottom: 2,
//         }}
//       >
//         <AccountCircleIcon />
//         <Typography variant="h6" align="center">
//           {`${user.first_name} ${user.last_name}`}
//         </Typography>
//       </Box>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Appointments",
//             icon: <CalendarViewMonthIcon />,
//             handleClick: () => setView("appointments"),
//             canSee: ["ADMIN", "STAFF", "CLIENT"],
//           },
//           {
//             name: "Users",
//             icon: <PersonIcon />,
//             handleClick: () => setView("clients"),
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "New user",
//             icon: <PersonAddIcon />,
//             handleClick: () => setView("new_user"),
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Clients to staff",
//             icon: <TransferWithinAStationIcon />,
//             handleClick: () => setView("staff"),
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Create appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => setView("create_appointment"),
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Edit/Delete appointment",
//             icon: <EditCalendarIcon />,
//             handleClick: () => setView("edit_delete_appointment"),
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Make excel file",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => setView("make_excel_file"),
//             canSee: ["ADMIN"],
//           },
//           {
//             name: "Reports",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => setView("reports"),
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Assigned Client Stats",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => setView("assigned_client_stats"),
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Client Stats",
//             icon: <InsertDriveFileIcon />,
//             handleClick: () => setView("client_stats"),
//             canSee: ["ADMIN", "STAFF"],
//           },
//           {
//             name: "Edit/Delete User",
//             icon: <PersonIcon />,
//             handleClick: () => {
//               const userId = prompt("Enter user ID to edit/delete:"); // For simplicity, using prompt to get user ID. You may replace this with a better UI.
//               setSelectedUserId(userId);
//               setView("edit_delete_user");
//             },
//             canSee: ["ADMIN"],
//           },
//           {
//             name: "Search Users",
//             icon: <SearchIcon />,
//             handleClick: () => setView("search_users"),
//             canSee: ["ADMIN", "STAFF"],
//           },
//         ].map((object, index) => (
//           object.canSee.includes(user.user_role) && (
//             <ListItem key={object.name} disablePadding>
//               <ListItemButton onClick={object.handleClick}>
//                 <ListItemIcon>{object.icon}</ListItemIcon>
//                 <ListItemText primary={object.name} />
//               </ListItemButton>
//             </ListItem>
//           )
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {[
//           {
//             name: "Reset password",
//             icon: <PasswordIcon />,
//             handleClick: () => setView("reset_password"),
//           },
//           {
//             name: "Logout",
//             icon: <LogoutIcon />,
//             handleClick: () => {
//               setToken(null);
//               _setUser({});
//               window.location.reload();
//             },
//           },
//         ].map((object, index) => (
//           <ListItem key={object.name} disablePadding>
//             <ListItemButton onClick={object.handleClick}>
//               <ListItemIcon>{object.icon}</ListItemIcon>
//               <ListItemText primary={object.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div className="App">
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div">
//               Company name goes here
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Box
//           component="nav"
//           sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//           aria-label="mailbox folders"
//         >
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onTransitionEnd={handleDrawerTransitionEnd}
//             onClose={handleDrawerClose}
//             ModalProps={{
//               keepMounted: true,
//             }}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//           }}
//         >
//           <Toolbar />
//           {view === "appointments" ? (
//             <FullCalendarApp />
//           ) : view === "clients" ? (
//             <Clients />
//           ) : view === "new_user" ? (
//             <UserForm />
//           ) : view === "staff" ? (
//             <Staff />
//           ) : view === "create_appointment" ? (
//             <AppointmentForm />
//           ) : view === "edit_delete_appointment" ? (
//             <EditDeleteAppointment
//               appointmentId={selectedAppointmentId}
//               onSave={handleSaveAppointment}
//               onDelete={handleDeleteAppointment}
//             />
//           ) : view === "reports" ? (
//             <Reports />
//           ) : view === "reset_password" ? (
//             <ResetPasswordForm />
//           ) : view === "make_excel_file" ? (
//             <MakeExcelFile />
//           ) : view === "assigned_client_stats" ? (
//             <AssignedClientStats />
//           ) : view === "client_stats" ? (
//             <ClientStats />
//           ) : view === "edit_delete_user" ? (
//             <EditDeleteUsers
//               userId={selectedUserId}
//               onSave={handleSaveUser}
//               onDelete={handleDeleteUser}
//             />
//           ) : view === "search_users" ? (
//             <SearchUsers />
//           ) : (
//             <Typography variant="h4">Oops something went wrong!</Typography>
//           )}
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default DrawerApp;
