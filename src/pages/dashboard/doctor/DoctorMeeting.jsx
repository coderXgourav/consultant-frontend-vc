import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Topbar from "../../../components/doctor/Topbar";
import DrSidebar from "../../../components/doctor/DrSidebar";

const socket = io("http://localhost:5555");

const DoctorMeeting = () => {
  const { roomId } = useParams();
  const localVideoRef = useRef(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const localStream = useRef(null);
  const peerConnections = useRef({});

  const servers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        localStream.current = stream;
        socket.emit("join-room", roomId);
      });

    socket.on("user-joined", handleUserJoined);
    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleICECandidate);
    socket.on("user-disconnected", handleUserDisconnected);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUserJoined = (userId) => {
    createPeerConnection(userId);
    const peerConnection = peerConnections.current[userId];
    localStream.current.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream.current);
    });

    peerConnection.createOffer().then((offer) => {
      peerConnection.setLocalDescription(offer);
      socket.emit("offer", { target: userId, offer });
    });
  };

  const handleOffer = (data) => {
    createPeerConnection(data.sender);
    const peerConnection = peerConnections.current[data.sender];
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
    peerConnection.createAnswer().then((answer) => {
      peerConnection.setLocalDescription(answer);
      socket.emit("answer", { target: data.sender, answer });
    });
  };

  const handleAnswer = (data) => {
    const peerConnection = peerConnections.current[data.sender];
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
  };

  const handleICECandidate = (data) => {
    const peerConnection = peerConnections.current[data.sender];
    peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
  };

  const handleUserDisconnected = (userId) => {
    delete peerConnections.current[userId];
    setRemoteStreams((prevStreams) => {
      const updatedStreams = { ...prevStreams };
      delete updatedStreams[userId];
      return updatedStreams;
    });
  };

  const createPeerConnection = (userId) => {
    if (peerConnections.current[userId]) return;
    const peerConnection = new RTCPeerConnection(servers);
    peerConnections.current[userId] = peerConnection;

    peerConnection.ontrack = (event) => {
      setRemoteStreams((prevStreams) => ({
        ...prevStreams,
        [userId]: event.streams[0],
      }));
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          target: userId,
          candidate: event.candidate,
        });
      }
    };
  };

  const joinMeeting = () => {
    alert("Joining meeting...");
    // Add additional logic if needed for meeting joining
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
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item text-primary">Doctors Dashboard</li>
            </ol>
          </div>

          <div style={{ padding: "20px" }}>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              Doctor Meeting (Room: {roomId})
            </p>

            <button
              onClick={joinMeeting}
              style={{
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

            <div style={{ marginBottom: "20px" }}>
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                style={{ width: "100%", maxHeight: "300px", borderRadius: "12px" }}
              ></video>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {Object.keys(remoteStreams).map((userId) => (
                <video
                  key={userId}
                  srcObject={remoteStreams[userId]}
                  autoPlay
                  playsInline
                  style={{ width: "100%", maxHeight: "300px", borderRadius: "12px" }}
                ></video>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorMeeting;
