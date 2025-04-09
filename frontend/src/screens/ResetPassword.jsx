import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";

const ResetPassword = () => {
  const params = new URLSearchParams(window.location.search);
  const resetToken = params.get("token"); // Extract the reset token from the URL

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Optional: Validate the token when the component mounts
  useEffect(() => {
    if (!resetToken) {
      setErrorMessage("Invalid or missing token.");
    }
  }, [resetToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages and set loading state
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const payload = { password: newPassword, token: resetToken };
      const response = await axiosClient.put("/auth/reset_password", payload);

      if (response.status === 200) {
        setSuccessMessage("Password reset successfully!");
        setNewPassword(""); // Clear the password fields
        setConfirmPassword("");
      }
      else{
        throw new Error(response.status);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.token || "An unexpected error occurred.";
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("Network error. Please try again later.");
      }
    } 
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Reset Your Password
        </Typography>

        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mt: 3 }}
        >
          Reset Password
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
