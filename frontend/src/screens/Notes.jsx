import {
  Box,
  Button,
  Card,
  CardContent,
  Select,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

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

const Notes = () => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState();
  const [noteStatus, setNoteStatus] = useState();
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false); // Track whether we're editing
  const [editNoteId, setEditNoteId] = useState(null); // Track the note ID we're editing
  const handleOpen = () => {
    setOpen(true);
    setEditMode(false); // Reset to creation mode when opening the modal
    setNote(""); // Clear the note input
    setNoteStatus("");
  };

  const handleClose = () => {
    setOpen(false);
    setNote("");
    setNoteStatus("");
    setEditNoteId(null);
    setEditMode(false);
  };

  const handleEdit = (note) => {
    setEditMode(true); // Switch to edit mode
    setEditNoteId(note.id); // Store the note's ID
    setNote(note.content); // Pre-fill the input with the existing note content
    setNoteStatus(note.status);
    setOpen(true); // Open the modal
  };

  const handleSave = async () => {
    if (!note || typeof note !== "string" || !note.trim()) {
      alert("Please fill out the required note field.");
      return;
    }

    try {
      if (editMode) {
        // Update note via PUT request if we're editing
        const response = await axiosClient.put(`api/create-note/`, {
          note_id: editNoteId,
          content: note,
          status: noteStatus,
        });
        console.log("Note updated:", response.data);

        // Update the local notes state with the updated note
        setNotes(notes.map((n) => (n.id === editNoteId ? response.data : n)));
      } else {
        // Create new note via POST request if we're not editing
        const response = await axiosClient.post("api/create-note/", {
          content: note,
          status: noteStatus,
        });
        console.log("Note saved:", response.data);

        // Add the new note to the notes list
        setNotes([...notes, response.data]);
      }

      // Clear the input field and close the modal
      setNote("");
      setNoteStatus("");
      handleClose();
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        alert(`Error saving note: ${error.response.data}`);
      } else {
        console.error("Error saving note:", error);
      }
    }
  };
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosClient.get("api/create-note/");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes(); // Call the async function
  }, []);

  const handleDelete = async (noteId) => {
    try {
      // Send DELETE request to remove the note
      await axiosClient.delete(`api/create-note/`, {
        params: { note_id: noteId }, // Correct way to pass parameters
      });
      console.log("Note deleted");

      // Remove the deleted note from the local state
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting the note");
    }
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
        <Card elevation={16}>
          <CardContent>
            <Button onClick={handleOpen}>Create Notes</Button>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Note
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Create At
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map((note) => (
                  <TableRow key={note?.id}>
                    <TableCell>{note.content}</TableCell>
                    <TableCell>
                      {new Date(note.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>{note.status}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(note)}>Edit</Button>
                      <Button
                        onClick={() => handleDelete(note.id)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>

      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box
    sx={{
      width: { xs: '90%', sm: '80%', md: '60%', lg: '40%' }, // Responsive width
      maxWidth: '600px', // Maximum width
      bgcolor: 'background.paper',
      borderRadius: 2, // Rounded corners
      boxShadow: 24,
      p: 3, // Padding
      mx: 'auto', // Center horizontally
      mt: { xs: '10%', md: '5%' }, // Adjust top margin for screens
      overflowY: 'auto', // Allow scrolling for overflow content
    }}
  >
    <TextField
      fullWidth
      multiline
      rows={4}
      required
      value={note}
      variant="outlined"
      onChange={(e) => setNote(e.target.value)}
      placeholder="Enter your notes"
      sx={{ my: 2 }}
    />
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel id="note-status">Status</InputLabel>
      <Select
        labelId="note-status"
        required
        value={noteStatus}
        onChange={(e) => setNoteStatus(e.target.value)}
        label="Status"
      >
        <MenuItem value={"Open"}>Open</MenuItem>
        <MenuItem value={"Pending"}>Pending</MenuItem>
        <MenuItem value={"Closed"}>Closed</MenuItem>
      </Select>
    </FormControl>

    <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={handleSave}
      fullWidth // Full width for small screens
      sx={{
        mt: 2,
      }}
    >
      {editMode ? "Update" : "Submit"}
    </Button>
  </Box>
</Modal>

    </>
  );
};

export default Notes;
