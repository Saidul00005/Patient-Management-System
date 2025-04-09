import React, { useState } from "react";
import ReactPhoneInput from "react-phone-input-material-ui";
import { TextField } from "@mui/material";
import "react-phone-input-material-ui/lib/style.css"; // Import the necessary CSS
import { styled } from "@mui/system"; // MUI system styling

// Styled component for the TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: "10px 0px",
}));

function PhoneField({ phone, setPhone }) {
  // Handle the change of the phone number
  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  return (
    <ReactPhoneInput
      value={phone} // Managed state for the phone number
      onChange={handlePhoneChange} // Update phone number on change
      defaultCountry="CY" // Default country as Cyprus
      component={StyledTextField} // Use the styled TextField for Material UI styling
    />
  );
}

export default PhoneField;
