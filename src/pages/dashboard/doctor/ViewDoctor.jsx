// import React, { useEffect, useState } from "react";
// import { useTable, useSortBy, useGlobalFilter } from "react-table";
// import axios from "axios";
// import { Spin, notification,message } from "antd";
// import Topbar from "../../../components/Topbar";
// import Sidebar from "../../../components/Sidebar";

// const ViewDoctor = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedDoctorId, setSelectedDoctorId] = useState(null);
//   const [api, contextHolder] = notification.useNotification();

//   useEffect(() => {
//     fetchDoctors();
//   }, []);


//   const openNotification = (status, title, desc) => {
//     console.log(title);
//     if (status == true) {
//       api.success({
//         message: title,
//         description: desc,
//       });
//     } else {
//       api.error({
//         message: title,
//         description: desc,
//       });
//     }
//   };

//   const fetchDoctors = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/admin/get-doctor`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
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
//       console.log("Deleting doctor with ID:", selectedDoctorId);
//       const result=await axios.delete(`${import.meta.env.VITE_API_URL}/admin/delete-doctor/${selectedDoctorId}`,{
//                   headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                   },
//                 });
//       setDoctors(doctors.filter(doctor => doctor._id !== selectedDoctorId));
     
//       // openNotification(result?.data?.status, result?.data?.message, result?.data?.desc);
//       message.success(result?.data?.message);
    
//     } catch (error) {
//       console.error("Error deleting doctor:", error);
//       // api.error({ message: "Failed to delete doctor" });
//       message.error("Failed to delete doctor");
//     }
//   };

//   const columns = React.useMemo(
//     () => [
//       { Header: "No.", accessor: (_, index) => index + 1 },
//       { Header: "Doctor Name", accessor: "firstName" },
//       { Header: "Gender", accessor: "gender" },
//       { Header: "Experience", accessor: "experience" },
//       { Header: "Mobile", accessor: "mobile" },
//       { Header: "Email", accessor: "email" },
//       {
//         Header: "Actions",
//         accessor: "actions",
//         Cell: ({ row }) => (
//           <div className="d-inline-flex gap-1">
//             <button
//               className="btn btn-outline-danger btn-sm"
//               data-bs-toggle="modal"
//               data-bs-target="#delRow"
//               onClick={() => setSelectedDoctorId(row.original._id)}
//             >
//               <i className="ri-delete-bin-line" />
//             </button>
//             <a href={`/edit-doctor/${row.original._id}`} className="btn btn-outline-success btn-sm">
//               <i className="ri-edit-box-line" />
//             </a>
//             <a href={`/doctor/${row.original._id}`} className="btn btn-outline-info btn-sm">
//               <i className="ri-eye-line" />
//             </a>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const tableInstance = useTable(
//     {
//       columns,
//       data: doctors,
//     },
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
//                 <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
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
//                     <h5 className="card-title">Doctors List</h5>
//                     <div className="d-flex align-items-center gap-5">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search..."
//                         value={state.globalFilter || ""}
//                         onChange={(e) => setGlobalFilter(e.target.value)}
//                       />
//                       <a href="/add-doctor" className="btn btn-primary ms-auto">
//                         Add Doctor
//                       </a>
//                     </div>
//                   </div>
//                   {doctors.length === 0 ? (<>
//                   <h6 className="text-gray-500 text-center">Empty Doctor List</h6></>):(<>
//                    <div className="card-body">
//                    <div className="table-responsive">
//                      <Spin spinning={loading} size="large">
//                        <table className="table truncate m-0 align-middle" {...getTableProps()}>
//                          <thead>
//                            {headerGroups.map(headerGroup => (
//                              <tr {...headerGroup.getHeaderGroupProps()}>
//                                {headerGroup.headers.map(column => (
//                                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                                    {column.render("Header")}
//                                    <span>
//                                      {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
//                                    </span>
//                                  </th>
//                                ))}
//                              </tr>
//                            ))}
//                          </thead>
//                          <tbody {...getTableBodyProps()}>
//                            {rows.map(row => {
//                              prepareRow(row);
//                              return (
//                                <tr {...row.getRowProps()}>
//                                  {row.cells.map(cell => (
//                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                                  ))}
//                                </tr>
//                              );
//                            })}
//                          </tbody>
//                        </table>
//                      </Spin>
//                    </div>
//                    <div className="modal fade" id="delRow" tabIndex={-1} aria-hidden="true">
//                      <div className="modal-dialog modal-sm">
//                        <div className="modal-content">
//                          <div className="modal-header">
//                            <h5 className="modal-title">Confirm</h5>
//                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
//                          </div>
//                          <div className="modal-body">Are you sure you want to delete this doctor?</div>
//                          <div className="modal-footer">
//                            <button className="btn btn-outline-secondary" data-bs-dismiss="modal">No</button>
//                            <button className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteDoctor}>Yes</button>
//                          </div>
//                        </div>
//                      </div>
//                    </div>
//                  </div>
//                   </>)}
                 


//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewDoctor;





import React, { useEffect, useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import axios from "axios";
import { Spin, notification, message } from "antd";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Default icon for missing profile photo

const ViewDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const openNotification = (status, title, desc) => {
    console.log(title);
    if (status === true) {
      api.success({
        message: title,
        description: desc,
      });
    } else {
      api.error({
        message: title,
        description: desc,
      });
    }
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/get-doctor`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      console.log("Deleting doctor with ID:", selectedDoctorId);
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
      console.error("Error deleting doctor:", error);
      message.error("Failed to delete doctor");
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "No.", accessor: (_, index) => index + 1 },
      {
        Header: "Profile",
        accessor: "profilePhoto",
        Cell: ({ row }) =>
          row.original.profilePhoto ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${row.original.profilePhoto}`} // Full URL to uploaded image
              alt={`${row.original.firstName} ${row.original.lastName || ""}`}
              style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
              onError={(e) => (e.target.src = "/path/to/default-image.png")} // Optional fallback image
            />
          ) : (
            <AccountCircleIcon style={{ fontSize: "50px", color: "#757575" }} /> // Default icon
          ),
      },
      {
        Header: "Doctor Name",
        accessor: "firstName",
        Cell: ({ row }) => `${row.original.firstName} ${row.original.lastName || ""}`,
      },
      { Header: "Gender", accessor: "gender" },
      { Header: "Experience", accessor: "experience" },
      { Header: "Mobile", accessor: "mobile" },
      { Header: "Email", accessor: "email" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-inline-flex gap-1">
            <button
              className="btn btn-outline-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#delRow"
              onClick={() => setSelectedDoctorId(row.original._id)}
            >
              <i className="ri-delete-bin-line" />
            </button>
            <a href={`/edit-doctor/${row.original._id}`} className="btn btn-outline-success btn-sm">
              <i className="ri-edit-box-line" />
            </a>
            <a href={`/doctor/${row.original._id}`} className="btn btn-outline-info btn-sm">
              <i className="ri-eye-line" />
            </a>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: doctors,
    },
    useGlobalFilter,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter, state } = tableInstance;

  return (
    <>
      {contextHolder}
      <div className="page-wrapper">
        <Topbar />
        <div className="main-container">
          <Sidebar />
          <div className="app-container">
            <div className="app-hero-header d-flex align-items-center">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <i className="ri-home-8-line lh-1 pe-3 me-3 border-end" />
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
                      <h5 className="card-title">Doctors List</h5>
                      <div className="d-flex align-items-center gap-5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          value={state.globalFilter || ""}
                          onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                        <a href="/add-doctor" className="btn btn-primary ms-auto">
                          Add Doctor
                        </a>
                      </div>
                    </div>
                    {doctors.length === 0 ? (
                      <h6 className="text-gray-500 text-center p-4">Empty Doctor List</h6>
                    ) : (
                      <div className="card-body">
                        <div className="table-responsive">
                          <Spin spinning={loading} size="large">
                            <table className="table truncate m-0 align-middle" {...getTableProps()}>
                              <thead>
                                {headerGroups.map((headerGroup) => (
                                  <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
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
                          </Spin>
                        </div>
                        <div className="modal fade" id="delRow" tabIndex={-1} aria-hidden="true">
                          <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Confirm</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" />
                              </div>
                              <div className="modal-body">Are you sure you want to delete this doctor?</div>
                              <div className="modal-footer">
                                <button className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  No
                                </button>
                                <button className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteDoctor}>
                                  Yes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDoctor;
