import React, { useState, useRef } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";
import { useTranslation } from "react-i18next";

const ResetPasswordForm = () => {
  const { user } = useStateContext();

  const [error, setError] = useState([]);
  const [message, setMessage] = useState([]);

  const oldpassRef = useRef(null);
  const passwordRef = useRef(null);
  const repasswordRef = useRef(null);
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset previous error message

    // Validation
    if (
      !oldpassRef.current.value ||
      !passwordRef.current.value ||
      !repasswordRef.current.value
    ) {
      setError("All fields are required.");
      return;
    }

    if (passwordRef.current.value !== repasswordRef.current.value) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      username: user.username,
      old_password: oldpassRef.current.value,
      new_password1: passwordRef.current.value,
      new_password2: repasswordRef.current.value,
    };

    axiosClient
      .patch("auth/password_reset/", payload)
      .then(() => {
        setMessage("Password changed successfully");
        oldpassRef.current.value = null;
        passwordRef.current.value = null;
        repasswordRef.current.value = null;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card elevation={16}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {t("Reset Password")}
        </Typography>
        {error && message.length === 0 && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {message && (
          <Typography variant="body1" color="green" gutterBottom>
            {message}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Box sx={{ "& .MuiTextField-root": { marginBottom: "1rem" } }}>
            <FormControl sx={{ width: "100%", mb: "1rem" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                {t("Old Password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                inputRef={oldpassRef}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t("Old Password")}
              />
            </FormControl>

            <FormControl sx={{ width: "100%", mb: "1rem" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                {t("New Password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                inputRef={passwordRef}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t("New Password")}
              />
            </FormControl>

            <FormControl sx={{ width: "100%", mb: "1rem" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                {t("Confirm Password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                inputRef={repasswordRef}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t("Confirm Password")}
              />
            </FormControl>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            {t("Reset Password")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
