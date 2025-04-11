"use client"
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  Button,
  Stack,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import DownloadIcon from "@mui/icons-material/Download"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { useStateContext } from "../context/ContextProvider" 
import { useTranslation } from "react-i18next";

const GDPRPolicy = ({ onAgree, isModal = false, isSubmitting = false }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { user } = useStateContext() 
  const { t } = useTranslation();

  // Function to handle PDF download of the existing file
  const handleDownloadPDF = () => {
    // Create a link to the PDF file in the public folder
    const link = document.createElement("a")
    link.href = "/gdpr-policy.pdf" // Path to your PDF file in the public folder
    link.download = "General Data Protection Regulation.pdf" // Name for the downloaded file
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // The agreement button is just UI - user will implement functionality
  const handleAgree = () => {
    // User will implement this functionality
    console.log("User agreed to GDPR Policy")
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
          General Data Protection Regulation (GDPR) Privacy Policy
        </Typography>

        {/* Section 1: Introduction */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            1. Introduction
          </Typography>
          <Typography paragraph>
            At AAAAAA ("we," "our," or "us"), we recognize the importance of protecting your personal data. This Privacy
            Policy outlines how we collect, use, store, and protect your personal data when you use our software,
            Appointment System. We are committed to complying with the General Data Protection Regulation (GDPR)
            (Regulation (EU) 2016/679) and ensuring that your privacy rights are respected and safeguarded.
          </Typography>
          <Typography paragraph>
            The Appointment System is designed to facilitate the arrangement of medical appointments between patients
            and doctors. We take all necessary measures to ensure that personal data is handled in a secure and lawful
            manner. This Privacy Policy details how we collect and process personal data to provide our services, as
            well as your rights under the GDPR.
          </Typography>
        </Box>

        {/* Section 2: Personal Data We Collect */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            2. Personal Data We Collect
          </Typography>
          <Typography paragraph>
            We collect personal data that is necessary to deliver our appointment scheduling services. The following
            types of personal data may be collected and processed:
          </Typography>

          <Box sx={{ ml: 2, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Required Personal Data:
            </Typography>
            <List dense disablePadding>
              <ListItem>
                <ListItemText primary="• Name" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Surname" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Email Address" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Phone Number" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Gender" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Date of Birth (Age)" />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ ml: 2, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Optional Data Removed (Not Collected Anymore):
            </Typography>
            <List dense disablePadding>
              <ListItem>
                <ListItemText primary="• Address" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Postal Code" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• City" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• ID Number" />
              </ListItem>
            </List>
          </Box>

          <Typography paragraph>
            This data is primarily provided by the doctor or the doctor's secretary, and is used exclusively for
            managing appointments, notifications, and providing analytics. We do not collect sensitive personal health
            data such as medical history, insurance details, or diagnoses.
          </Typography>
        </Box>

        {/* Section 3: Purpose of Data Collection */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            3. Purpose of Data Collection
          </Typography>
          <Typography paragraph>
            The primary purpose of collecting personal data is to provide our appointment management services and to
            communicate with patients and doctors effectively. We process personal data for the following reasons:
          </Typography>

          <Box sx={{ ml: 2, mb: 2 }}>
            <Typography paragraph>
              <strong>• Appointment Scheduling:</strong> The software enables doctors and patients to schedule, manage,
              and confirm appointments.
            </Typography>
            <Typography paragraph>
              <strong>• Notification Services:</strong> We use email and phone numbers to send appointment
              confirmations, reminders, and other notifications relevant to patients' appointments.
            </Typography>
            <Typography paragraph>
              <strong>• Data Analytics:</strong> We analyze the collected data (age and gender) to help doctors and the
              system administrators gain insights into usage patterns and improve the system.
            </Typography>
          </Box>

          <Typography paragraph>
            We do not use personal data for marketing, advertising, or any other purposes outside of the primary
            services provided by the software.
          </Typography>
        </Box>

        {/* Section 4: Data Storage and Security Measures */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            4. Data Storage and Security Measures
          </Typography>
          <Typography paragraph>
            We take data security seriously and use industry-standard security measures to protect personal data. The
            data we collect is securely stored on cloud-based servers that are located in Europe.
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
            Hosting Providers and Locations:
          </Typography>
          <List dense disablePadding sx={{ ml: 2 }}>
            <ListItem>
              <ListItemText primary="• Contabo VPS (Europe)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Velia (France, EU)" />
            </ListItem>
          </List>

          <Typography paragraph sx={{ mt: 2 }}>
            These hosting providers ensure that all data remains in the EU, complying with GDPR regulations. We also
            ensure that all third-party service providers comply with GDPR and that your personal data is treated with
            the highest level of security.
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
            How Data is Stored:
          </Typography>
          <List dense disablePadding sx={{ ml: 2 }}>
            <ListItem>
              <ListItemText primary="• All personal data is stored on a cloud-based server." />
            </ListItem>
            <ListItem>
              <ListItemText primary="• The data is entered into the system by the doctor or the doctor's secretary." />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Patients cannot directly input or modify their own data within the software." />
            </ListItem>
          </List>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
            Data Protection Measures:
          </Typography>
          <List dense disablePadding sx={{ ml: 2 }}>
            <ListItem>
              <ListItemText
                primary="• Encryption:"
                secondary="All data stored in our system, including databases and hard drives, is encrypted to prevent unauthorized access."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Access Control:"
                secondary="Only authorized personnel can access the server, and the server itself is only accessible from our office for maintenance purposes."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• SSL Encryption:"
                secondary="We use Secure Socket Layer (SSL) encryption for all data transmissions, ensuring that data is securely transmitted between the user and the server."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Authentication:"
                secondary="We require users (doctors and secretaries) to log in with username and password credentials to access the system."
              />
            </ListItem>
          </List>
        </Box>

        {/* Section 5: Sharing Personal Data with Third Parties */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            5. Sharing Personal Data with Third Parties
          </Typography>
          <Typography paragraph>
            We do not sell or share personal data with third parties for marketing purposes. However, we do share
            personal data with certain trusted third-party service providers in order to operate the software and
            provide essential services. These include:
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Third-Party Provider</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Purpose of Data Sharing</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Location</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Velia.net Internetdienste GmbH</TableCell>
                  <TableCell>Cloud Hosting Services</TableCell>
                  <TableCell>Germany</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contabo GmbH</TableCell>
                  <TableCell>Cloud Hosting Services</TableCell>
                  <TableCell>Germany</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cytacom Solutions Ltd</TableCell>
                  <TableCell>SMS Notification Service</TableCell>
                  <TableCell>Cyprus</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Databasemart LLC</TableCell>
                  <TableCell>Email Notification Service</TableCell>
                  <TableCell>USA</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography paragraph>
            We ensure that all third-party providers comply with GDPR and that any data shared with them is handled
            securely and lawfully. All third-party providers are contractually obligated to maintain the confidentiality
            of your data.
          </Typography>
        </Box>

        {/* Section 6: User Rights Under GDPR */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            6. User Rights Under GDPR
          </Typography>
          <Typography paragraph>
            As a user, you have various rights regarding your personal data under the GDPR. These rights include:
          </Typography>

          <List dense sx={{ ml: 2 }}>
            <ListItem>
              <ListItemText
                primary="1. Right to Access:"
                secondary="You have the right to request access to your personal data that we hold."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="2. Right to Rectification:"
                secondary="You can request correction of any inaccurate or incomplete data we have about you."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="3. Right to Erasure (Right to be Forgotten):"
                secondary="You can request that we delete your personal data under certain conditions."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="4. Right to Restriction of Processing:"
                secondary="You can ask us to restrict the processing of your data in certain situations."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="5. Right to Data Portability:"
                secondary="You can request a copy of your personal data in a structured, commonly used format, which you can transfer to another service."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="6. Right to Object:"
                secondary="You can object to our processing of your personal data for certain purposes, including data processing that is based on legitimate interests or is for direct marketing purposes."
              />
            </ListItem>
          </List>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
            Exercising Your Rights:
          </Typography>
          <List dense disablePadding sx={{ ml: 2 }}>
            <ListItem>
              <ListItemText primary="• Currently, patients cannot directly modify or delete their personal data through the software." />
            </ListItem>
            <ListItem>
              <ListItemText primary="• If you wish to exercise your rights (e.g., access, rectification, or deletion of your data), please contact us at [Insert Contact Information]. We will respond to your request within the timeframe specified by the GDPR." />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Additionally, we offer a GDPR Report feature within the software, allowing doctors or their secretaries to generate a PDF report detailing the data stored about a patient. This report can be provided to patients upon their request." />
            </ListItem>
          </List>
        </Box>

        {/* Section 7: Data Retention */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            7. Data Retention
          </Typography>
          <Typography paragraph>
            We retain personal data as long as it is necessary to provide our services and comply with legal
            obligations.
          </Typography>

          <List dense disablePadding sx={{ ml: 2 }}>
            <ListItem>
              <ListItemText
                primary="• Data Retention Period:"
                secondary="We do not currently have an automatic system in place for deleting or anonymizing data. The data is kept until the patient no longer requires appointments with the doctor."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Patient Data:"
                secondary="If patients request the deletion of their data, we will comply within the limits of applicable law."
              />
            </ListItem>
          </List>

          <Typography paragraph sx={{ mt: 2 }}>
            We are reviewing our data retention policy to ensure compliance with GDPR guidelines and to implement
            automatic data deletion or anonymization procedures where necessary.
          </Typography>
        </Box>

        {/* Section 8: Legal Basis for Data Processing */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            8. Legal Basis for Data Processing
          </Typography>
          <Typography paragraph>
            Under the GDPR, we must have a legal basis to collect and process your personal data. Currently, the data is
            entered into the software by the doctor or the doctor's secretary, and we are assessing the most appropriate
            legal basis for processing this data. Possible legal bases include:
          </Typography>

          <List dense disablePadding sx={{ ml: 2 }}>
            <ListItem>
              <ListItemText
                primary="• User Consent:"
                secondary="If we require consent to collect data, we will implement a consent mechanism within the software."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Contractual Necessity:"
                secondary="The processing of personal data may be necessary to provide the appointment scheduling services that the patient has requested."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Legal Obligation:"
                secondary="We may be required to process certain data to comply with legal obligations related to healthcare."
              />
            </ListItem>
          </List>

          <Typography paragraph sx={{ mt: 2 }}>
            We are evaluating the need for written consent from patients for data processing and will implement such
            consent mechanisms in the future if necessary.
          </Typography>
        </Box>

        {/* Section 9: Cookies and Tracking Technologies */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            9. Cookies and Tracking Technologies
          </Typography>
          <Typography paragraph>
            The Appointment System does not use cookies or any tracking technologies for user behavior analysis or
            advertising purposes. The software is operated on a subscription model for doctors, and we do not track or
            monitor users' activities beyond the appointment scheduling functionality.
          </Typography>
        </Box>

        {/* Section 10: Data Transfers Outside the EU */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            10. Data Transfers Outside the EU
          </Typography>
          <Typography paragraph>
            We ensure that all personal data is stored within the European Union (EU). However, some of our third-party
            providers, such as Databasemart LLC (USA), may process personal data outside the EU. We ensure that all
            third-party service providers comply with GDPR requirements by using appropriate safeguards, such as:
          </Typography>

          <List dense disablePadding sx={{ ml: 2 }}>
            <ListItem>
              <ListItemText
                primary="• Standard Contractual Clauses (SCCs):"
                secondary="We enter into contracts with our service providers to ensure that they comply with GDPR requirements for data transfers outside the EU."
              />
            </ListItem>
          </List>
        </Box>

        {/* Section 11: GDPR Report Feature */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            11. GDPR Report Feature
          </Typography>
          <Typography paragraph>
            As part of our commitment to GDPR compliance and transparency, we have implemented a GDPR Report feature
            within the Appointment System. This feature enables doctors or their secretaries to generate a detailed PDF
            report containing the personal data that is stored for each patient. This report can be provided to the
            patient upon request, ensuring that patients can access and review the data we hold about them.
          </Typography>
        </Box>

        {/* Section 12: Contact Information */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            12. Contact Information
          </Typography>
          <Typography paragraph>
            For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact
            us at:
          </Typography>

          <Box sx={{ ml: 2 }}>
            <Typography paragraph>
              AAAAAA
              <br />
              BBBBBB
              <br />
              Email: CCC@gmail.com
              <br />
              Phone: +357912121212
            </Typography>
          </Box>
        </Box>

        {/* Page indicator */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          GDPR Privacy Policy | Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        {/* Add the buttons at the bottom of the paper */}
        <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ mt: 4 }} justifyContent="center">
        {!isModal && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadPDF}
            sx={{ minWidth: 200 }}
          >
            {t('Download PDF')}
          </Button>
        )}
        {user?.user_role === "CLIENT" && !user?.gdpr_accepted && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<CheckCircleOutlineIcon />}
            onClick={isModal ? onAgree : handleAgree}
            disabled={isSubmitting}
            sx={{ minWidth: 200 }}
          >
           {isSubmitting ? t('Submitting...') : t('I Agree with GDPR Policy')}
          </Button>
        )}
        
        {user?.user_role === "CLIENT" && user?.gdpr_accepted && (
          <Button variant="contained" color="success" disabled sx={{ minWidth: 200 }}>
            {t('GDPR Accepted')}
          </Button>
        )}
        </Stack>
      </Paper>
    </Container>
  )
}

export default GDPRPolicy
