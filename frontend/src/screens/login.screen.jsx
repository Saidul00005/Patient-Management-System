import React, { useRef, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Modal,
  CircularProgress,
} from "@mui/material";

import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";
import { useTranslation } from "react-i18next";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { t } = useTranslation();
  const [errors, setErrors] = useState();
  const { _setUser, setToken } = useStateContext();
  const [loading, setLoading] = useState(false);
  const handleSignIn = (ev) => {
    ev.preventDefault();

    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    setLoading(true);
    axiosClient
      .post("auth/token/obtain/", payload)
      .then((data) => {
        setToken(data.data.access);
        _setUser(data.data.user);
      })
      .catch((err) => {
        setLoading(false);
        const response = err.response;
        if (response) {
          setErrors(response.data.detail);
        } else {
          setErrors("Something went wrong! Try again later!");
        }
      });
  };

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorMessage(""); // Reset error message on close
    setSuccessMessage(""); // Reset success message on close
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRequestResetLink = async () => {
    // Clear previous messages and set loading state
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const payload = { email };
      console.log(payload);

      const response = await axiosClient.post(
        "/auth/forgot_password/",
        payload
      );

      if (response.status === 200) {
        setSuccessMessage(
          "Reset link sent successfully! Please check your email."
        );
        setEmail(""); // Clear the email field
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data?.email || "An unexpected error occurred."
        );
      } else {
        setErrorMessage("Network error. Please try again later.");
      }
    } finally {
      console.log("something went wrong");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, textAlign: "center" }}>
        <Card elevation={16}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {t("Login")}
            </Typography>
            {errors && (
              <Typography variant="body1" color="error" gutterBottom>
                {errors}
              </Typography>
            )}
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label={t("Username")}
                name="username"
                autoComplete="username"
                autoFocus
                inputRef={usernameRef}
                sx={{ width: "calc(100% - 100px)" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("Password")}
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
                sx={{ width: "calc(100% - 100px)" }}
              />
              <Button
                onClick={handleSignIn}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "calc(100% - 100px)" }}
              >
                {loading ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  t("Sign In")
                )}
              </Button>
            </Box>
            <Typography
              onClick={handleOpen}
              variant="body1"
              component="p"
              gutterBottom
              style={{ cursor: "pointer", color: "blue" }}
            >
              Forgot password?
            </Typography>

            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  width: 400,
                  bgcolor: "background.paper",
                  borderRadius: "8px",
                  boxShadow: 24,
                  p: 4,
                  mx: "auto",
                  mt: "15%", // Center vertically
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Reset Your Password
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Enter your email address below to receive a password reset
                  link.
                </Typography>

                <TextField
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                  margin="normal"
                  error={!!errorMessage} // Set error state if there's an error
                  helperText={errorMessage} // Show error message
                />

                {successMessage && (
                  <Typography variant="body2" color="success.main" gutterBottom>
                    {successMessage}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRequestResetLink}
                  fullWidth
                >
                  Send Reset Link
                </Button>
                <Button
                  onClick={handleClose}
                  disabled={loading}
                  color="secondary"
                  fullWidth
                  style={{ marginTop: "10px" }}
                >
                  Cancel
                </Button>
              </Box>
            </Modal>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
