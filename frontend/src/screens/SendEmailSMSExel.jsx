import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import axiosClient from "../axiosClient";
import * as XLSX from "xlsx";
import {
  Box,
  Button,
  CardContent,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Card, Paper, TableBody } from "@mui/material";

function SendEmailSMS() {
  const [message, setMessage] = useState("Loading Excel data...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    displayData(); // Automatically display data when the component loads
  }, []);

  const downloadExcel = () => {
    setLoading(true);
    setMessage("Downloading file...");

    axiosClient
      .get("api/excel_document_of_email_sms/", { responseType: "blob" })
      .then((response) => {
        const file = new Blob([response.data]);

        // Trigger file download
        const url = window.URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "email_sms.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up after download

        setLoading(false);
        setMessage("File downloaded successfully!");
      })
      .catch((err) => {
        setError("Failed to download file.");
        setLoading(false);
      });
  };

  const displayData = () => {
    setLoading(true);
    setMessage("Loading data...");

    axiosClient
      .get("api/excel_document_of_email_sms/", { responseType: "blob" })
      .then((response) => {
        const file = new Blob([response.data]);
        const reader = new FileReader();

        // Read the file for displaying its contents
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          // Parse data from the first sheet
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          setExcelData(jsonData); // Store parsed data
          setLoading(false);
          setMessage("Data loaded successfully!");
        };

        reader.onerror = () => {
          setError("Error reading the Excel file.");
          setLoading(false);
        };

        reader.readAsArrayBuffer(file); // Trigger reading of the file
      })
      .catch((err) => {
        setError("Failed to load data.");
        setLoading(false);
      });
  };

  return (
    <>
      <Typography variant="h6" align="center">
        {message}
      </Typography>
      {loading && <CircularProgress />}
      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}

      {!loading && (
        <Button
          variant="contained"
          color="primary"
          onClick={downloadExcel}
          style={{ marginBottom: "10px" }}
        >
          Download Excel File
        </Button>
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        marginTop="16"
      >
        <Card elevation={16}>
          <CardContent>
            {!loading && !error && excelData.length > 0 && (
              <TableContainer component={Paper} style={{ maxHeight: 800 }}>
                <h3>Excel Data:</h3>
                <Table>
                  <TableHead>
                    <TableRow>
                      {excelData.length > 0 &&
                        Object.keys(excelData[0]).map((key) => (
                          <TableCell key={key}>{key}</TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {excelData.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((val, i) => (
                          <TableCell key={i}>{val}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default SendEmailSMS;


