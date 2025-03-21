// import React, { useEffect, useState } from "react";
// import { useTable, useSortBy, useGlobalFilter } from "react-table";
// import axios from "axios";
// import { Spin, notification, message } from "antd";
// import { RiHome8Line, RiEyeLine, RiDeleteBin6Line, RiSearchLine } from "react-icons/ri";
// import { FaUserMd, FaFilter } from "react-icons/fa";
// import Topbar from "../../../components/patient/Topbar";
// import Sidebar from "../../../components/patient/Sidebar";

// import { HiOutlineMail } from "react-icons/hi"; // Import Email Icon

// const ViewDoctorByPatient = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedDoctorId, setSelectedDoctorId] = useState(null);
//   const [api, contextHolder] = notification.useNotification();

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/patient/get-doctor-by-patient`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("patientToken")}`,
//           },
//         }
//       );
//       if (response.data.status) {
//         setDoctors(response.data.doctors);
//       } else {
//         console.error("Failed to fetch doctors:", response.data.desc);
//       }
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteDoctor = async () => {
//     try {
//       const result = await axios.delete(
//         `${import.meta.env.VITE_API_URL}/admin/delete-doctor/${selectedDoctorId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setDoctors(doctors.filter((doctor) => doctor._id !== selectedDoctorId));
//       message.success(result?.data?.message);
//     } catch (error) {
//       message.error("Failed to delete doctor");
//     }
//   };

//   const columns = React.useMemo(
//     () => [
//       { Header: "No.", accessor: (_, index) => index + 1 },
//       {
//         Header: "Doctor Name",
//         accessor: (row) => (
//           <>
//             <img
//               src="/assets/images/patient.png"
//               className="img-shadow img-2x rounded-5 me-1"
//               alt="Doctor"
//               width={30} // Adjust width as needed
//               height={30} // Adjust height as needed
//             />
//             {row.firstName} {row.lastName}
//           </>
//         ),
//       },
      
//       { Header: "Mobile", accessor: "mobile" },
      
//       {
//         Header: "Email",
//         accessor: (row) => (
//           <>
//             <HiOutlineMail className="me-2 text-primary" /> {row.email}
//           </>
//         ),
//       },

//       {
//         Header: "Department",
//         accessor: (row) => row.specialization?.department || "N/A",
//       },
//       {
//         Header: "Actions",
//         accessor: "actions",
//         Cell: ({ row }) => (
//           <div className="d-inline-flex gap-2">
//             <a
//               href={`/patient/view-doctor-profile/${row.original._id}`}
//               className="btn btn-sm btn-primary"
//             >
//               <RiEyeLine /> View
//             </a>
//             {/* <button
//               className="btn btn-sm btn-danger"
//               data-bs-toggle="modal"
//               data-bs-target="#delRow"
//               onClick={() => setSelectedDoctorId(row.original._id)}
//             >
//               <RiDeleteBin6Line /> Delete
//             </button> */}
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const tableInstance = useTable(
//     { columns, data: doctors },
//     useGlobalFilter,
//     useSortBy
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter, state } = tableInstance;

//   return (
//     <div className="page-wrapper">
//       <Topbar />
//       <div className="main-container">
//         <Sidebar />
//         <div className="app-container">
//           <div className="app-hero-header d-flex align-items-center">
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item">
//                 <RiHome8Line className="lh-1 pe-3 me-3 border-end" />
//                 <a href="/">Home</a>
//               </li>
//               <li className="breadcrumb-item text-primary" aria-current="page">
//                 Doctors List
//               </li>
//             </ol>
//           </div>
//           <div className="app-body">
//             <div className="row gx-3">
//               <div className="col-sm-12">
//                 <div className="card">
//                   <div className="card-header d-flex align-items-center justify-content-between">
//                     <h5 className="card-title">
//                       <FaUserMd className="me-2" /> Doctors List
//                     </h5>
//                     <div className="d-flex align-items-center gap-3">
//                       <FaFilter className="text-secondary" />
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search..."
//                         value={state.globalFilter || ""}
//                         onChange={(e) => setGlobalFilter(e.target.value)}
//                       />
//                       <RiSearchLine className="text-primary" />
//                     </div>
//                   </div>
//                   {loading ? (
//                     <div className="d-flex justify-content-center py-5">
//                       <Spin size="large" />
//                     </div>
//                   ) : doctors.length === 0 ? (
//                     <h6 className="text-gray-500 text-center py-5">
//                       No doctors found
//                     </h6>
//                   ) : (
//                     <div className="card-body">
//                       <div className="table-responsive">
//                         <table className="table truncate m-0 align-middle" {...getTableProps()}>
//                           <thead>
//                             {headerGroups.map((headerGroup) => (
//                               <tr {...headerGroup.getHeaderGroupProps()}>
//                                 {headerGroup.headers.map((column) => (
//                                   <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                                     {column.render("Header")}
//                                     <span>
//                                       {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
//                                     </span>
//                                   </th>
//                                 ))}
//                               </tr>
//                             ))}
//                           </thead>
//                           <tbody {...getTableBodyProps()}>
//                             {rows.map((row) => {
//                               prepareRow(row);
//                               return (
//                                 <tr {...row.getRowProps()}>
//                                   {row.cells.map((cell) => (
//                                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                                   ))}
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   )}
//                   {/* Delete confirmation modal */}
//                   <div className="modal fade" id="delRow" tabIndex={-1} aria-hidden="true">
//                     <div className="modal-dialog modal-sm">
//                       <div className="modal-content">
//                         <div className="modal-header">
//                           <h5 className="modal-title">Confirm</h5>
//                           <button type="button" className="btn-close" data-bs-dismiss="modal" />
//                         </div>
//                         <div className="modal-body">
//                           Are you sure you want to delete this doctor?
//                         </div>
//                         <div className="modal-footer">
//                           <button className="btn btn-outline-secondary" data-bs-dismiss="modal">
//                             No
//                           </button>
//                           <button
//                             className="btn btn-danger"
//                             data-bs-dismiss="modal"
//                             onClick={deleteDoctor}
//                           >
//                             Yes
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {contextHolder}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewDoctorByPatient;


import React, { useEffect, useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import axios from "axios";
import { Spin, notification, message } from "antd";
import { RiHome8Line, RiEyeLine, RiDeleteBin6Line, RiSearchLine } from "react-icons/ri";
import { FaUserMd, FaFilter } from "react-icons/fa";
import Topbar from "../../../components/patient/Topbar";
import Sidebar from "../../../components/patient/Sidebar";
import { HiOutlineMail } from "react-icons/hi"; // Import Email Icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Default icon for missing profile photo

const ViewDoctorByPatient = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/patient/get-doctor-by-patient`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("patientToken")}`,
          },
        }
      );
      if (response.data.status) {
        setDoctors(response.data.doctors);
      } else {
        console.error("Failed to fetch doctors:", response.data.desc);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctor = async () => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/delete-doctor/${selectedDoctorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDoctors(doctors.filter((doctor) => doctor._id !== selectedDoctorId));
      message.success(result?.data?.message);
    } catch (error) {
      message.error("Failed to delete doctor");
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "No.", accessor: (_, index) => index + 1 },
      {
        Header: "Doctor Name",
        accessor: "firstName",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            {row.original.profilePhoto ? (
              <img
                src={`${import.meta.env.VITE_API_URL}${row.original.profilePhoto}`}
                className="img-shadow img-2x rounded-5 me-2"
                alt={`${row.original.firstName} ${row.original.lastName || ""}`}
                width={30}
                height={30}
                onError={(e) => (e.target.src = "/assets/images/patient.png")} // Fallback to static image if loading fails
              />
            ) : (
              <AccountCircleIcon
                className="me-2"
                style={{ fontSize: "30px", color: "#757575" }}
              />
            )}
            {`${row.original.firstName} ${row.original.lastName || ""}`}
          </div>
        ),
      },
      { Header: "Mobile", accessor: "mobile" },
      {
        Header: "Email",
        accessor: (row) => (
          <>
            <HiOutlineMail className="me-2 text-primary" /> {row.email}
          </>
        ),
      },
      {
        Header: "Department",
        accessor: (row) => row.specialization?.department || "N/A",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-inline-flex gap-2">
            <a
              href={`/patient/view-doctor-profile/${row.original._id}`}
              className="btn btn-sm btn-primary"
            >
              <RiEyeLine /> View
            </a>
            {/* Uncomment if patients should have delete functionality */}
            {/* <button
              className="btn btn-sm btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#delRow"
              onClick={() => setSelectedDoctorId(row.original._id)}
            >
              <RiDeleteBin6Line /> Delete
            </button> */}
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data: doctors },
    useGlobalFilter,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter, state } = tableInstance;

  return (
    <div className="page-wrapper">
      <Topbar />
      <div className="main-container">
        <Sidebar />
        <div className="app-container">
          <div className="app-hero-header d-flex align-items-center">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <RiHome8Line className="lh-1 pe-3 me-3 border-end" />
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item text-primary" aria-current="page">
                Doctors List
              </li>
            </ol>
          </div>
          <div className="app-body">
            <div className="row gx-3">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="card-title">
                      <FaUserMd className="me-2" /> Doctors List
                    </h5>
                    <div className="d-flex align-items-center gap-3">
                      <FaFilter className="text-secondary" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={state.globalFilter || ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                      />
                      <RiSearchLine className="text-primary" />
                    </div>
                  </div>
                  {loading ? (
                    <div className="d-flex justify-content-center py-5">
                      <Spin size="large" />
                    </div>
                  ) : doctors.length === 0 ? (
                    <h6 className="text-gray-500 text-center py-5">
                      No doctors found
                    </h6>
                  ) : (
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table truncate m-0 align-middle" {...getTableProps()}>
                          <thead>
                            {headerGroups.map((headerGroup) => (
                              <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                      {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                    </span>
                                  </th>
                                ))}
                              </tr>
                            ))}
                          </thead>
                          <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                              prepareRow(row);
                              return (
                                <tr {...row.getRowProps()}>
                                  {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* Delete confirmation modal */}
                  <div className="modal fade" id="delRow" tabIndex={-1} aria-hidden="true">
                    <div className="modal-dialog modal-sm">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Confirm</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                          Are you sure you want to delete this doctor?
                        </div>
                        <div className="modal-footer">
                          <button className="btn btn-outline-secondary" data-bs-dismiss="modal">
                            No
                          </button>
                          <button
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={deleteDoctor}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {contextHolder}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctorByPatient;