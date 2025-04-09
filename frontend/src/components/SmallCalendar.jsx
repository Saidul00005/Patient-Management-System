import { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import axiosClient from "../axiosClient";
import { useTranslation } from "react-i18next";

const CalendarCheckbox = ({
  selectedClient,
  selectedDateCalendar,
  setSelectedDateCalendar,
}) => {
  const [isCheckEarlier, setIsCheckEarlier] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isCheckEarlier) handleCheckboxClick();
  }, [isCheckEarlier]);
  // Function to handle checkbox click (open the dialog)
  const handleCheckboxClick = () => {
    setOpenDialog(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDateCalendar(date);
    setOpenDialog(false); // Close dialog after selecting a date
  };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={isCheckEarlier}
            // onClick={handleCheckboxClick} // Open the dialog
            onChange={(e) => setIsCheckEarlier(e.target.checked)}
          />
        }
        label={t("Check for earlier")}
      />

      {/* MUI Dialog for Full-Year Calendar */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ textAlign: "center" }}>
          ({selectedDateCalendar.getFullYear()})
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            {Array.from({ length: 12 }, (_, monthIndex) => (
              <Grid item xs={12} sm={4} md={3} key={monthIndex}>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDateCalendar}
                  activeStartDate={
                    new Date(selectedDateCalendar.getFullYear(), monthIndex, 1)
                  }
                  style={{}}
                  view="month"
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </Dialog>
    </>
  );
};

export default CalendarCheckbox;
