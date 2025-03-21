import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import Topbar from "../../../../components/doctor/Topbar";
import DrSidebar from "../../../../components/doctor/DrSidebar";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      // Redirect doctor to their meeting link and patient to theirs
      navigate(`/doctor/meeting/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="page-wrapper">
      <Topbar />
      <div className="main-container">
        <DrSidebar />
        <div className="app-container">
          <div>
            <form onSubmit={handleSubmitForm}>
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="room">Room Number</label>
              <input
                type="text"
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <br />
              <button>Join</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
