// import React, { useState, useRef, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   InputLabel,
//   MenuItem,
//   Select,
// } from "@mui/material";

// import axiosClient from "../axiosClient";

// const UserForm = () => {
//   const nameRef = useRef(null);
//   const surnameRef = useRef(null);
//   const dateRef = useRef(null);
//   const usernameRef = useRef(null);
//   const passwordRef = useRef(null);
//   const emailRef = useRef(null);
//   const addressRef = useRef(null);
//   const postalRef = useRef(null);
//   const cityRef = useRef(null);
//   const telephoneRef = useRef(null);

//   const [gender, setGender] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState();
//   const [message, setMessage] = useState();

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const payload = {
//       username: usernameRef.current.value,
//       password: passwordRef.current.value,
//       user_role: role,
//       first_name: nameRef.current.value,
//       last_name: surnameRef.current.value,
//       email: emailRef.current.value,
//       date_birth: dateRef.current.value,
//       gender: gender,
//       city: cityRef.current.value,
//       address: addressRef.current.value,
//       postcose: postalRef.current.value,
//       phone_number: telephoneRef.current.value,
//     };

//     axiosClient
//       .post("api/user/create/", payload)
//       .then(() => {
//         setMessage("User added successfully");
//         setError();
//         usernameRef.current.value = null;
//         passwordRef.current.value = null;
//         setRole("");
//         nameRef.current.value = null;
//         surnameRef.current.value = null;
//         emailRef.current.value = null;
//         dateRef.current.value = null;
//         setGender("");
//         cityRef.current.value = null;
//         addressRef.current.value = null;
//         postalRef.current.value = null;
//       })
//       .catch((err) => {
//         setMessage();
//         console.log(err);
//         // setError(err.response.data.username[0])
//       });
//   };

//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//   };

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   return (
//     <Card elevation={16}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           Client Information
//         </Typography>
//         {error && (
//           <Typography variant="body1" color="error" gutterBottom>
//             {error}
//           </Typography>
//         )}
//         {message && (
//           <Typography variant="body1" color="green" gutterBottom>
//             {message}
//           </Typography>
//         )}
//         <form onSubmit={handleSubmit}>
//           <Box sx={{ "& .MuiTextField-root": { marginBottom: "1rem" } }}>
//             <TextField
//               fullWidth
//               label="Name"
//               variant="outlined"
//               inputRef={nameRef}
//             />
//             <TextField
//               fullWidth
//               label="Surname"
//               variant="outlined"
//               inputRef={surnameRef}
//             />
//             <TextField
//               fullWidth
//               type="date"
//               label="Date of Birth"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               inputRef={dateRef}
//             />
//             <TextField
//               fullWidth
//               label="Address"
//               variant="outlined"
//               inputRef={addressRef}
//             />
//             <TextField
//               fullWidth
//               label="Postal code"
//               variant="outlined"
//               inputRef={postalRef}
//             />
//             <TextField
//               fullWidth
//               label="City"
//               variant="outlined"
//               inputRef={cityRef}
//             />
//             <TextField
//               fullWidth
//               label="Telephone"
//               variant="outlined"
//               inputRef={telephoneRef}
//             />
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <FormLabel component="legend" sx={{ marginRight: "1rem" }}>
//                 Gender
//               </FormLabel>
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   name="gender"
//                   value={gender}
//                   onChange={handleGenderChange}
//                   sx={{ flexDirection: "row" }}
//                 >
//                   <FormControlLabel
//                     value="M"
//                     control={<Radio />}
//                     label="Male"
//                   />
//                   <FormControlLabel
//                     value="F"
//                     control={<Radio />}
//                     label="Female"
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Box>
//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               type="email"
//               inputRef={emailRef}
//             />
//             <TextField
//               fullWidth
//               label="Username"
//               variant="outlined"
//               inputRef={usernameRef}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               variant="outlined"
//               inputRef={passwordRef}
//             />
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <FormLabel component="legend" sx={{ marginRight: "1rem" }}>
//                 Role
//               </FormLabel>
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   name="role"
//                   value={role}
//                   onChange={handleRoleChange}
//                   sx={{ flexDirection: "row" }}
//                 >
//                   <FormControlLabel
//                     value="ADMIN"
//                     control={<Radio />}
//                     label="Admin"
//                   />
//                   <FormControlLabel
//                     value="STAFF"
//                     control={<Radio />}
//                     label="Staff"
//                   />
//                   <FormControlLabel
//                     value="CLIENT"
//                     control={<Radio />}
//                     label="Client"
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Box>
//           </Box>
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default UserForm;

import React, { useState, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { SketchPicker } from "react-color";
import axiosClient from "../axiosClient";
import { useTranslation } from "react-i18next";
import PhoneField from "../components/PhoneField";
import { IconButton} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UserForm = () => {
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const dateRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const gesyNumberRef = useRef(null);

  const postalRef = useRef(null);
  const cityRef = useRef(null);
  const telephoneRef = useRef(null);
  const cardNumberRef = useRef();
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [color, setColor] = useState("");
  const [phone, setPhone] = useState("+357");

  const [errors, setErrors] = useState({});

  const { token } = useStateContext();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let phoneNumber = "+" + phone;

    // if (!phoneNumber.startsWith("+357")) {
    //   phoneNumber = "+357" + phoneNumber;
    // }
    if (dateRef.current.value && !/^\d{4}-\d{2}-\d{2}$/.test(dateRef.current.value)) {
      setErrors({...errors, date_birth: "Invalid date format. Use YYYY-MM-DD"});
      return;
    }

    const payload = {
      user_role: role,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      first_name: nameRef.current.value,
      last_name: surnameRef.current.value,
      email: emailRef.current.value,
      date_birth: dateRef.current.value ||null,
      gender: gender, 
      phone_number: phoneNumber,
      ...(role !== "CLIENT" && {
        id_card: cardNumberRef.current.value, 
        city: cityRef.current?.value || "",
        address: addressRef.current?.value || "",
        postcode: postalRef.current?.value || "",
        gesy_number: gesyNumberRef.current?.value || "",
        ...(role === "STAFF" && { color: color }), 
      }),
    };

    axiosClient
      // .post("api/user/", payload) // Fixed this line
      .post("/api/user/", payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `JWT-${token}`,
        },
      })
      // .post("/api/user/")
      .then((res) => {
        console.log("res", res);
        setError({});
        setMessage("User added successfully");
        setError();
        usernameRef.current.value = null;
        passwordRef.current.value = null;
        // cardNumberRef.current.value = null;
        if (cardNumberRef.current) cardNumberRef.current.value = null;
        nameRef.current.value = null;
        surnameRef.current.value = null;
        emailRef.current.value = null;
        dateRef.current.value = null;
        setGender("");
        // cityRef.current.value = null;
        // addressRef.current.value = null;
        // postalRef.current.value = null;
        // gesyNumberRef.current.value = null;
        if (cityRef.current) cityRef.current.value = null;
        if (addressRef.current) addressRef.current.value = null;
        if (postalRef.current) postalRef.current.value = null;
        if (gesyNumberRef.current) gesyNumberRef.current.value = null;
        setPhone("+357"); // Reset phone input if needed
        setColor(""); // Reset color if applicable
      })
      .catch((err) => {
        const allIssues = Object.keys(err.response?.data);
        if (error?.response?.data?.code)
          return setError(error.response.data.code);
        setError(
          allIssues.length
            ? err.response?.data[allIssues[0]][0] ||
                "Some input is invalid! please try again"
            : "Some input is invalid! please try again"
        );
        console.log("error when creating new user", err);
        // setError(err.response.data.username[0])////////////////////////////

        setErrors(err.response?.data);
      });
  };

  const handleReset = () => {
    setRole("");
    setGender("");
    setPhone("+357");
    setColor("");
    setError(undefined);
    setMessage(undefined);
    setErrors({});
  
    // Clear all refs if they exist
    const refs = [
      nameRef,
      surnameRef,
      dateRef,
      usernameRef,
      passwordRef,
      emailRef,
      addressRef,
      gesyNumberRef,
      postalRef,
      cityRef,
      cardNumberRef
    ];
  
    refs.forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setErrors({ ...errors, user_role: "" });
  };

  return (
    <Card
      sx={
        {
          // background: 'red'    // C
        }
      }
      elevation={16}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {t("Information")}
        </Typography>
        <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center" }} >
              <FormLabel component="legend" required sx={{ marginRight: "1rem", '& .MuiFormLabel-asterisk': { color: 'red' } }}>
                {t("Role")}
              </FormLabel>
              <FormControl component="fieldset">
                <RadioGroup
                  name="role"
                  value={role}
                  onChange={handleRoleChange}
                  sx={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="ADMIN"
                    control={<Radio />}
                    label={t("Secretary")}
                  />
                  <FormControlLabel
                    value="STAFF"
                    control={<Radio />}
                    label={t("Doctor")}
                  />
                  <FormControlLabel
                    value="CLIENT"
                    control={<Radio />}
                    label={t("Patient")}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            {errors?.user_role && (
              <Typography
                sx={{ textAlign: "left", mb: 2 }}
                color="error"
                variant="body1"
              >
                {errors?.user_role}
              </Typography>
            )}
          <Box sx={{ "& .MuiTextField-root": { marginBottom: "1rem" } }}>
            <TextField
              fullWidth
              label={t("Name")}
              variant="outlined"
              required
              InputLabelProps={{
                sx: {
                  "& .MuiFormLabel-asterisk": { color: "red" }
                }
              }}
              inputRef={nameRef}
              onChange={(e) => setErrors({ ...errors, first_name: "" })}
            />
            {errors?.first_name && (
              <Typography
                sx={{ textAlign: "left", mb: 2 }}
                color="error"
                variant="body1"
              >
                {errors?.first_name}
              </Typography>
            )}
            <TextField
              fullWidth
              label={t("Surname")}
              variant="outlined"
              required
              InputLabelProps={{
                sx: {
                  "& .MuiFormLabel-asterisk": { color: "red" }
                }
              }}
              inputRef={surnameRef}
              onChange={(e) => setErrors({ ...errors, last_name: "" })}
            />
            {errors?.last_name && (
              <Typography
                sx={{ textAlign: "left", mb: 2 }}
                color="error"
                variant="body1"
              >
                {errors?.last_name}
              </Typography>
            )}
            <TextField
              fullWidth
              type="date"
              label={t("Date of Birth")}
              variant="outlined"
              InputLabelProps={{
                // sx: {
                //   "& .MuiFormLabel-asterisk": { color: "red" }
                // },
                shrink: true 
              }}
              inputRef={dateRef}
              onChange={(e) => setErrors({ ...errors, date_birth: "" })}
            />
            {errors?.date_birth && (
              <Typography
                sx={{ textAlign: "left", mb: 2 }}
                color="error"
                variant="body1"
              >
                {errors?.date_birth}
              </Typography>
            )}
            {role !== "CLIENT" && (
            <>
            <TextField
              fullWidth
              label={t("GESY NUMBER")}
              variant="outlined"
              inputRef={gesyNumberRef}
            />
            <TextField
              fullWidth
              label={t("Address")}
              variant="outlined"
              inputRef={addressRef}
            />
            <TextField
              fullWidth
              label={t("Postal code")}
              variant="outlined"
              inputRef={postalRef}
            />
            <TextField
              fullWidth
              label={t("City")}
              variant="outlined"
              inputRef={cityRef}
            />
            </>
            )}
            <PhoneField phone={phone} setPhone={(val) => {
              setPhone(val);
            }} 
            />

            {errors?.phone_number && (
              <Typography
                sx={{ textAlign: "left", mb: 2 }}
                color="error"
                variant="body1"
              >
                {errors?.phone_number}
              </Typography>
            )}
           {role !== "CLIENT" && (
            <>
            <TextField
              fullWidth
              label={t("ID Number")}
              variant="outlined"
              required
              InputLabelProps={{
                sx: {
                  "& .MuiFormLabel-asterisk": { color: "red" }
                }
              }}
              inputRef={cardNumberRef}
              onChange={(e) => setErrors({ ...errors, id_card: "" })}
            />
            {role !== "CLIENT" && errors?.id_card && (
              <Typography
                sx={{ textAlign: "left", mb: 2 }}
                color="error"
                variant="body1"
              >
                {errors?.id_card}
              </Typography>
            )}
            </>
           )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormLabel component="legend" sx={{ marginRight: "1rem" }}>
                {t("Gender")}
              </FormLabel>
              <FormControl component="fieldset">
                <RadioGroup
                  name="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  sx={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label={t("Male")}
                  />
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label={t("Female")}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              label={t("Email")}
              variant="outlined"
              required
              InputLabelProps={{
                sx: {
                  "& .MuiFormLabel-asterisk": { color: "red" }
                }
              }}
              type="email"
              inputRef={emailRef}
              onChange={(e) => setErrors({ ...errors, email: "" })}
            />
            {errors?.email && (
              <Typography
                sx={{ textAlign: "left", mb: 2 }}
                color="error"
                variant="body1"
              >
                {errors?.email}
              </Typography>
            )}
            <TextField
              fullWidth
              label={t("Username")}
              variant="outlined"
              required
              InputLabelProps={{
                sx: {
                  "& .MuiFormLabel-asterisk": { color: "red" }
                }
              }}
              inputRef={usernameRef}
              onChange={(e) => setErrors({ ...errors, username: "" })}
            />
            {errors?.username && (
              <Typography
                sx={{ textAlign: "left", mb: 2 }}
                color="error"
                variant="body1"
              >
                {errors?.username}
              </Typography>
            )}
            <TextField
              fullWidth
              label={t("Password") + " *"}
              variant="outlined"
              required
              InputLabelProps={{
                sx: {
                  "& .MuiFormLabel-asterisk": { color: "red" }
                }
              }}
              type={showPassword ? "text" : "password"}
              inputRef={passwordRef}
              onChange={(e) => setErrors({ ...errors, password: "" })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {errors?.password && (
              <Typography
                sx={{ textAlign: "left", mb: 2 }}
                color="error"
                variant="body1"
              >
                {errors?.password}
              </Typography>
            )}

            {role === "STAFF" && (
              <>
                <Typography
                  sx={{ textAlign: "left", mt: 3 }}
                  variant="body1"
                  gutterBottom
                >
                  {t("Pick a color for the appointment")}:
                </Typography>
                <SketchPicker
                  color={color}
                  onChangeComplete={(newColor) => setColor(newColor.hex)}
                />{" "}
              </>
            )}
          </Box>
          <Button
            sx={{ mb: 2 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            {t("Submit")}
          </Button>
          <Button
            sx={{ mb: 2, ml: 2 }}
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleReset}
          >
            {t("Reset")}
          </Button>
          {message && (
            <Typography variant="body1" color="green" gutterBottom>
              {message}
            </Typography>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;

// // import React, { useState, useRef } from "react";
// // import {
// //   Card,
// //   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import axiosClient from "../axiosClient";

// const UserForm = () => {
//   const nameRef = useRef(null);
//   const surnameRef = useRef(null);
//   const dateRef = useRef(null);
//   const usernameRef = useRef(null);
//   const passwordRef = useRef(null);
//   const emailRef = useRef(null);
//   const addressRef = useRef(null);
//   const postalRef = useRef(null);
//   const cityRef = useRef(null);
//   const telephoneRef = useRef(null);

//   const [gender, setGender] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const payload = {
//       username: usernameRef.current.value,
//       password: passwordRef.current.value,
//       user_role: role,
//       first_name: nameRef.current.value,
//       last_name: surnameRef.current.value,
//       email: emailRef.current.value,
//       date_birth: dateRef.current.value,
//       gender: gender,
//       city: cityRef.current.value,
//       address: addressRef.current.value,
//       postcode: postalRef.current.value,
//       phone_number: telephoneRef.current.value,
//     };

//     axiosClient
//       .post("api/user/", payload)
//       .then(() => {
//         setMessage("User added successfully");
//         setError("");
//         usernameRef.current.value = "";
//         passwordRef.current.value = "";
//         setRole("");
//         nameRef.current.value = "";
//         surnameRef.current.value = "";
//         emailRef.current.value = "";
//         dateRef.current.value = "";
//         setGender("");
//         cityRef.current.value = "";
//         addressRef.current.value = "";
//         postalRef.current.value = "";
//         telephoneRef.current.value = "";
//       })

//       .catch((err) => {
//         setMessage("");
//         if (err.response && err.response.data) {
//           setError(Object.values(err.response.data).flat().join(' '));
//         } else {
//           setError('An error occurred');
//         }
//         console.error(err);
//       });

//   };

//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//   };

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   return (
//     <Card elevation={16}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           Client Information
//         </Typography>
//         {error && (
//           <Typography variant="body1" color="error" gutterBottom>
//             {error}
//           </Typography>
//         )}
//         {message && (
//           <Typography variant="body1" color="green" gutterBottom>
//             {message}
//           </Typography>
//         )}
//         <form onSubmit={handleSubmit}>
//           <Box sx={{ "& .MuiTextField-root": { marginBottom: "1rem" } }}>
//             <TextField
//               fullWidth
//               label="Name"
//               variant="outlined"
//               inputRef={nameRef}
//             />
//             <TextField
//               fullWidth
//               label="Surname"
//               variant="outlined"
//               inputRef={surnameRef}
//             />
//             <TextField
//               fullWidth
//               type="date"
//               label="Date of Birth"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               inputRef={dateRef}
//             />
//             <TextField
//               fullWidth
//               label="Address"
//               variant="outlined"
//               inputRef={addressRef}
//             />
//             <TextField
//               fullWidth
//               label="Postal code"
//               variant="outlined"
//               inputRef={postalRef}
//             />
//             <TextField
//               fullWidth
//               label="City"
//               variant="outlined"
//               inputRef={cityRef}
//             />
//             <TextField
//               fullWidth
//               label="Telephone"
//               variant="outlined"
//               inputRef={telephoneRef}
//             />
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <FormLabel component="legend" sx={{ marginRight: "1rem" }}>
//                 Gender
//               </FormLabel>
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   name="gender"
//                   value={gender}
//                   onChange={handleGenderChange}
//                   sx={{ flexDirection: "row" }}
//                 >
//                   <FormControlLabel
//                     value="M"
//                     control={<Radio />}
//                     label="Male"
//                   />
//                   <FormControlLabel
//                     value="F"
//                     control={<Radio />}
//                     label="Female"
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Box>
//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               type="email"
//               inputRef={emailRef}
//             />
//             <TextField
//               fullWidth
//               label="Username"
//               variant="outlined"
//               inputRef={usernameRef}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               variant="outlined"
//               inputRef={passwordRef}
//             />
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <FormLabel component="legend" sx={{ marginRight: "1rem" }}>
//                 Role
//               </FormLabel>
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   name="role"
//                   value={role}
//                   onChange={handleRoleChange}
//                   sx={{ flexDirection: "row" }}
//                 >
//                   <FormControlLabel
//                     value="ADMIN"
//                     control={<Radio />}
//                     label="Admin"
//                   />
//                   <FormControlLabel
//                     value="STAFF"
//                     control={<Radio />}
//                     label="Staff"
//                   />
//                   <FormControlLabel
//                     value="CLIENT"
//                     control={<Radio />}
//                     label="Client"
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Box>
//           </Box>
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default UserForm;

// import React, { useState, useRef } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import axiosClient from "../axiosClient";

// const UserForm = () => {
//   const nameRef = useRef(null);
//   const surnameRef = useRef(null);
//   const dateRef = useRef(null);
//   const usernameRef = useRef(null);
//   const passwordRef = useRef(null);
//   const emailRef = useRef(null);
//   const addressRef = useRef(null);
//   const postalRef = useRef(null);
//   const cityRef = useRef(null);
//   const telephoneRef = useRef(null);
//   const idNumberRef = useRef(null); // New reference for ID number

//   const [gender, setGender] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const payload = {
//       username: usernameRef.current.value,
//       password: passwordRef.current.value,
//       user_role: role,
//       first_name: nameRef.current.value,
//       last_name: surnameRef.current.value,
//       email: emailRef.current.value,
//       date_birth: dateRef.current.value,
//       gender: gender,
//       city: cityRef.current.value,
//       address: addressRef.current.value,
//       postcode: postalRef.current.value,
//       phone_number: telephoneRef.current.value,
//       id_number: idNumberRef.current.value, // Add ID number to payload
//     };

//     axiosClient
//       .post("api/user/", payload)
//       .then(() => {
//         setMessage("User added successfully");
//         setError("");
//         usernameRef.current.value = "";
//         passwordRef.current.value = "";
//         setRole("");
//         nameRef.current.value = "";
//         surnameRef.current.value = "";
//         emailRef.current.value = "";
//         dateRef.current.value = "";
//         setGender("");
//         cityRef.current.value = "";
//         addressRef.current.value = "";
//         postalRef.current.value = "";
//         telephoneRef.current.value = "";
//         idNumberRef.current.value = ""; // Clear the ID number field
//       })
//       .catch((err) => {
//         setMessage("");
//         if (err.response && err.response.data) {
//           setError(Object.values(err.response.data).flat().join(' '));
//         } else {
//           setError('An error occurred');
//         }
//         console.error(err);
//       });
//   };

//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//   };

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   return (
//     <Card elevation={16}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           Client Information
//         </Typography>
//         {error && (
//           <Typography variant="body1" color="error" gutterBottom>
//             {error}
//           </Typography>
//         )}
//         {message && (
//           <Typography variant="body1" color="green" gutterBottom>
//             {message}
//           </Typography>
//         )}
//         <form onSubmit={handleSubmit}>
//           <Box sx={{ "& .MuiTextField-root": { marginBottom: "1rem" } }}>
//             <TextField
//               fullWidth
//               label="Name"
//               variant="outlined"
//               inputRef={nameRef}
//             />
//             <TextField
//               fullWidth
//               label="Surname"
//               variant="outlined"
//               inputRef={surnameRef}
//             />
//             <TextField
//               fullWidth
//               type="date"
//               label="Date of Birth"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               inputRef={dateRef}
//             />
//             <TextField
//               fullWidth
//               label="Address"
//               variant="outlined"
//               inputRef={addressRef}
//             />
//             <TextField
//               fullWidth
//               label="Postal code"
//               variant="outlined"
//               inputRef={postalRef}
//             />
//             <TextField
//               fullWidth
//               label="City"
//               variant="outlined"
//               inputRef={cityRef}
//             />
//             <TextField
//               fullWidth
//               label="Telephone"
//               variant="outlined"
//               inputRef={telephoneRef}
//             />
//             <TextField
//               fullWidth
//               label="ID Number" // New TextField for ID number
//               variant="outlined"
//               inputRef={idNumberRef}
//             />
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <FormLabel component="legend" sx={{ marginRight: "1rem" }}>
//                 Gender
//               </FormLabel>
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   name="gender"
//                   value={gender}
//                   onChange={handleGenderChange}
//                   sx={{ flexDirection: "row" }}
//                 >
//                   <FormControlLabel
//                     value="M"
//                     control={<Radio />}
//                     label="Male"
//                   />
//                   <FormControlLabel
//                     value="F"
//                     control={<Radio />}
//                     label="Female"
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Box>
//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               type="email"
//               inputRef={emailRef}
//             />
//             <TextField
//               fullWidth
//               label="Username"
//               variant="outlined"
//               inputRef={usernameRef}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               variant="outlined"
//               inputRef={passwordRef}
//             />
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <FormLabel component="legend" sx={{ marginRight: "1rem" }}>
//                 Role
//               </FormLabel>
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   name="role"
//                   value={role}
//                   onChange={handleRoleChange}
//                   sx={{ flexDirection: "row" }}
//                 >
//                   <FormControlLabel
//                     value="ADMIN"
//                     control={<Radio />}
//                     label="Admin"
//                   />
//                   <FormControlLabel
//                     value="STAFF"
//                     control={<Radio />}
//                     label="Staff"
//                   />
//                   <FormControlLabel
//                     value="CLIENT"
//                     control={<Radio />}
//                     label="Client"
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Box>
//           </Box>
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default UserForm;
