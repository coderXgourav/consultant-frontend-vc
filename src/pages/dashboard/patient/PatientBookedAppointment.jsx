import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../../components/patient/Topbar";
import Sidebar from "../../../components/patient/Sidebar";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grow,
  Slide,
  alpha,
  List,
  ListItem,
  ListItemText 
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { VideoCall, AccessTime, Event, PersonOutline, Note } from "@mui/icons-material";

const PatientBookedAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const navigate = useNavigate();
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [notesDialog, setNotesDialog] = useState(false);


  const handleOpenNotesDialog = (notes) => {
    setSelectedNotes(notes || []);
    setNotesDialog(true);
  };

  // Fetch all appointments for the patient
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
            const token= localStorage.getItem("patientToken");
             // Decode the token to get user info (e.g., user ID)
             const decodedToken = token && jwtDecode(token); // Decode the 
             const patientId = decodedToken?.user?._id;
             console.log("Decoded patient ID", decodedToken);
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/get-patient-appointment?patientId=${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("patientToken")}`,
            },
          }
        );
        
        if (response.data.success) {
          setAppointments(response.data.data);
        } else {
          setError("No appointments found.");
        }
      } catch (err) {
        setError("Failed to fetch appointments.");
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Handle meeting selection
  const handleSelectMeeting = (roomId) => {
    setSelectedMeeting(roomId);
    setConfirmDialog(true);
  };

  // Handle joining a meeting after confirmation
  const handleJoinMeeting = () => {
    navigate(`/patient/meeting/${selectedMeeting}`);
    setConfirmDialog(false);
  };

  // Animation variants for table rows
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Box className="page-wrapper">
      <Topbar />
      <Box className="main-container" display="flex">
        <Sidebar />

        <Fade in={true} timeout={800}>
          <Box className="app-container" sx={{ width: "100%", padding: "20px" }}>
            <Box
              className="app-hero-header"
              sx={{
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                color: "white",
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: "8px" }}>
                  My Appointments
                </Typography>
                <ol className="breadcrumb" style={{ margin: 0, padding: 0, listStyle: "none", display: "flex" }}>
                  <li className="breadcrumb-item" style={{ display: "flex", alignItems: "center" }}>
                    <i className="ri-home-8-line" style={{ marginRight: "8px" }} />
                    <a href="/patient/dashboard" style={{ color: "white", textDecoration: "none" }}>
                      Home
                    </a>
                    <span style={{ margin: "0 8px" }}>/</span>
                  </li>
                  <li className="breadcrumb-item" style={{ color: "white" }}>
                    My Appointments
                  </li>
                </ol>
              </Box>
            </Box>

            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="50vh"
                flexDirection="column"
              >
                <CircularProgress size={60} thickness={4} sx={{ color: "#2196F3" }} />
                <Typography variant="h6" sx={{ mt: 2, color: "#666" }}>
                  Loading appointments...
                </Typography>
              </Box>
            ) : error ? (
              <Grow in={true} timeout={1000}>
                <Box
                  sx={{
                    padding: "20px",
                    backgroundColor: alpha("#f44336", 0.1),
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body1" color="error" sx={{ fontWeight: "medium" }}>
                    {error}
                  </Typography>
                </Box>
              </Grow>
            ) : (
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
                          <PersonOutline sx={{ mr: 1, color: "#2196F3" }} />
                          Doctor Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
                          <Event sx={{ mr: 1, color: "#2196F3" }} />
                          Date
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
                          <AccessTime sx={{ mr: 1, color: "#2196F3" }} />
                          Time
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Meeting ID
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Action
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                         View Notes
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.map((appointment, index) => (
                      <motion.tr
                        key={appointment._id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={tableRowVariants}
                        component={motion.tr}
                        whileHover={{ backgroundColor: "#f0f7ff", scale: 1.005 }}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell>
                          <Typography>
                            {appointment.doctor
                              ? `Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`
                              : "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{appointment.date}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{appointment.time}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={appointment.status}
                            color={appointment.status === "confirmed" ? "success" 
                                 : appointment.status === "pending" ? "warning" 
                                 : "default"}
                            size="small"
                            sx={{ 
                              fontWeight: "medium",
                              padding: "4px 0",
                              transition: "all 0.3s ease",
                              "&:hover": { transform: "scale(1.05)" }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            component="a"
                            sx={{
                              color: "#1976d2",
                              textDecoration: "none",
                              "&:hover": { textDecoration: "underline" },
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <VideoCall sx={{ mr: 1, fontSize: 20 }} />
                            {appointment.room}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleSelectMeeting(appointment.room)}
                            startIcon={<VideoCall />}
                            sx={{
                              borderRadius: "20px",
                              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 14px rgba(33, 150, 243, 0.4)",
                              },
                            }}
                            disabled={appointment.status !== "confirmed"}
                          >
                            Join
                          </Button>
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={() => handleOpenNotesDialog(appointment.patient?.notes)}
                            startIcon={<Note />}
                            sx={{
                              borderRadius: "20px",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-2px)",
                              },
                            }}
                            disabled={!appointment.patient?.notes || appointment.patient.notes.length === 0}
                          >
                            View Notes
                          </Button>
                        </TableCell>

                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Fade>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
        keepMounted
        onClose={() => setConfirmDialog(false)}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            borderRadius: "12px",
            padding: "10px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1976d2" }}>
          Ready to Join the Meeting?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You're about to enter a video consultation with your doctor. Please ensure you're in a
            private environment with proper lighting and a stable internet connection for the best experience.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button 
            onClick={() => setConfirmDialog(false)} 
            color="inherit"
            sx={{ 
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "&:hover": { backgroundColor: "#f5f5f5" }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleJoinMeeting} 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 14px rgba(33, 150, 243, 0.4)",
              },
            }}
          >
            Join Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notes Dialog */}
      <Dialog
        open={notesDialog}
        onClose={() => setNotesDialog(false)}
        PaperProps={{
          style: {
            borderRadius: "12px",
            padding: "10px",
            maxWidth: "600px",
          },
        }}
      >
        <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1976d2" }}>
          Doctor's Notes
        </DialogTitle>
        <DialogContent>
          {selectedNotes.length > 0 ? (
            <List>
              {selectedNotes.map((note, index) => (
                <ListItem key={note._id} divider>
                  <ListItemText
                    primary={note.content}
                    secondary={`Added on: ${new Date(note.date).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No notes available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setNotesDialog(false)}
            color="inherit"
            sx={{
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientBookedAppointment;