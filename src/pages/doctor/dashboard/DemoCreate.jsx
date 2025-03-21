import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/doctor/DrSidebar";
import Topbar from "../../../components/doctor/Topbar";
import Peer from "peerjs"; // Assuming PeerJS is installed

const DemoCreate = () => {
  const [notification, setNotification] = useState("");
  const [roomId, setRoomId] = useState("");

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const roomInputRef = useRef(null);

  const PRE = "PRIVATE";
  const SUF = "MEET";
  let local_stream;

  // Hide video initially
  useEffect(() => {
    if (remoteVideoRef.current && localVideoRef.current) {
      remoteVideoRef.current.hidden = true;
      localVideoRef.current.hidden = true;
    }
  }, []);

  const createRoom = () => {
    let room = roomInputRef.current.value;
    if (room === "" || room === " ") {
      alert("Enter Room Number");
      return;
    }
    let room_id = PRE + room + SUF;
    setRoomId(room_id);
    let peer = new Peer(room_id);

    peer.on("open", (id) => {
      notify("Someone Connected with ID: ", id);
      hideModal();
      getUserMedia({ video: true, audio: true });
      notify("Waiting for person to join.");
    });

    peer.on("call", (call) => {
      call.answer(local_stream);
      call.on("stream", (stream) => {
        setRemoteStream(stream);
      });
    });
  };

  const setLocalStream = (stream) => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.muted = true;
      localVideoRef.current.play();
    }
  };

  const setRemoteStream = (stream) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.play();
    }
  };

  const hideModal = () => {
    setNotification(""); // Clear notification
    if (remoteVideoRef.current && localVideoRef.current) {
      remoteVideoRef.current.hidden = false;
      localVideoRef.current.hidden = false;
    }
  };

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(""); // Hide notification after 3 seconds
    }, 3000);
  };

  const joinRoom = () => {
    let room = roomInputRef.current.value;
    if (room === "" || room === " ") {
      alert("Enter Room Number");
      return;
    }
    let room_id = PRE + room + SUF;
    setRoomId(room_id);
    hideModal();
    let peer = new Peer();

    peer.on("open", (id) => {
      notify("Connected with Id: " + id);
      getUserMedia({
        video: true,
        audio: true,
        echoCancellation: true,
        noiseSupression: true,
      });
    });
  };

  const getUserMedia = (constraints) => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        local_stream = stream;
        setLocalStream(local_stream);
        if (roomId) {
          let peer = new Peer(roomId);
          peer.on("call", (call) => {
            call.answer(local_stream);
            call.on("stream", (stream) => {
              setRemoteStream(stream);
            });
          });
        }
      })
      .catch((err) => {
        notify(err);
      });
  };

  return (
    <>
      <div className="page-wrapper">
        {/* TOPBAR */}
        <Topbar />
        {/* Main container starts */}
        <div className="main-container">
          {/* Sidebar wrapper starts */}
          {/* SIDE BAR */}
          <Sidebar />

          <div>
            {" "}
            <br />
            {notification && <p id="notification">{notification}</p>}
            <div
              className="entry-modal"
              id="entry-modal"
              style={{ width: "50%", margin: "auto" }}
            >
              <p>Create or Join Meeting</p>
              <input
                className="form-control"
                ref={roomInputRef}
                spellCheck="false"
                autoFocus
                type="text"
                placeholder="Enter Room ID"
                required
              />
              <div className="d-grid gap-2 mt-3">
                <button onClick={createRoom} className="btn btn-warning">
                  Create Room
                </button>
                <button onClick={joinRoom} className="btn btn-outline-primary">
                  Join Room
                </button>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <video ref={remoteVideoRef} id="remote-video" autoPlay loop />
                </div>
                <div className="col-sm">
                  <video ref={localVideoRef} id="local-video" autoPlay loop />
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar wrapper ends */}
        </div>
        {/* Main container ends */}
      </div>
      {/* Page wrapper ends */}
    </>
  );
};

export default DemoCreate;
