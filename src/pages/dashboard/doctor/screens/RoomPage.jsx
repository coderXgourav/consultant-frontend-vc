
// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import ReactPlayer from "react-player";
// import { useSocket } from "../context/SocketProvider";
// import Topbar from "../../../../components/doctor/Topbar";
// import Sidebar from "../../../../components/doctor/DrSidebar";
// import { IconButton, Box } from "@mui/material";
// import { Mic, MicOff, Videocam, VideocamOff, ExitToApp, Fullscreen, FullscreenExit } from "@mui/icons-material";

// const RoomPage = () => {
//   const { roomId } = useParams();
//   const [myStream, setMyStream] = useState(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const socket = useSocket();
//   const videoContainerRef = useRef(null);

//   useEffect(() => {
//     socket.emit("join:room", { roomId });
//     const getMedia = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setMyStream(stream);
//     };
//     getMedia();
//   }, [socket, roomId]);

//   const handleMute = () => {
//     if (myStream) {
//       myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleVideoToggle = () => {
//     if (myStream) {
//       myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
//       setIsVideoOff(!isVideoOff);
//     }
//   };

//   const handleLeaveRoom = () => {
//     socket.emit("leave:room", { roomId });
//     window.location.href = "";
//   };

//   const handleFullScreenToggle = () => {
//     if (!isFullScreen) {
//       if (videoContainerRef.current.requestFullscreen) {
//         videoContainerRef.current.requestFullscreen();
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       }
//     }
//     setIsFullScreen(!isFullScreen);
//   };

//   return (
//     <Box className="page-wrapper">
//       <Topbar />
     
//       <Box className="main-container" display="flex">
//         <Sidebar />
        
//         <Box className="app-container" padding={3}>
        
//           {myStream && (
//            <>
//              <div className="app-hero-header d-flex align-items-center" style={{width:"180%"}}>
//              <ol className="breadcrumb">
//                <li className="breadcrumb-item">
//                  <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
//                  <a href="/">Home</a>
//                </li>
//                <li className="breadcrumb-item text-primary" aria-current="page">                 Meeting               </li>
//              </ol>
//            </div>
//             <Box
//               ref={videoContainerRef}
//               position="relative"
//               style={{ width: "120%", height: "100%", maxHeight: "90vh" }}
//             >
//               <ReactPlayer
//                 url={myStream}
//                 playing
//                 muted={isMuted}
//                 width="100%"
//                 height="100%"
//                 style={{ maxHeight: "100%", objectFit: "cover" }}
//                 onClick={(e) => e.stopPropagation()}
//               />
//               <Box
//                 position="absolute"
//                 bottom={30}
//                 left="50%"
//                 display="flex"
//                 gap={2}
//                 style={{
//                   transform: "translateX(-50%)",
//                   backgroundColor: "rgba(0, 0, 0, 0.6)",
//                   padding: "10px",
//                   borderRadius: "20px",
//                   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)"
//                 }}
//               >
//                 <IconButton
//                   onClick={handleMute}
//                   style={{
//                     backgroundColor: "rgba(255, 255, 255, 0.8)",
//                     borderRadius: "50%",
//                     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
//                   }}
//                 >
//                   {isMuted ? <MicOff style={{ color: "red" }} /> : <Mic style={{ color: "green" }} />}
//                 </IconButton>
//                 <IconButton
//                   onClick={handleVideoToggle}
//                   style={{
//                     backgroundColor: "rgba(255, 255, 255, 0.8)",
//                     borderRadius: "50%",
//                     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
//                   }}
//                 >
//                   {isVideoOff ? <VideocamOff style={{ color: "red" }} /> : <Videocam style={{ color: "green" }} />}
//                 </IconButton>
//                 <IconButton
//                   onClick={handleLeaveRoom}
//                   style={{
//                     backgroundColor: "rgba(255, 255, 255, 0.8)",
//                     borderRadius: "50%",
//                     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
//                   }}
//                 >
//                   <ExitToApp style={{ color: "black" }} />
//                 </IconButton>
//                 <IconButton
//                   onClick={handleFullScreenToggle}
//                   style={{
//                     backgroundColor: "rgba(255, 255, 255, 0.8)",
//                     borderRadius: "50%",
//                     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
//                   }}
//                 >
//                   {isFullScreen ? <FullscreenExit style={{ color: "black" }} /> : <Fullscreen style={{ color: "black" }} />}
//                 </IconButton>
//               </Box>
//             </Box>
//            </>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default RoomPage;


// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import ReactPlayer from "react-player";
// import { useSocket } from "../context/SocketProvider";
// import PeerService from "../service/peer"; // Adjust the import path as needed
// import Topbar from "../../../../components/doctor/Topbar";
// import Sidebar from "../../../../components/doctor/DrSidebar";
// import { IconButton, Box } from "@mui/material";
// import { Mic, MicOff, Videocam, VideocamOff, ExitToApp, Fullscreen, FullscreenExit } from "@mui/icons-material";

// const RoomPage = () => {
//   const { roomId } = useParams();
//   const [myStream, setMyStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null); // State for remote stream
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const socket = useSocket();
//   const videoContainerRef = useRef(null);

//   useEffect(() => {
//     const initWebRTC = async () => {
//       // Get local stream
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setMyStream(stream);

//       // Add local stream tracks to peer connection
//       stream.getTracks().forEach((track) => PeerService.peer.addTrack(track, stream));

//       // Handle remote stream
//       PeerService.peer.ontrack = (event) => {
//         setRemoteStream(event.streams[0]);
//       };

//       // Handle ICE candidates
//       PeerService.peer.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//         }
//       };

//       // Join room and create offer
//       socket.emit("join:room", { roomId, role: "doctor" });
//       const offer = await PeerService.getOffer();
//       socket.emit("offer", { roomId, offer });
//     };

//     initWebRTC();

//     // Handle incoming signaling data
//     socket.on("answer", async ({ answer }) => {
//       await PeerService.setLocalDescription(answer);
//     });

//     socket.on("ice-candidate", ({ candidate }) => {
//       PeerService.peer.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     return () => {
//       socket.off("answer");
//       socket.off("ice-candidate");
//       if (myStream) myStream.getTracks().forEach((track) => track.stop());
//       PeerService.peer.close();
//     };
//   }, [socket, roomId]);

//   const handleMute = () => {
//     if (myStream) {
//       myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleVideoToggle = () => {
//     if (myStream) {
//       myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
//       setIsVideoOff(!isVideoOff);
//     }
//   };

//   const handleLeaveRoom = () => {
//     socket.emit("leave:room", { roomId });
//     if (myStream) myStream.getTracks().forEach((track) => track.stop());
//     PeerService.peer.close();
//     window.location.href = "/doctor/dashboard"; // Fixed redirect path
//   };

//   const handleFullScreenToggle = () => {
//     if (!isFullScreen) {
//       if (videoContainerRef.current.requestFullscreen) {
//         videoContainerRef.current.requestFullscreen();
//       }
//     } else {
//       if (document.exitFullscreen) document.exitFullscreen();
//     }
//     setIsFullScreen(!isFullScreen);
//   };

//   return (
//     <Box className="page-wrapper">
//       <Topbar />
//       <Box className="main-container" display="flex">
//         <Sidebar />
//         <Box className="app-container" padding={3}>
//           <div className="app-hero-header d-flex align-items-center" style={{ width: "180%" }}>
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item">
//                 <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
//                 <a href="/">Home</a>
//               </li>
//               <li className="breadcrumb-item text-primary" aria-current="page">
//                 Meeting
//               </li>
//             </ol>
//           </div>
//           {remoteStream && (
//             <Box ref={videoContainerRef} position="relative" style={{ width: "120%", height: "100%", maxHeight: "90vh" }}>
//               <ReactPlayer
//                 url={remoteStream} // Display patient's stream
//                 playing
//                 muted={false}
//                 width="100%"
//                 height="100%"
//                 style={{ maxHeight: "100%", objectFit: "cover" }}
//               />
//               <Box
//                 position="absolute"
//                 bottom={30}
//                 left="50%"
//                 display="flex"
//                 gap={2}
//                 style={{
//                   transform: "translateX(-50%)",
//                   backgroundColor: "rgba(0, 0, 0, 0.6)",
//                   padding: "10px",
//                   borderRadius: "20px",
//                   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
//                 }}
//               >
//                 <IconButton onClick={handleMute} style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "50%" }}>
//                   {isMuted ? <MicOff style={{ color: "red" }} /> : <Mic style={{ color: "green" }} />}
//                 </IconButton>
//                 <IconButton onClick={handleVideoToggle} style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "50%" }}>
//                   {isVideoOff ? <VideocamOff style={{ color: "red" }} /> : <Videocam style={{ color: "green" }} />}
//                 </IconButton>
//                 <IconButton onClick={handleLeaveRoom} style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "50%" }}>
//                   <ExitToApp style={{ color: "black" }} />
//                 </IconButton>
//                 <IconButton onClick={handleFullScreenToggle} style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "50%" }}>
//                   {isFullScreen ? <FullscreenExit style={{ color: "black" }} /> : <Fullscreen style={{ color: "black" }} />}
//                 </IconButton>
//               </Box>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default RoomPage;


// RoomPage.jsx
// RoomPage.jsx
// RoomPage.jsx
// RoomPage.jsx
// RoomPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useSocket } from "../context/SocketProvider";
import PeerService from "../service/peer";
import Topbar from "../../../../components/doctor/Topbar";
import Sidebar from "../../../../components/doctor/DrSidebar";
import { IconButton, Box, Typography } from "@mui/material";
import { Mic, MicOff, Videocam, VideocamOff, ExitToApp, Fullscreen, FullscreenExit } from "@mui/icons-material";

const RoomPage = () => {
  const { roomId } = useParams();
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const socket = useSocket();
  const videoContainerRef = useRef(null);
  const peerServiceRef = useRef(null);

  useEffect(() => {
    peerServiceRef.current = new PeerService();

    const initWebRTC = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMyStream(stream);
        stream.getTracks().forEach((track) => {
          console.log("Doctor adding track:", track.kind);
          peerServiceRef.current.peer.addTrack(track, stream);
        });

        peerServiceRef.current.peer.ontrack = (event) => {
          console.log("Doctor received remote stream from patient");
          setRemoteStream(event.streams[0]);
        };

        peerServiceRef.current.peer.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("Doctor sending ICE candidate");
            socket.emit("ice-candidate", { roomId, candidate: event.candidate });
          }
        };

        socket.emit("join:room", { roomId, role: "doctor" });
      } catch (error) {
        console.error("Error initializing WebRTC for doctor:", error);
      }
    };

    initWebRTC();

    socket.on("room:joined", async ({ room }) => {
      if (room === roomId) {
        console.log("Patient joined, doctor sending offer");
        const offer = await peerServiceRef.current.getOffer();
        socket.emit("offer", { roomId, offer });
      }
    });

    socket.on("answer", async ({ answer }) => {
      console.log("Doctor received answer from patient");
      await peerServiceRef.current.setLocalDescription(answer);
    });

    socket.on("ice-candidate", ({ candidate }) => {
      console.log("Doctor received ICE candidate from patient");
      peerServiceRef.current.peer.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("user:left", () => {
      console.log("Patient left the room");
      setRemoteStream(null);
    });

    return () => {
      socket.off("room:joined");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user:left");
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
      if (peerServiceRef.current) {
        peerServiceRef.current.close();
      }
    };
  }, [socket, roomId]);

  const handleMute = () => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsMuted(!isMuted);
    }
  };

  const handleVideoToggle = () => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleLeaveRoom = () => {
    socket.emit("leave:room", { roomId });
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
      setMyStream(null);
    }
    if (peerServiceRef.current) {
      peerServiceRef.current.close();
    }
    window.location.href = "/doctor/dashboard";
  };

  const handleFullScreenToggle = () => {
    if (!isFullScreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Box className="page-wrapper">
      <Topbar />
      <Box className="main-container" display="flex">
        <Sidebar />
        <Box className="app-container" padding={3}>
          <div className="app-hero-header d-flex align-items-center" style={{ width: "180%" }}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item text-primary" aria-current="page">
                Meeting
              </li>
            </ol>
          </div>
          {remoteStream ? (
            <Box ref={videoContainerRef} position="relative" style={{ width: "120%", height: "100%", maxHeight: "90vh" }}>
              <ReactPlayer
                url={remoteStream}
                playing
                muted={false}
                width="100%"
                height="100%"
                style={{ maxHeight: "100%", objectFit: "cover" }}
              />
              <Box
                position="absolute"
                bottom={30}
                left="50%"
                display="flex"
                gap={2}
                style={{
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  padding: "10px",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <IconButton onClick={handleMute} style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "50%" }}>
                  {isMuted ? <MicOff style={{ color: "red" }} /> : <Mic style={{ color: "green" }} />}
                </IconButton>
                <IconButton onClick={handleVideoToggle} style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "50%" }}>
                  {isVideoOff ? <VideocamOff style={{ color: "red" }} /> : <Videocam style={{ color: "green" }} />}
                </IconButton>
                <IconButton onClick={handleLeaveRoom} style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "50%" }}>
                  <ExitToApp style={{ color: "black" }} />
                </IconButton>
                <IconButton onClick={handleFullScreenToggle} style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "50%" }}>
                  {isFullScreen ? <FullscreenExit style={{ color: "black" }} /> : <Fullscreen style={{ color: "black" }} />}
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Typography>Waiting for patient to join...</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RoomPage;