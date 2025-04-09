import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { SketchPicker } from "react-color";

import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

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

export default function UserEditModal({ id, open, handleClose, getUsers }) {
  const [formData, setFormData] = useState({});
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      axiosClient
        .get(`api/user/${id}/`)
        .then((res) => {
          setFormData(res?.data);
          setGender(res?.data?.gender);
          setRole(res?.data?.user_role);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    formData["gender"] = gender;
    formData["color"] = color;
    // formData['user_role'] = role
    axiosClient
      .patch(`api/user-edit/${id}/`, formData)
      .then((res) => {
        getUsers();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              Edit User
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
          <hr
            style={{
              border: "none",
              borderBottom: "1px solid #e6ebf1",
              marginBottom: "25px",
            }}
          />
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                "& .MuiTextField-root": { marginBottom: "1rem" },
                height: "400px",
                overflowX: "hidden",
                overflowY: "scroll",
                mb: 5,
              }}
            >
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                name="first_name"
                onChange={handleChange}
                value={formData?.first_name}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="Surname"
                variant="outlined"
                name="last_name"
                onChange={handleChange}
                value={formData?.last_name}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                name="date_birth"
                value={formData?.date_birth}
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                name="address"
                onChange={handleChange}
                value={formData?.address}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="Postal code"
                variant="outlined"
                name="postcose"
                onChange={handleChange}
                value={formData?.postcose}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                name="city"
                onChange={handleChange}
                value={formData?.city}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="Telephone"
                variant="outlined"
                name="phone_number"
                onChange={handleChange}
                value={formData?.phone_number}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="ID Number"
                variant="outlined"
                name="id_card"
                onChange={handleChange}
                value={formData?.id_card}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel component="legend" sx={{ marginRight: "1rem" }}>
                  Gender
                </FormLabel>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    sx={{ flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="M"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="F"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData?.email}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {role === "STAFF" && (
                <>
                  <Typography
                    sx={{ textAlign: "left", mt: 3 }}
                    variant="body1"
                    gutterBottom
                  >
                    Pick a color for the appointment:
                  </Typography>
                  <SketchPicker
                    color={color}
                    onChangeComplete={(newColor) => setColor(newColor.hex)}
                  />{" "}
                </>
              )}

              {/* <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                name='username'
                                onChange={handleChange}
                            /> */}

              {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                                <FormLabel component="legend" sx={{ marginRight: "1rem" }}>
                                    Role
                                </FormLabel>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        name="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        sx={{ flexDirection: "row" }}
                                    >
                                        <FormControlLabel
                                            value="ADMIN"
                                            control={<Radio />}
                                            label="Admin"
                                        />
                                        <FormControlLabel
                                            value="STAFF"
                                            control={<Radio />}
                                            label="Staff"
                                        />
                                        <FormControlLabel
                                            value="CLIENT"
                                            control={<Radio />}
                                            label="Client"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Box> */}
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
