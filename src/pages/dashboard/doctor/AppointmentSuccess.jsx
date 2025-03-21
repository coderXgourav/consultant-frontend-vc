import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/patient/Sidebar";
import Topbar from "../../../components/patient/Topbar";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Divider
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoCallIcon from "@mui/icons-material/VideoCall";

const AppointmentSuccess = () => {
  const navigate = useNavigate();
  
  // You would typically get this from your context, state or URL params
  const appointmentDetails = {
    doctorName: "Dr. Sarah Johnson",
    date: "March 15, 2025",
    time: "10:30 AM",
    type: "Video Consultation",
    appointmentId: "APT-20250315-0023"
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.6
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: { 
      repeat: Infinity,
      repeatType: "reverse",
      duration: 2
    }
  };

  useEffect(() => {
    // Optional: track successful appointment booking analytics
    // analyticsService.trackEvent('appointment_booked_success');
    
    // You could also save appointment details to local storage here if needed
  }, []);

  // Handler for dashboard navigation
  const handleDashboardClick = () => {
    window.location.href = "https://doctors-portal-sand.vercel.app";
    // navigate("https://doctors-portal-sand.vercel.app");
  };

  return (
    <>
    
      <div className="page-wrapper">
                <Topbar />
                <div className="main-container">
                  <Sidebar />
                  <div className="app-container">
                    <div className="app-hero-header d-flex align-items-center">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <i className="ri-home-8-line lh-1 pe-3 me-3 border-end"></i>
                          <a href="/">Home</a>
                        </li>
                        <li className="breadcrumb-item text-primary" aria-current="page">
                          Edit Doctor Profile
                        </li>
                      </ol>
                      <div className="ms-auto d-lg-flex d-none flex-row">
                        <div className="d-flex flex-row gap-1 day-sorting">
                          <button className="btn btn-sm btn-primary">Today</button>
                          <button className="btn btn-sm">7d</button>
                          <button className="btn btn-sm">2w</button>
                          <button className="btn btn-sm">1m</button>
                          <button className="btn btn-sm">3m</button>
                          <button className="btn btn-sm">6m</button>
                          <button className="btn btn-sm">1y</button>
                        </div>
                      </div>
                    </div>
                    <div className="app-body">
                    <Container maxWidth="md" sx={{ py: 1 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Paper 
          elevation={3}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(0, 0, 0, 0.08)"
          }}
        >
          {/* Success Header */}
          <Box 
            sx={{ 
              bgcolor: "success.main",
              color: "white",
              py: -2,
              px: 3,
              textAlign: "center",
              zoom:.9,
              p:3
            }}
          >
            <motion.div
              variants={itemVariants}
              animate={pulseAnimation}
            >
              <CheckCircleIcon sx={{ fontSize: 80, mb: 2 }} />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Appointment Booked Successfully!
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography variant="subtitle1">
                Your appointment has been confirmed and added to your schedule.
              </Typography>
            </motion.div>
          </Box>
          
          {/* Appointment Details */}
          <Box sx={{ p: 4 }}>
            <motion.div variants={itemVariants}>
              <Typography variant="h6" gutterBottom sx={{ color: "text.secondary", mb: 3 }}>
                Appointment Details
              </Typography>
            </motion.div>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: -4 }}>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 2,
                    p: 2,
                    bgcolor: "rgba(0, 0, 0, 0.02)",
                    borderRadius: "8px"
                  }}
                >
                  <PersonIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Doctor</Typography>
                    <Typography variant="body1" fontWeight="medium">{appointmentDetails.doctorName}</Typography>
                  </Box>
                </Box>
              </motion.div>
              
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 2,
                    p: 2,
                    bgcolor: "rgba(0, 0, 0, 0.02)",
                    borderRadius: "8px"
                  }}
                >
                  <CalendarMonthIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Date</Typography>
                    <Typography variant="body1" fontWeight="medium">{appointmentDetails.date}</Typography>
                  </Box>
                </Box>
              </motion.div>
              
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 2,
                    p: 2,
                    bgcolor: "rgba(0, 0, 0, 0.02)",
                    borderRadius: "8px"
                  }}
                >
                  <AccessTimeIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Time</Typography>
                    <Typography variant="body1" fontWeight="medium">{appointmentDetails.time}</Typography>
                  </Box>
                </Box>
              </motion.div>
              
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 2,
                    p: 2,
                    bgcolor: "rgba(0, 0, 0, 0.02)",
                    borderRadius: "8px"
                  }}
                >
                  <VideoCallIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Type</Typography>
                    <Typography variant="body1" fontWeight="medium">{appointmentDetails.type}</Typography>
                  </Box>
                </Box>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Box 
                  sx={{ 
                    mt: 1,
                    p: 2,
                    borderRadius: "8px",
                    border: "1px dashed",
                    borderColor: "primary.main",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Appointment ID: <Typography component="span" fontWeight="bold" color="primary.main">{appointmentDetails.appointmentId}</Typography>
                  </Typography>
                </Box>
              </motion.div>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            {/* Next Steps */}
            <motion.div variants={itemVariants}>
              <Typography variant="body1" sx={{ mb: 3 }}>
                You will receive an email with all the details and reminders before your appointment.
              </Typography>
            </motion.div>
            
            {/* Button Row */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2,gap: 2 }}>
                {/* <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<DashboardIcon />}
                  onClick={handleDashboardClick}
                  sx={{
                    borderRadius: "28px",
                    px: 4,
                    py: 1.5,
                    boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 12px 20px rgba(25, 118, 210, 0.4)",
                    }
                  }}
                >
                  Go to Dashboard
                </Button> */}

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
               
                  onClick={handleDashboardClick}
                  sx={{
                    borderRadius: "28px",
                    px: 2,
                    py: 1.5,
                    boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 12px 20px rgba(25, 118, 210, 0.4)",
                    }
                  }}
                >
                  Fill Up Form
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Paper>
        
        {/* Additional Tips */}
        <motion.div 
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Paper 
            elevation={1}
            sx={{ 
              p: 3, 
              mt: 3, 
              borderRadius: "12px",
              border: "1px solid rgba(0, 0, 0, 0.05)"
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Appointment Tips:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Be ready 5 minutes before your scheduled time<br />
              • Ensure you have a stable internet connection for the video consultation<br />
              • Prepare any questions you want to ask the doctor<br />
              • Have your medical history or relevant documents ready
            </Typography>
          </Paper>
        </motion.div>
      </motion.div>
    </Container>
                    </div>
                  </div>
                </div>
              </div>
    </>

    
  );
};

export default AppointmentSuccess;