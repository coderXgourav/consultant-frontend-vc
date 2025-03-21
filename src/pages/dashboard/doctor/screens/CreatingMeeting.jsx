// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "../context/SocketProvider"; 
// import Topbar from "../../../../components/doctor/Topbar";
// import DrSidebar from "../../../../components/doctor/DrSidebar";

// const CreateMeeting = () => {
//   const [roomId, setRoomId] = useState(""); 
//   const [meetingLink, setMeetingLink] = useState(""); // Store the meeting link
//   const socket = useSocket();
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false); // Control modal visibility

//   console.log("meeting",meetingLink)
  

//   const handleCreateRoom = async () => {
//     const room = "room_" + Math.random().toString(36).substr(2, 9); 
//     setRoomId(room);
//     socket.emit("room:create", { room });

//     const link = `${window.location.origin}/patient/meeting/${room}`;
//     setMeetingLink(link); // Set the generated meeting link
//     setShowModal(true); // Show the modal
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(meetingLink); // Copy the link to the clipboard
//     navigate(`/doctor/meeting/${roomId}`);
//     // alert("Meeting link copied to clipboard!");

//   };

//   return (
//     <div className="page-wrapper">
//       <Topbar />
//       <div className="main-container">
//         <DrSidebar />
//         <div className="app-container">
//           <div className="app-hero-header d-flex align-items-center">
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item">
//                 <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
//                 <a href="index-2.html">Home</a>
//               </li>
//               <li className="breadcrumb-item text-primary">Doctors Dashboard</li>
//             </ol>
//           </div>

//           <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "80vh" }}>
//             <button
//               style={{ padding: "10px", backgroundColor: "#116af0", color: "white", borderRadius: "5px", border: "none" }}
//               onClick={handleCreateRoom}
//             >
//               Create Meeting Link
//             </button>
//           </div>

//           {/* Modal for displaying the meeting link */}
//           {showModal && (
//             <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
//               <div className="modal-dialog">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title">Meeting Created</h5>
//                     <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//                   </div>
//                   <div className="modal-body">
//                     <p>Share this link with the patient:</p>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={meetingLink}
//                       readOnly
//                       style={{ marginBottom: "10px" }}
//                     />
//                   </div>
//                   <div className="modal-footer">
//                     <button className="btn btn-primary" onClick={handleCopyLink}>
//                       Copy Link
//                     </button>
//                     <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateMeeting;

// CreateMeeting.jsx (unchanged)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import Topbar from "../../../../components/doctor/Topbar";
import DrSidebar from "../../../../components/doctor/DrSidebar";

const CreateMeeting = () => {
  const [roomId, setRoomId] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCreateRoom = async () => {
    const room = "room_" + Math.random().toString(36).substr(2, 9);
    setRoomId(room);
    socket.emit("room:create", { room });
    const link = `${window.location.origin}/patient/meeting/${room}`;
    setMeetingLink(link);
    setShowModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    navigate(`/doctor/meeting/${roomId}`);
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <button
              style={{
                padding: "10px",
                backgroundColor: "#116af0",
                color: "white",
                borderRadius: "5px",
                border: "none",
              }}
              onClick={handleCreateRoom}
            >
              Create Meeting Link
            </button>
          </div>
          {showModal && (
            <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Meeting Created</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>Share this link with the patient:</p>
                    <input
                      type="text"
                      className="form-control"
                      value={meetingLink}
                      readOnly
                      style={{ marginBottom: "10px" }}
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-primary" onClick={handleCopyLink}>
                      Copy Link
                    </button>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;