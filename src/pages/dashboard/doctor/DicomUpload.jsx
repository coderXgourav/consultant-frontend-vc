

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { notification, Table, Button, Modal, Spin, Pagination } from "antd";
// import cornerstone from "cornerstone-core";
// import dicomParser from "dicom-parser";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneMath from "cornerstone-math";
// import Hammer from "hammerjs";
// import Topbar from "../../../components/Topbar";
// import Sidebar from "../../../components/Sidebar";
// import { Select } from "antd";

// import { DeleteOutlined, EyeOutlined  } from '@ant-design/icons'; // Import the delete icon


// // Initialize Cornerstone tools
// cornerstoneTools.external.cornerstone = cornerstone;
// cornerstoneTools.external.Hammer = Hammer;
// cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

// // Configure WADO Image Loader
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
// cornerstoneWADOImageLoader.configure({
//   useWebWorkers: true,
// });

// const DicomUpload = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [stack, setStack] = useState({ imageIds: [], currentImageIdIndex: 0 });
//   const viewerRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [playbackSpeed, setPlaybackSpeed] = useState(12); // Default FPS

//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalFiles: 0,
//     pageSize: 10,
//   });

//   const handleDeleteFile = (fileName) => {
//     // Show confirmation modal
//     Modal.confirm({
//       title: "Are you sure you want to delete this file?",
//       content: `You are about to delete the file: ${fileName}. This action cannot be undone.`,
//       onOk: async () => {
//         try {
//           setLoading(true);
//           const response = await axios.delete(
//             `${import.meta.env.VITE_API_URL}/uploads/dicom/file/delete-dicom/${fileName}`
//           );
//           notification.success({
//             message: "File deleted successfully",
//             description: response.data.message,
//           });
//           fetchDicomFiles(); // Refresh the file list
//         } catch (error) {
//           notification.error({
//             message: "Failed to delete file",
//             description: error.response?.data?.message || "An error occurred.",
//           });
//         } finally {
//           setLoading(false);
//         }
//       },
//     });
//   };


//   const handleSpeedChange = (value) => {
//     const newSpeed = Number(value);
//     setPlaybackSpeed(newSpeed);
  
//     if (isPlaying) {
//       stopStack();
//       setTimeout(() => {
//         playStack(newSpeed);
//       }, 100); // Small delay to ensure smooth transition
//     }
//   };
  
//   const playStack = (speed = playbackSpeed) => {
//     const element = viewerRef.current;
//     if (!stack.imageIds.length || stack.imageIds.length === 1) {
//       alert("This DICOM file does not contain multiple frames.");
//       return;
//     }
  
//     cornerstoneTools.playClip(element, speed); // Play with dynamic FPS
//     setIsPlaying(true);
//   };

//   const stopStack = () => {
//     cornerstoneTools.stopClip(viewerRef.current);
//     setIsPlaying(false);
//   };

//   const fetchDicomFiles = async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/uploads/dicom/file/list-dicom`,
//         { params: { page, limit: pagination.pageSize } }
//       );
//       setUploadedFiles(response.data.files);
//       setPagination({
//         currentPage: response.data.pagination.currentPage,
//         totalPages: response.data.pagination.totalPages,
//         totalFiles: response.data.pagination.totalFiles,
//         pageSize: pagination.pageSize,
//       });
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       notification.error({ 
//         message: "Failed to Fetch Files", 
//         description: error.response?.data?.message || "An error occurred." 
//       });
//     }
//   };

//   useEffect(() => {
//     fetchDicomFiles();
//   }, []);

//   const handlePaginationChange = (page) => {
//     fetchDicomFiles(page);
//   };

//   const handleZoom = (event) => {
//     const element = viewerRef.current;
//     const container = element.parentElement;
  
//     if (!element || !container) return;
  
//     const viewport = cornerstone.getViewport(element);
//     const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
//     viewport.scale *= zoomFactor;
//     cornerstone.setViewport(element, viewport);
  
//     const scaleFactor = viewport.scale;
//     element.style.width = `${500 * scaleFactor}px`;
//     element.style.height = `${500 * scaleFactor}px`;
//   };

//   const handleViewFile = async (fileUrl) => {
//     try {
//       const fullUrl = `${import.meta.env.VITE_API_URL}${fileUrl}`;
//       const response = await axios.get(fullUrl, { responseType: "arraybuffer" });
//       const arrayBuffer = response.data;
//       const byteArray = new Uint8Array(arrayBuffer);
//       const dataSet = dicomParser.parseDicom(byteArray);
//       const numberOfFrames = parseInt(dataSet.string("x00280008") || "1", 10);
//       const blob = new Blob([arrayBuffer], { type: "application/dicom" });
//       const objectUrl = URL.createObjectURL(blob);
  
//       setStack({ imageIds: [], currentImageIdIndex: 0 });
//       setModalVisible(true);
  
//       setTimeout(() => {
//         const element = viewerRef.current;
//         if (!element) {
//           notification.error({ 
//             message: "Viewer Error", 
//             description: "Viewer element is not available." 
//           });
//           return;
//         }
//         cornerstone.enable(element);
  
//         const loadImageAndSetTools = (imageId) => {
//           cornerstone.loadImage(imageId).then((image) => {
//             cornerstone.displayImage(element, image);
  
//             cornerstoneTools.init();
//             cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
//             cornerstoneTools.addTool(cornerstoneTools.PanTool);
//             cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
  
//             cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 1 });
//             cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 4 });
//             cornerstoneTools.setToolActive("StackScroll", { mouseButtonMask: 2 });
  
//             element.addEventListener("wheel", (event) => {
//               event.preventDefault();
//               const viewport = cornerstone.getViewport(element);
//               const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
//               viewport.scale *= zoomFactor;
//               cornerstone.setViewport(element, viewport);
//             });
  
//             let isDragging = false;
//             let startX, startY;
//             element.style.cursor = "grab";
  
//             element.addEventListener("mousedown", (event) => {
//               isDragging = true;
//               startX = event.clientX;
//               startY = event.clientY;
//               element.style.cursor = "grabbing";
//             });
  
//             element.addEventListener("mousemove", (event) => {
//               if (isDragging) {
//                 const dx = event.clientX - startX;
//                 const dy = event.clientY - startY;
//                 startX = event.clientX;
//                 startY = event.clientY;
  
//                 const viewport = cornerstone.getViewport(element);
//                 viewport.translation.x += dx;
//                 viewport.translation.y += dy;
//                 cornerstone.setViewport(element, viewport);
//               }
//             });
  
//             element.addEventListener("mouseup", () => {
//               isDragging = false;
//               element.style.cursor = "grab";
//             });
  
//             element.addEventListener("mouseleave", () => {
//               isDragging = false;
//               element.style.cursor = "grab";
//             });
//           });
//         };
  
//         if (numberOfFrames > 1) {
//           const imageIds = Array.from(
//             { length: numberOfFrames }, 
//             (_, index) => `wadouri:${objectUrl}#frame=${index}`
//           );
//           setStack({ imageIds, currentImageIdIndex: 0 });
  
//           cornerstoneTools.addStackStateManager(element, ["stack"]);
//           cornerstoneTools.addToolState(element, "stack", { 
//             currentImageIdIndex: 0, 
//             imageIds 
//           });
  
//           loadImageAndSetTools(imageIds[0]);
//         } else {
//           loadImageAndSetTools(`wadouri:${objectUrl}`);
//         }
//       }, 300);
//     } catch (error) {
//       notification.error({ 
//         message: "Load Error", 
//         description: error.message || "Failed to load the DICOM file." 
//       });
//     }
//   };
  
//   const handleCloseViewer = () => {
//     const element = viewerRef.current;
//     if (element) cornerstone.disable(element);
//     setIsPlaying(false);
//     setModalVisible(false);
//     window.location.reload();
//   };

//   const handleFileUpload = async (file) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("dicomFile", file);

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/uploads/dicom/file/upload-dicom`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       notification.success({ 
//         message: "File uploaded successfully", 
//         description: response.data.message 
//       });
//       window.location.reload();
//     } catch (error) {
//       notification.error({ 
//         message: "Upload Error", 
//         description: error.response?.data?.message || "An error occurred while uploading the file." 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };



//   const columns = [
//     { title: "No.", dataIndex: "key", key: "key", width: "10%" },
//     { title: "File Name", dataIndex: "name", key: "name" },
//     { 
//       title: "Action", 
//       key: "action", 
//       width: "20%", 
//       render: (_, record) => (
//         <>
//           {/* View Button with animation */}
//           <Button
//             type="primary" 
//             style={{
//               backgroundColor: "#116af0", 
//               border: "none", 
//               transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             }}
//             onClick={() => handleViewFile(record.url)}
//             icon={<EyeOutlined />}
//             className="view-button">View
//             </Button>
          
//           {/* Delete Button with red color and animation */}
//           <Button
//   type="danger"
//   onClick={() => handleDeleteFile(record.name)}
//   icon={<DeleteOutlined size={24}/>}
//   style={{
//     color: "red", // Inline red color for text
//     marginLeft: "10px", // Margin between buttons
//     fontSize: "36px", // Make the icon slightly bigger
//     transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for transform and shadow
//   }}
 
//   // Tailwind hover classes for scaling, color change, shadow, and background change
// />

//         </>
//       ),
//     },
//   ];
  

//   return (
//     <div className="page-wrapper">
//       <Topbar />
//       <div className="main-container">
//         <Sidebar />
//         <div className="app-container">
//           <div className="app-hero-header d-flex align-items-center justify-content-between">
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item">
//                 <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
//                 <a href="/">Home</a>
//               </li>
//               <li className="breadcrumb-item text-primary" aria-current="page">
//                 DICOM Upload
//               </li>
//             </ol>
//           </div>
//           <div className="container py-5" >
//             <Button
//               icon={<i className="ri-upload-2-line" />}
//               type="primary"
//               style={{ marginBottom: "20px", marginTop: "20px", marginRight: "10px" }}
//               onClick={() => document.getElementById('file-input').click()}
//             >
//               Upload File
//             </Button>
//             <input 
//               id="file-input"
//               type="file" 
//               accept=".dcm" 
//               style={{ display: "none" }} 
//               onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} 
//             />

//             {loading ? (
//               <Spin 
//                 size="large" 
//                 style={{
//                   marginTop: "100px",
//                   display: "flex", 
//                   justifyContent: "center", 
//                   alignItems: "center"
//                 }} 
//               />
//             ) : (
//               <>
//                 <Table 
//                   columns={columns} 
//                   dataSource={uploadedFiles.map((file, index) => ({ 
//                     key: index + 1, 
//                     name: file.name, 
//                     url: file.url 
//                   }))} 
//                   pagination={false} 
//                 />

//             <Pagination
//                   current={pagination.currentPage}
//                   total={pagination.totalFiles}
//                   pageSize={pagination.pageSize}
//                   onChange={handlePaginationChange}
//                   showSizeChanger={false}
//                 />
                
//                 <Modal 
//                   visible={modalVisible} 
//                   onCancel={handleCloseViewer} 
//                   footer={null} 
//                   width="90%" 
//                   destroyOnClose
//                 >
//                   <div style={{ width: "100%", height: "550px", overflow: "hidden" }}>
//                     <div 
//                       ref={viewerRef} 
//                       style={{ width: "99%", height: "550px", backgroundColor: "black" }} 
//                     />
//                   </div>
//                   <div style={{ marginTop: "20px", display:"flex", justifyContent: "center", alignItems: "center" }}>

//                   <Button 
//                       onClick={playStack} 
//                       disabled={isPlaying}
//                       type="text"
//                       style={{ marginLeft: "30px",marginTop:"0px" }}
//                       icon={<i className="ri-play-circle-line" style={{ 
//                         fontSize: '38px', 
//                         color: isPlaying ? '#999' : '#116af0' 
//                       }} />}
//                     />
//                     <Button 
//                       onClick={stopStack} 
//                       disabled={!isPlaying}
//                       type="text"
//                       style={{ marginLeft: "30px", marginTop:"0px" }}
//                       icon={<i className="ri-pause-circle-line" style={{ 
//                         fontSize: '38px', 
//                         color: !isPlaying ? '#999' : '#116af0' 
//                       }} />}
//                     />

//                     {/* <label className="mx-5">Playback Speed:</label> */}
//                     <Select
//                       value={playbackSpeed}
//                       onChange={handleSpeedChange}
//                       style={{
//                         width: 150,
//                         marginLeft: "30px",
//                         marginRight: "10px",
//                         borderRadius: "5px",
//                         background: "#f0f2f5",
//                       }}
//                     >
//                       <Select.Option value={5}>🐢 Slow (5 FPS)</Select.Option>
//                       <Select.Option value={12}>⚡ Normal (12 FPS)</Select.Option>
//                       <Select.Option value={24}>🚀 Fast (24 FPS)</Select.Option>
//                     </Select>

                 
//                   </div>
//                 </Modal>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DicomUpload;


// import React, { useState, useRef, useEffect } from "react";
// import { Modal, Button, Select } from "antd";
// import cornerstone from "cornerstone-core";
// import cornerstoneTools from "cornerstone-tools";
// import dicomParser from "dicom-parser";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import cornerstoneMath from "cornerstone-math";
// import Hammer from "hammerjs";

// cornerstoneTools.external.cornerstone = cornerstone;
// cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
// cornerstoneTools.external.Hammer = Hammer;
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
// cornerstoneWADOImageLoader.configure({ useWebWorkers: true });

// const CompareDicom = () => {
//   const leftViewerRef = useRef(null);
//   const rightViewerRef = useRef(null);

//   const [isVisible, setIsVisible] = useState(false);

//   const [leftStack, setLeftStack] = useState({ imageIds: [], currentImageIdIndex: 0 });
//   const [rightStack, setRightStack] = useState({ imageIds: [], currentImageIdIndex: 0 });

//   const [leftPlaying, setLeftPlaying] = useState(false);
//   const [rightPlaying, setRightPlaying] = useState(false);

//   const [leftSpeed, setLeftSpeed] = useState(12);
//   const [rightSpeed, setRightSpeed] = useState(12);

//   const openModal = () => setIsVisible(true);
//   const closeModal = () => setIsVisible(false);

//   const handleFileSelect = async (event, viewerRef, setStack) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       try {
//         const arrayBuffer = e.target.result;
//         const byteArray = new Uint8Array(arrayBuffer);
//         const dataSet = dicomParser.parseDicom(byteArray);

//         const numberOfFrames = parseInt(dataSet.string("x00280008") || "1", 10);
//         const blob = new Blob([arrayBuffer], { type: "application/dicom" });
//         const objectUrl = URL.createObjectURL(blob);

//         if (viewerRef.current) {
//           cornerstone.enable(viewerRef.current);

//           const imageIds = Array.from(
//             { length: numberOfFrames },
//             (_, index) => `wadouri:${objectUrl}#frame=${index}`
//           );

//           setStack({ imageIds, currentImageIdIndex: 0 });

//           cornerstoneTools.addStackStateManager(viewerRef.current, ["stack"]);
//           cornerstoneTools.addToolState(viewerRef.current, "stack", {
//             currentImageIdIndex: 0,
//             imageIds,
//           });

//           loadImage(viewerRef, imageIds[0]);
//         }
//       } catch (error) {
//         console.error("Error loading DICOM file:", error);
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const loadImage = (viewerRef, imageId) => {
//     if (viewerRef.current) {
//       cornerstone.loadImage(imageId).then((image) => {
//         cornerstone.displayImage(viewerRef.current, image);

//         cornerstoneTools.init();

//         cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
//         cornerstoneTools.addTool(cornerstoneTools.PanTool);
//         cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);

//         cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 1 });
//         cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 4 });
//         cornerstoneTools.setToolActive("StackScroll", { mouseButtonMask: 2 });
//       });
//     }
//   };

//   const playStack = (viewerRef, stack, setPlaying, speed) => {
//     if (!stack.imageIds.length || stack.imageIds.length === 1) {
//       alert("This DICOM file does not contain multiple frames.");
//       return;
//     }
//     cornerstoneTools.playClip(viewerRef.current, speed);
//     setPlaying(true);
//   };

//   const stopStack = (viewerRef, setPlaying) => {
//     cornerstoneTools.stopClip(viewerRef.current);
//     setPlaying(false);
//   };

//   useEffect(() => {
//     if (leftPlaying) {
//       stopStack(leftViewerRef, setLeftPlaying);
//       playStack(leftViewerRef, leftStack, setLeftPlaying, leftSpeed);
//     }
//   }, [leftSpeed]);

//   useEffect(() => {
//     if (rightPlaying) {
//       stopStack(rightViewerRef, setRightPlaying);
//       playStack(rightViewerRef, rightStack, setRightPlaying, rightSpeed);
//     }
//   }, [rightSpeed]);

//   const handleZoom = (event, viewerRef) => {
//     const element = viewerRef.current;
//     if (!element) return;

//     const viewport = cornerstone.getViewport(element);
//     const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
//     viewport.scale *= zoomFactor;
//     cornerstone.setViewport(element, viewport);
//   };

//   return (
//     <>
//       <Button onClick={openModal}>Compare DICOM Files</Button>

//       <Modal open={isVisible} onCancel={closeModal} footer={null} width="90%" destroyOnClose>
//         <div style={{ display: "flex", gap: "10px" }}>
//           {/* Left Viewer */}
//           <div style={{ width: "50%", height: "500px", backgroundColor: "black" }}>
//             <input
//               type="file"
//               accept=".dcm"
//               onChange={(e) => handleFileSelect(e, leftViewerRef, setLeftStack)}
//               style={{ marginBottom: "10px" }}
//             />
//             <div
//               ref={leftViewerRef}
//               onWheel={(e) => handleZoom(e, leftViewerRef)}
//               style={{ width: "100%", height: "100%", cursor: "grab" }}
//             />
//             <div style={{ marginTop: "10px", textAlign: "center" }}>
//               <Button onClick={() => playStack(leftViewerRef, leftStack, setLeftPlaying, leftSpeed)} disabled={leftPlaying}>
//                 ▶️ Play
//               </Button>
//               <Button onClick={() => stopStack(leftViewerRef, setLeftPlaying)} disabled={!leftPlaying}>
//                 ⏸️ Pause
//               </Button>
//               <Select value={leftSpeed} onChange={setLeftSpeed} style={{ width: "80%" }}>
//                 <Select.Option value={5}>🐢 Slow (5 FPS)</Select.Option>
//                 <Select.Option value={12}>⚡ Normal (12 FPS)</Select.Option>
//                 <Select.Option value={24}>🚀 Fast (24 FPS)</Select.Option>
//               </Select>
//             </div>
//           </div>

//           {/* Right Viewer */}
//           <div style={{ width: "50%", height: "500px", backgroundColor: "black" }}>
//             <input
//               type="file"
//               accept=".dcm"
//               onChange={(e) => handleFileSelect(e, rightViewerRef, setRightStack)}
//               style={{ marginBottom: "10px" }}
//             />
//             <div
//               ref={rightViewerRef}
//               onWheel={(e) => handleZoom(e, rightViewerRef)}
//               style={{ width: "100%", height: "100%", cursor: "grab" }}
//             />
//             <div style={{ marginTop: "10px", textAlign: "center" }}>
//               <Button onClick={() => playStack(rightViewerRef, rightStack, setRightPlaying, rightSpeed)} disabled={rightPlaying}>
//                 ▶️ Play
//               </Button>
//               <Button onClick={() => stopStack(rightViewerRef, setRightPlaying)} disabled={!rightPlaying}>
//                 ⏸️ Pause
//               </Button>
//               <Select value={rightSpeed} onChange={setRightSpeed} style={{ width: "80%" }}>
//                 <Select.Option value={5}>🐢 Slow (5 FPS)</Select.Option>
//                 <Select.Option value={12}>⚡ Normal (12 FPS)</Select.Option>
//                 <Select.Option value={24}>🚀 Fast (24 FPS)</Select.Option>
//               </Select>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default CompareDicom;









// uploadDicom.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  notification,
  Table,
  Button,
  Modal,
  Spin,
  Pagination,
  Select
} from "antd";
import cornerstone from "cornerstone-core";
import dicomParser from "dicom-parser";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneMath from "cornerstone-math";
import Hammer from "hammerjs";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";

import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"; // Import the delete icon

// Initialize Cornerstone tools
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

// Configure WADO Image Loader
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.configure({
  useWebWorkers: true,
});

const DicomUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [stack, setStack] = useState({ imageIds: [], currentImageIdIndex: 0 });
  const viewerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(12); // Default FPS

  const [isLeftFileSelected, setIsLeftFileSelected] = useState(false);
  const [isRightFileSelected, setIsRightFileSelected] = useState(false);
  

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalFiles: 0,
    pageSize: 10,
  });

  // State for CompareDicom modal
  const [compareModalVisible, setCompareModalVisible] = useState(false);
  const leftViewerRef = useRef(null);
  const rightViewerRef = useRef(null);
  const [leftStack, setLeftStack] = useState({ imageIds: [], currentImageIdIndex: 0 });
  const [rightStack, setRightStack] = useState({ imageIds: [], currentImageIdIndex: 0 });
  const [leftPlaying, setLeftPlaying] = useState(false);
  const [rightPlaying, setRightPlaying] = useState(false);
  const [leftSpeed, setLeftSpeed] = useState(12);
  const [rightSpeed, setRightSpeed] = useState(12);

  const handleDeleteFile = (fileName) => {
    // Show confirmation modal
    Modal.confirm({
      title: "Are you sure you want to delete this file?",
      content: `You are about to delete the file: ${fileName}. This action cannot be undone.`,
      onOk: async () => {
        try {
          setLoading(true);
          const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/uploads/dicom/file/delete-dicom/${fileName}`
          );
          notification.success({
            message: "File deleted successfully",
            description: response.data.message,
          });
          fetchDicomFiles(); // Refresh the file list
        } catch (error) {
          notification.error({
            message: "Failed to delete file",
            description:
              error.response?.data?.message || "An error occurred.",
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleSpeedChange = (value) => {
    const newSpeed = Number(value);
    setPlaybackSpeed(newSpeed);

    if (isPlaying) {
      stopStack();
      setTimeout(() => {
        playStack(newSpeed);
      }, 100); // Small delay to ensure smooth transition
    }
  };

  const playStack = (speed = playbackSpeed) => {
    const element = viewerRef.current;
    if (!stack.imageIds.length || stack.imageIds.length === 1) {
      alert("This DICOM file does not contain multiple frames.");
      return;
    }

    cornerstoneTools.playClip(element, speed); // Play with dynamic FPS
    setIsPlaying(true);
  };

  const stopStack = () => {
    cornerstoneTools.stopClip(viewerRef.current);
    setIsPlaying(false);
  };

  const fetchDicomFiles = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/uploads/dicom/file/list-dicom`,
        { params: { page, limit: pagination.pageSize } }
      );
      setUploadedFiles(response.data.files);
      setPagination({
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
        totalFiles: response.data.pagination.totalFiles,
        pageSize: pagination.pageSize,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Failed to Fetch Files",
        description: error.response?.data?.message || "An error occurred.",
      });
    }
  };

  useEffect(() => {
    fetchDicomFiles();
  }, []);

  const handlePaginationChange = (page) => {
    fetchDicomFiles(page);
  };

  const handleZoom = (event) => {
    const element = viewerRef.current;
    const container = element.parentElement;

    if (!element || !container) return;

    const viewport = cornerstone.getViewport(element);
    const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
    viewport.scale *= zoomFactor;
    cornerstone.setViewport(element, viewport);

    const scaleFactor = viewport.scale;
    element.style.width = `${500 * scaleFactor}px`;
    element.style.height = `${500 * scaleFactor}px`;
  };

  const handleViewFile = async (fileUrl) => {
    try {
      const fullUrl = `${import.meta.env.VITE_API_URL}${fileUrl}`;
      const response = await axios.get(fullUrl, {
        responseType: "arraybuffer",
      });
      const arrayBuffer = response.data;
      const byteArray = new Uint8Array(arrayBuffer);
      const dataSet = dicomParser.parseDicom(byteArray);
      const numberOfFrames = parseInt(dataSet.string("x00280008") || "1", 10);
      const blob = new Blob([arrayBuffer], { type: "application/dicom" });
      const objectUrl = URL.createObjectURL(blob);

      setStack({ imageIds: [], currentImageIdIndex: 0 });
      setModalVisible(true);

      setTimeout(() => {
        const element = viewerRef.current;
        if (!element) {
          notification.error({
            message: "Viewer Error",
            description: "Viewer element is not available.",
          });
          return;
        }
        cornerstone.enable(element);

        const loadImageAndSetTools = (imageId) => {
          cornerstone.loadImage(imageId).then((image) => {
            cornerstone.displayImage(element, image);

            cornerstoneTools.init();
            cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
            cornerstoneTools.addTool(cornerstoneTools.PanTool);
            cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);

            cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 1 });
            cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 4 });
            cornerstoneTools.setToolActive("StackScroll", { mouseButtonMask: 2 });

            element.addEventListener("wheel", (event) => {
              event.preventDefault();
              const viewport = cornerstone.getViewport(element);
              const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
              viewport.scale *= zoomFactor;
              cornerstone.setViewport(element, viewport);
            });

            let isDragging = false;
            let startX, startY;
            element.style.cursor = "grab";

            element.addEventListener("mousedown", (event) => {
              isDragging = true;
              startX = event.clientX;
              startY = event.clientY;
              element.style.cursor = "grabbing";
            });

            element.addEventListener("mousemove", (event) => {
              if (isDragging) {
                const dx = event.clientX - startX;
                const dy = event.clientY - startY;
                startX = event.clientX;
                startY = event.clientY;

                const viewport = cornerstone.getViewport(element);
                viewport.translation.x += dx;
                viewport.translation.y += dy;
                cornerstone.setViewport(element, viewport);
              }
            });

            element.addEventListener("mouseup", () => {
              isDragging = false;
              element.style.cursor = "grab";
            });

            element.addEventListener("mouseleave", () => {
              isDragging = false;
              element.style.cursor = "grab";
            });
          });
        };

        if (numberOfFrames > 1) {
          const imageIds = Array.from(
            { length: numberOfFrames },
            (_, index) => `wadouri:${objectUrl}#frame=${index}`
          );
          setStack({ imageIds, currentImageIdIndex: 0 });

          cornerstoneTools.addStackStateManager(element, ["stack"]);
          cornerstoneTools.addToolState(element, "stack", {
            currentImageIdIndex: 0,
            imageIds,
          });

          loadImageAndSetTools(imageIds[0]);
        } else {
          loadImageAndSetTools(`wadouri:${objectUrl}`);
        }
      }, 300);
    } catch (error) {
      notification.error({
        message: "Load Error",
        description:
          error.message || "Failed to load the DICOM file.",
      });
    }
  };

  const handleCloseViewer = () => {
    const element = viewerRef.current;
    if (element) cornerstone.disable(element);
    setIsPlaying(false);
    setModalVisible(false);
    window.location.reload();
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("dicomFile", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploads/dicom/file/upload-dicom`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notification.success({
        message: "File uploaded successfully",
        description: response.data.message,
      });
      setTimeout(() => {
        setLoading(true);
        window.location.reload();
        setLoading(false);
      }, 500);
    } catch (error) {
      notification.error({
        message: "Upload Error",
        description:
          error.response?.data?.message ||
          "An error occurred while uploading the file.",
      });
    } finally {
      setLoading(false);
    }
  };

  // CompareDicom functions
  const openCompareModal = () => setCompareModalVisible(true);
  const closeCompareModal = () => {setCompareModalVisible(false)
    setLoading(true)
    window.location.reload();
    setLoading(false)
  };

  // const handleFileSelect = async (event, viewerRef, setStack) => {
  //   const file = event.target.files[0];
  //   if (!file) return;
  
  //   const reader = new FileReader();
  //   reader.onload = async (e) => {
  //     try {
  //       const arrayBuffer = e.target.result;
  //       const byteArray = new Uint8Array(arrayBuffer);
  //       const dataSet = dicomParser.parseDicom(byteArray); // Corrected line: Use dataSet
  
  //       const numberOfFrames = parseInt(dataSet.string("x00280008") || "1", 10); // Corrected line: use dataSet
  //       const blob = new Blob([arrayBuffer], { type: "application/dicom" });
  //       const objectUrl = URL.createObjectURL(blob);
  
  //       if (viewerRef.current) {
  //         cornerstone.enable(viewerRef.current);
  
  //         const imageIds = Array.from(
  //           { length: numberOfFrames },
  //           (_, index) => `wadouri:${objectUrl}#frame=${index}`
  //         );
  
  //         setStack({ imageIds, currentImageIdIndex: 0 });
  
  //         cornerstoneTools.addStackStateManager(viewerRef.current, ["stack"]);
  //         cornerstoneTools.addToolState(viewerRef.current, "stack", {
  //           currentImageIdIndex: 0,
  //           imageIds,
  //         });
  
  //         loadImage(viewerRef, imageIds[0]);
  //       }
  //     } catch (error) {
  //       console.error("Error loading DICOM file:", error);
  //     }
  //   };
  //   reader.readAsArrayBuffer(file);
  // };



  const handleFileSelect = async (event, viewerRef, setStack, setFileSelected) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        const byteArray = new Uint8Array(arrayBuffer);
        const dataSet = dicomParser.parseDicom(byteArray);
  
        const numberOfFrames = parseInt(dataSet.string("x00280008") || "1", 10);
        const blob = new Blob([arrayBuffer], { type: "application/dicom" });
        const objectUrl = URL.createObjectURL(blob);
  
        if (viewerRef.current) {
          cornerstone.enable(viewerRef.current);
  
          const imageIds = Array.from(
            { length: numberOfFrames },
            (_, index) => `wadouri:${objectUrl}#frame=${index}`
          );
  
          setStack({ imageIds, currentImageIdIndex: 0 });
  
          cornerstoneTools.addStackStateManager(viewerRef.current, ["stack"]);
          cornerstoneTools.addToolState(viewerRef.current, "stack", {
            currentImageIdIndex: 0,
            imageIds,
          });
  
          loadImage(viewerRef, imageIds[0]);
          setFileSelected(true); // Enable play/pause buttons
        }
      } catch (error) {
        console.error("Error loading DICOM file:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  

  const loadImage = (viewerRef, imageId) => {
    if (viewerRef.current) {
      cornerstone.loadImage(imageId).then((image) => {
        cornerstone.displayImage(viewerRef.current, image);
        cornerstoneTools.init();
        cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
        cornerstoneTools.addTool(cornerstoneTools.PanTool);
        cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
        cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 1 });
        cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 4 });
        cornerstoneTools.setToolActive("StackScroll", { mouseButtonMask: 2 });
      });
    }
  };

  const playCompareStack = (viewerRef, stack, setPlaying, speed) => {
    if (!stack.imageIds.length || stack.imageIds.length === 1) {
      alert("This DICOM file does not contain multiple frames.");
      return;
    }
    cornerstoneTools.playClip(viewerRef.current, speed);
    setPlaying(true);
  };

  const stopCompareStack = (viewerRef, setPlaying) => {
    cornerstoneTools.stopClip(viewerRef.current);
    setPlaying(false);
  };

  useEffect(() => {
    if (leftPlaying) {
      stopCompareStack(leftViewerRef, setLeftPlaying);
      playCompareStack(leftViewerRef, leftStack, setLeftPlaying, leftSpeed);
    }
  }, [leftSpeed]);

  useEffect(() => {
    if (rightPlaying) {
      stopCompareStack(rightViewerRef, setRightPlaying);
      playCompareStack(rightViewerRef, rightStack, setRightPlaying, rightSpeed);
    }
  }, [rightSpeed]);

  const handleCompareZoom = (event, viewerRef) => {
    const element = viewerRef.current;
    if (!element) return;

    const viewport = cornerstone.getViewport(element);
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
    viewport.scale *= zoomFactor;
    cornerstone.setViewport(element, viewport);
  };

  const columns = [
    { title: "No.", dataIndex: "key", key: "key", width: "10%" },
    { title: "File Name", dataIndex: "name", key: "name" },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <>
          {/* View Button with animation */}
          <Button
            type="primary"
            style={{
              backgroundColor: "#116af0",
              border: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onClick={() => handleViewFile(record.url)}
            icon={<EyeOutlined />}
            className="view-button"
          >
            View
          </Button>

          {/* Delete Button with red color and animation */}
          <Button
            type="danger"
            onClick={() => handleDeleteFile(record.name)}
            icon={<DeleteOutlined size={24} />}
            style={{
              color: "red", // Inline red color for text
              marginLeft: "10px", // Margin between buttons
              fontSize: "36px", // Make the icon slightly bigger
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for transform and shadow
            }}
          />
        </>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <Topbar />
      <div className="main-container">
        <Sidebar />
        <div className="app-container">
          <div className="app-hero-header d-flex align-items-center justify-content-between">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item text-primary" aria-current="page">
                DICOM Upload
              </li>
            </ol>
          </div>
          <div className="container py-5">
            <Button
              icon={<i className="ri-upload-2-line" />}
              type="primary"
              style={{
                marginBottom: "20px",
                marginTop: "20px",
                marginRight: "10px",
              }}
              onClick={() => document.getElementById("file-input").click()}
            >
              Upload File
            </Button>
            
            <Button
              type="primary"
              onClick={openCompareModal}
              style={{ marginBottom: "20px", marginTop: "20px", marginRight: "10px" }}
            >
              Compare DICOM Files
            </Button>
            
            <input
              id="file-input"
              type="file"
              accept=".dcm"
              style={{ display: "none" }}
              onChange={(e) =>
                e.target.files && handleFileUpload(e.target.files[0])
              }
            />

            {loading ? (
              <Spin
                size="large"
                style={{
                  marginTop: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            ) : (
              <>
                <Table
                  columns={columns}
                  dataSource={uploadedFiles.map((file, index) => ({
                    key: index + 1,
                    name: file.name,
                    url: file.url,
                  }))}
                  pagination={false}
                />

                <Pagination
                  current={pagination.currentPage}
                  total={pagination.totalFiles}
                  pageSize={pagination.pageSize}
                  onChange={handlePaginationChange}
                  showSizeChanger={false}
                />

                <Modal
                  visible={modalVisible}
                  onCancel={handleCloseViewer}
                  footer={null}
                  width="90%"
                  destroyOnClose
                >
                  <div
                    style={{
                      width: "100%",
                      height: "550px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      ref={viewerRef}
                      style={{
                        width: "99%",
                        height: "550px",
                        backgroundColor: "black",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={playStack}
                      disabled={isPlaying}
                      type="text"
                      style={{ marginLeft: "30px", marginTop: "0px" }}
                      icon={
                        <i
                          className="ri-play-circle-line"
                          style={{
                            fontSize: "38px",
                            color: isPlaying ? "#999" : "#116af0",
                          }}
                        />
                      }
                    />
                    <Button
                      onClick={stopStack}
                      disabled={!isPlaying}
                      type="text"
                      style={{ marginLeft: "30px", marginTop: "0px" }}
                      icon={
                        <i
                          className="ri-pause-circle-line"
                          style={{
                            fontSize: "38px",
                            color: !isPlaying ? "#999" : "#116af0",
                          }}
                        />
                      }
                    />

                    {/* <label className="mx-5">Playback Speed:</label> */}
                    <Select
                      value={playbackSpeed}
                      onChange={handleSpeedChange}
                      style={{
                        width: 150,
                        marginLeft: "30px",
                        marginRight: "10px",
                        borderRadius: "5px",
                        background: "#f0f2f5",
                      }}
                    >
                      <Select.Option value={5}>🐢 Slow (5 FPS)</Select.Option>
                      <Select.Option value={12}>⚡ Normal (12 FPS)</Select.Option>
                      <Select.Option value={24}>🚀 Fast (24 FPS)</Select.Option>
                    </Select>
                  </div>
                </Modal>
                {/* Compare DICOM Modal */}
                
                <Modal
  open={compareModalVisible}
  onCancel={closeCompareModal}
  footer={null}
  width="90%"
  destroyOnClose
  title="DICOM Comparison"
>
  <div style={{ display: "flex", gap: "20px", flexDirection: "row", flexWrap: "wrap" ,zoom:"0.9"}}>
    {/* Left Viewer */}
    <div
      style={{
        width: "calc(50% - 10px)",
        minWidth: "300px",
        flex: "1 1 45%",
      }}
    >
      <div style={{ 
        padding: "10px", 
        background: "#f5f5f5", 
        borderRadius: "4px",
        marginBottom: "10px" 
      }}>
        {/* <input
          type="file"
          accept=".dcm"
          onChange={(e) => handleFileSelect(e, leftViewerRef, setLeftStack)}
          style={{ width: "100%", padding: "8px", border: "1px solid #d9d9d9", borderRadius: "4px" }}
        /> */}

<input
  type="file"
  accept=".dcm"
  onChange={(e) => handleFileSelect(e, leftViewerRef, setLeftStack, setIsLeftFileSelected)}
  style={{ width: "100%", padding: "8px", border: "1px solid #d9d9d9", borderRadius: "4px" }}
/>
      </div>
      
      <div
        ref={leftViewerRef}
        onWheel={(e) => handleCompareZoom(e, leftViewerRef)}
        style={{ 
          width: "100%", 
          height: "400px", 
          backgroundColor: "black", 
          cursor: "grab",
          borderRadius: "4px" 
        }}
      />
      
      <div style={{ 
        marginTop: "10px", 
        padding: "15px",
        background: "#f5f5f5", 
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {/* <Button 
            type="primary" 
            onClick={() => playCompareStack(leftViewerRef, leftStack, setLeftPlaying, leftSpeed)} 
            disabled={leftPlaying}
            style={{ minWidth: "100px", height: "40px", fontSize: "16px" }}
          >
            ▶️ Play
          </Button>
          
          <Button 
            danger
            onClick={() => stopCompareStack(leftViewerRef, setLeftPlaying)} 
            disabled={!leftPlaying}
            style={{ minWidth: "100px", height: "40px", fontSize: "16px" }}
          >
            ⏸️ Pause
          </Button> */}

<Button 
  type="primary" 
  onClick={() => playCompareStack(leftViewerRef, leftStack, setLeftPlaying, leftSpeed)} 
  disabled={!isLeftFileSelected || leftPlaying} // Disable if no file is selected
  style={{ minWidth: "100px", height: "40px", fontSize: "16px" }}
>
  ▶️ Play
</Button>

<Button 
  danger
  onClick={() => stopCompareStack(leftViewerRef, setLeftPlaying)} 
  disabled={!isLeftFileSelected || !leftPlaying} // Disable if no file is selected
  style={{ minWidth: "100px", height: "40px", fontSize: "16px" }}
>
  ⏸️ Pause
</Button>
        </div>
        
        <div>
          <div style={{ marginBottom: "5px", fontWeight: "bold" }}>Playback Speed:</div>
          <Select
            value={leftSpeed}
            onChange={(value) => setLeftSpeed(Number(value))}
            style={{ width: "100%" }}
            size="large"
          >
            <Select.Option value={5}>🐢 Slow (5 FPS)</Select.Option>
            <Select.Option value={12}>⚡ Normal (12 FPS)</Select.Option>
            <Select.Option value={24}>🚀 Fast (24 FPS)</Select.Option>
          </Select>
        </div>
      </div>
    </div>

    {/* Right Viewer */}
    <div
      style={{
        width: "calc(50% - 10px)",
        minWidth: "300px",
        flex: "1 1 45%",
      }}
    >
      <div style={{ 
        padding: "10px", 
        background: "#f5f5f5", 
        borderRadius: "4px",
        marginBottom: "10px" 
      }}>
        {/* <input
          type="file"
          accept=".dcm"
          onChange={(e) => handleFileSelect(e, rightViewerRef, setRightStack)}
          style={{ width: "100%", padding: "8px", border: "1px solid #d9d9d9", borderRadius: "4px" }}
        /> */}

        
<input
  type="file"
  accept=".dcm"
  onChange={(e) => handleFileSelect(e, rightViewerRef, setRightStack, setIsRightFileSelected)}
  style={{ width: "100%", padding: "8px", border: "1px solid #d9d9d9", borderRadius: "4px" }}
/>
      </div>
      
      <div
        ref={rightViewerRef}
        onWheel={(e) => handleCompareZoom(e, rightViewerRef)}
        style={{ 
          width: "100%", 
          height: "400px", 
          backgroundColor: "black", 
          cursor: "grab",
          borderRadius: "4px" 
        }}
      />
      
      <div style={{ 
        marginTop: "10px", 
        padding: "15px",
        background: "#f5f5f5", 
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {/* <Button 
            type="primary"
            onClick={() => playCompareStack(rightViewerRef, rightStack, setRightPlaying, rightSpeed)} 
            disabled={rightPlaying}
            style={{ minWidth: "100px", height: "40px", fontSize: "16px" }}
          >
            ▶️ Play
          </Button>
          
          <Button 
            danger
            onClick={() => stopCompareStack(rightViewerRef, setRightPlaying)} 
            disabled={!rightPlaying}
            style={{ minWidth: "100px", height: "40px", fontSize: "16px" }}
          >
            ⏸️ Pause
          </Button> */}

<Button 
  type="primary"
  onClick={() => playCompareStack(rightViewerRef, rightStack, setRightPlaying, rightSpeed)} 
  disabled={!isRightFileSelected || rightPlaying}
  style={{ minWidth: "100px", height: "40px", fontSize: "16px" }}
>
  ▶️ Play
</Button>

<Button 
  danger
  onClick={() => stopCompareStack(rightViewerRef, setRightPlaying)} 
  disabled={!isRightFileSelected || !rightPlaying}
  style={{ minWidth: "100px", height: "40px", fontSize: "16px" }}
>
  ⏸️ Pause
</Button>
        </div>
        
        <div>
          <div style={{ marginBottom: "5px", fontWeight: "bold" }}>Playback Speed:</div>
          <Select
            value={rightSpeed}
            onChange={(value) => setRightSpeed(Number(value))}
            style={{ width: "100%" }}
            size="large"
          >
            <Select.Option value={5}>🐢 Slow (5 FPS)</Select.Option>
            <Select.Option value={12}>⚡ Normal (12 FPS)</Select.Option>
            <Select.Option value={24}>🚀 Fast (24 FPS)</Select.Option>
          </Select>
        </div>
      </div>
    </div>
  </div>
</Modal>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DicomUpload;
















// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { notification, Table, Button, Modal, Spin } from "antd";
// import cornerstone from "cornerstone-core";
// import dicomParser from "dicom-parser";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneMath from "cornerstone-math";
// import Hammer from "hammerjs";
// import Topbar from "../../../components/Topbar";
// import Sidebar from "../../../components/Sidebar";

// cornerstoneTools.external.cornerstone = cornerstone;
// cornerstoneTools.external.Hammer = Hammer;
// cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
// cornerstoneWADOImageLoader.configure({ useWebWorkers: true });

// const DicomUpload = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [stack, setStack] = useState({ imageIds: [], currentImageIdIndex: 0 });
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(10);
//   const viewerRef = useRef(null);

//   useEffect(() => {
//     const fetchDicomFiles = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/uploads/dicom/file/list-dicom`
//         );
//         const sortedFiles = response.data.files.sort(
//           (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
//         );
//         setUploadedFiles(sortedFiles);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         notification.error({
//           message: "Failed to Fetch Files",
//           description:
//             error.response?.data?.message || "An error occurred.",
//         });
//       }
//     };

//     fetchDicomFiles();
//   }, []);

//   const columns = [
//     { title: "No.", dataIndex: "key", key: "key", width: "10%" },
//     { title: "File Name", dataIndex: "name", key: "name" },
//     {
//       title: "Action",
//       key: "action",
//       width: "20%",
//       render: (_, record) => (
//         <Button
//           type="primary"
//           style={{ backgroundColor: "#116af0", border: "none" }}
//           onClick={() => handleViewFile(record.url)}
//         >
//           View
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className="page-wrapper">
//       <Topbar />
//       <div className="main-container">
//         <Sidebar />
//         <div className="app-container">
//           <div className="container py-4">
//             <Button
//               icon={<i className="ri-upload-2-line" />}
//               type="primary"
//               style={{ marginBottom: "20px", marginTop: "20px", marginRight: "10px" }}
//               onClick={() => document.getElementById("file-input").click()}
//             >
//               Upload File
//             </Button>
//             <input
//               id="file-input"
//               type="file"
//               accept=".dcm"
//               style={{ display: "none" }}
//               onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
//             />

//             {loading ? (
//               <Spin size="large" style={{ marginTop: "100px", display: "flex", justifyContent: "center", alignItems: "center" }} />
//             ) : (
//               <Table
//                 columns={columns}
//                 dataSource={uploadedFiles.map((file, index) => ({
//                   key: index + 1,
//                   name: file.name,
//                   url: file.url,
//                 }))}
//                 pagination={{
//                   current: currentPage,
//                   pageSize: pageSize,
//                   total: uploadedFiles.length,
//                   onChange: (page) => setCurrentPage(page),
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DicomUpload;

































