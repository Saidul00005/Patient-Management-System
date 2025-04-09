import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, List, ListItem, Divider } from "@mui/material";
import axiosClient from "../axiosClient";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const AppointmentCommentModal = ({ id, open, handleClose, getAppointment }) => {
  // const [comment, setComment] = useState('');
  // const [visibility] = useState(true);

  const [comments, setComments] = useState([]);

  // Define fetchComments outside of useEffect
  const fetchComments = async () => {
    try {
      const response = await axiosClient.get(`api/comments/${id}/`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // const handleSave = async () => {
  //     try {
  //         const response = await axiosClient.post('api/comments/create/', {
  //             appointment: id,
  //             comment_text: comment,
  //             visibility: visibility,  // Uncomment and add this if the API expects it
  //         });
  //         console.log('Comment saved:', response.data);
  //         fetchComments(); // Call fetchComments after saving the comment
  //         getAppointment(); // Refresh the appointment data after saving the comment
  //         // handleClose(); // Close the modal after saving
  //         setComment('')
  //     } catch (error) {
  //         // Log the full error response
  //         if (error.response) {
  //             console.error('Error response:', error.response);
  //             alert(`Error saving comment: ${error.response.data}`);
  //         } else {
  //             console.error('Error saving comment:', error);
  //         }
  //     }
  // };

  useEffect(() => {
    if (open) {
      // Fetch comments only when the modal is open
      fetchComments();
    }
    // eslint-disable-next-line
  }, [id, open]); // Add open to the dependency array to refetch comments when modal opens

  console.log(comments);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box>
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
              Comments
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
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id}>
                {comment.visibility ? (
                  <Typography variant="body1">
                    <i>
                      {comment.user.username} -{" "}
                      {new Date(comment.created_at).toLocaleString()}
                    </i>{" "}
                    - {comment.visibility ? "visible" : ""}
                    <br />
                    {comment.comment_text}
                  </Typography>
                ) : (
                  "No Comments"
                )}
                <Divider component="li" />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* <Typography variant="h6" component="h6">
                    Add Comment
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked
                            onChange={(e) => setVisibility(e.target.checked)} // Use e.target.checked
                        />
                    }
                    label="View By Client"
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={comment}
                    variant="outlined"
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your comment"
                    sx={{ my: 2 }}
                />
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button> */}
      </Box>
    </Modal>
  );
};

export default AppointmentCommentModal;
