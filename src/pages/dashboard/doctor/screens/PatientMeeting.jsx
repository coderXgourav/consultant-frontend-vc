

// PatientMeeting.jsx
// PatientMeeting.jsx
import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../../../../components/patient/Topbar";
import Sidebar from "../../../../components/patient/Sidebar";
import { Box, Button, Typography } from "@mui/material";

const PatientMeeting = () => {
  const { roomId } = useParams();
  const [isAccepted, setIsAccepted] = useState(false);
  const socket = useSocket();
  const navigate = useNavigate();

  const handleAcceptMeeting = () => {
    setIsAccepted(true);
    socket.emit("join:room", { roomId, role: "patient" });
    navigate(`/patients/meeting/${roomId}`);
  };

  return (
    <Box className="page-wrapper">
      <Topbar />
      <Box className="main-container" display="flex">
        <Sidebar />
        <Box className="app-container" padding={3} sx={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="body1">You have been invited to a meeting by the doctor.</Typography>
          {isAccepted ? (
            <Typography variant="body2">You are now in the meeting room.</Typography>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAcceptMeeting} style={{ marginTop: "1rem" }}>
              Accept Meeting
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PatientMeeting;