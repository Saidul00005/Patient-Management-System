import {
  Box,
  Button,
  TextField,
  Modal,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Card,
  CardContent,
  Typography,
  Checkbox,
  ListItemText,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";
import TaskProgress from "../components/TaskProgress";
import TaskCommentModal from "../components/TaskCommentModal";
import SendIcon from "@mui/icons-material/Send";

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

const TaskManagement = () => {
  const [users, setUsers] = useState([]);
  const [sendEmail, setSendEmail] = useState(false); // State to track the checkbox

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const { user } = useStateContext();
  const [task, setTask] = useState([]);

  const [formData, setFormData] = useState({
    description: "",
    start_date: null,
    expected_completion_date: null,
    assigned_admins: [], // To store selected admins
  });
  // Function to handle assigned admins change
  const handleAssignedAdminsChange = (event) => {
    const value = event.target.value; // This should be an array of selected values

    // Update formData with the selected admin IDs
    setFormData((prevFormData) => ({
      ...prevFormData,
      assigned_admins: value, // Update with the selected values
    }));
  };
  const handleSendEmailChange = (event) => {
    setSendEmail(event.target.checked); // Update state based on checkbox value
  };

  // Handle general changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await axiosClient.get("/api/task-management/");
        setTask(res.data);
        console.log(res.data); // Log the data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const getAdmin = async () => {
      const params = { role: "ADMIN" }; // Set the parameter for the role
      try {
        const response = await axiosClient.get("api/print_all_users/", {
          params,
        }); // Await the response
        setUsers(response.data.custom_users || []); // Use 'response.data' to access the data, default to an empty array if undefined
        console.log("data", response.data.custom_users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAdmin(); // Fetch admins
    getTasks(); // Fetch tasks
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      send_email: sendEmail, // Include the email flag in the payload
    };

    try {
      const response = await axiosClient.post("/api/task-management/", payload);
      console.log("Task created:", response.data);
      // Optionally, reset the form or display a success message
      setFormData({
        description: "",
        start_date: null,
        expected_completion_date: null,
        assigned_admins: [], // Reset assigned admins
      });
      setSendEmail(false); // Reset the send email checkbox
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleEmail = async (taskId) => {
    try {
      const response = await axiosClient.post("/api/send-task-email/", {
        task_id: taskId,
      });
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error.response.data);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await axiosClient.put("/api/task-management/", {
        task_id: taskId,
        status: newStatus,
      });
      console.log("Status updated successfully:", response.data);
      // Option 2: Update state directly (if not refetching tasks)
      setTask((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      // Optionally, trigger a state update to reflect the new status in the UI
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
    }
  };

  console.log(users); // Make sure 'setUsers' is updating the state correctly

  const handleAddComment = async (taskId, commentText) => {
    try {
      const response = await axiosClient.post("/api/task-comment/", {
        task: taskId,
        comment: commentText,
      });
      console.log("Comment added successfully:", response.data);
      // You can update the task list or comments section here
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      <Box>
        {user.user_role === "STAFF" ? (
          <Button variant="contained" onClick={handleOpen}>
            Create Task
          </Button>
        ) : (
          ""
        )}
      </Box>

      <Card elevation={16}>
        <CardContent>
          <Typography>My Task</Typography>

          <TableContainer
            component={Paper}
            style={{ maxHeight: 400, overflowY: "auto", overflowX: "hidden" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Start Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Expected Completion Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Created At
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Admin
                    </Typography>
                  </TableCell>
                  {user.user_role === "STAFF" && (
                    <TableCell>
                      <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                        Inform
                      </Typography>
                    </TableCell>
                  )}

                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Task Progress
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Add Comment
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {task.map((task) => (
                  <TableRow key={task?.id}>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.start_date}</TableCell>
                    <TableCell>{task?.expected_completion_date}</TableCell>
                    <TableCell>
                      <Select
                        value={task?.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        fullWidth
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="in_progress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </TableCell>

                    <TableCell>
                      {new Date(task.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {task.assigned_admins_usernames.map((admin) => (
                        <Typography>{admin},</Typography>
                      ))}
                    </TableCell>

                    {user.user_role === "STAFF" && (
                      <TableCell>
                        {" "}
                        <SendIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleEmail(task.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <TaskProgress task={task} />
                    </TableCell>
                    <TableCell>
                      <TaskCommentModal
                        taskId={task.id}
                        handleAddComment={handleAddComment}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Task Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              type="date"
              label="Start Date"
              id="start_date"
              value={formData.start_date}
              onChange={(e) => handleDateChange("start_date", e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="date"
              id="ex-date"
              label="Expected Completion Date"
              value={formData.expected_completion_date}
              onChange={(e) =>
                handleDateChange("expected_completion_date", e.target.value)
              }
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <label htmlFor="assigned_admins">Assigned Admins</label>
            <Select
              id="assigned_admins"
              multiple
              value={formData.assigned_admins} // This should always be an array
              onChange={handleAssignedAdminsChange}
              fullWidth
              margin="normal"
              renderValue={(selected) => selected.join(", ")} // Display selected admin usernames
            >
              {users.length > 0 ? (
                users.map((admin) => (
                  <MenuItem key={admin.id} value={admin.id}>
                    <Checkbox
                      checked={
                        formData.assigned_admins &&
                        formData.assigned_admins.indexOf(admin.id) > -1
                      }
                    />

                    <ListItemText primary={admin.username} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No users found.</MenuItem>
              )}
            </Select>

            <FormControlLabel
              control={
                <Checkbox
                  checked={sendEmail}
                  onChange={handleSendEmailChange}
                />
              }
              label="Send Email"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Task
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default TaskManagement;
