import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../../components/doctor/Topbar";
import DrSidebar from "../../../components/doctor/DrSidebar";

const PatientList = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createMeeting = () => {
    const newRoomId = `room-${Date.now()}`;
    setRoomId(newRoomId);
  };

  const joinMeeting = () => {
    if (roomId) {
      navigate(`/doctor/meeting/${roomId}`);
    }
  };

  return (

    <div className="page-wrapper">
        <Topbar />
        <div className="main-container">
          <DrSidebar />
          <div className="app-container">
            <div className="app-hero-header d-flex align-items-center">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
                  <a href="index-2.html">Home</a>
                </li>
                <li className="breadcrumb-item text-primary">Doctors Dashboard</li>
              </ol>
            </div>

            <div style={{ padding: "20px",display: "flex",justifyContent: "center", alignItems: "center",flexDirection: "column" }}>
      <p style={{ fontSize: "20px", marginBottom: "20px" ,marginTop:"8rem"}}></p>
      <button
        onClick={createMeeting}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Create New Meeting
      </button>
      {roomId && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontSize: "18px" }}>
            Meeting Link: <span style={{ fontWeight: "bold" }}>{window.location.origin}/doctor/meeting/{roomId}</span>
          </p>
          <button
            onClick={joinMeeting}
            style={{
              marginLeft:"15rem",
              marginTop:"20px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#2196F3",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Join Meeting
          </button>
        </div>
      )}
    </div>

            </div>
            </div>
            </div>

    
  );
};

export default PatientList;
