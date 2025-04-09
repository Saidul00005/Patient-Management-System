import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment"; // AddComment Icon from MUI
import axiosClient from "../axiosClient";

// Styling for the modal
// const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
// };

const TaskCommentModal = ({ taskId, handleAddComment }) => {
  const [open, setOpen] = useState(false); // Modal visibility state
  const [commentText, setCommentText] = useState(""); // Comment input state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to submit the comment
  const handleSubmit = () => {
    if (commentText) {
      handleAddComment(taskId, commentText);
      setCommentText(""); // Reset input after submission
      handleClose(); // Close modal after comment is added
    }
  };

  const [comments, setComments] = useState([]);

  // Fetch comments when the modal is opened
  useEffect(() => {
    if (open) {
      const fetchComments = async () => {
        try {
          const response = await axiosClient.get(`/api/task-comment/`, {
            params: { task_id: taskId },
          });
          setComments(response.data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };

      fetchComments();
    }
  }, [open, taskId]);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <AddCommentIcon />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            margin: "10% auto",
            maxWidth: "500px",
          }}
        >
          <Typography variant="h6">Task Comments</Typography>
          <List>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <ListItem key={comment.id}>
                  <ListItemText
                    primary={comment.comment}
                    secondary={`By: ${comment.author_username} - ${new Date(
                      comment.created_at
                    ).toLocaleString()}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No comments yet.</Typography>
            )}
          </List>
          <Box>
            <Typography variant="h6">Add Comment</Typography>
            <TextField
              label="Comment"
              fullWidth
              multiline
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              margin="normal"
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>

            <Button onClick={handleClose} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TaskCommentModal;
