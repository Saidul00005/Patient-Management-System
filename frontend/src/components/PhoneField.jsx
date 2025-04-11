import React from "react";
import PhoneInput from "react-phone-input-2";
import { styled } from "@mui/system"; // MUI system styling
import 'react-phone-input-2/lib/material.css'; // Import the necessary CSS for react-phone-input-2

const StyledPhoneInputWrapper = styled('div')({
  margin: "10px 0",
  "& .form-control": {
    width: "100%",
    height: "56px",
    fontSize: "16px",
    paddingLeft: "48px", // leave room for flag
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
});


function PhoneField({ phone, setPhone }) {

  // Handle the change of the phone number
  const handlePhoneChange = (value) => {
    setPhone(value); // Update the phone number state
  };

  return (
    <StyledPhoneInputWrapper>
    <PhoneInput
      country={'cy'}
      value={phone}
      onChange={handlePhoneChange}
      inputProps={{
        required: true,
        name: 'phone',
      }}
    />
  </StyledPhoneInputWrapper>
  );
}

export default PhoneField;
