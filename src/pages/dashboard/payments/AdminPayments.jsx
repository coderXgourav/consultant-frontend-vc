import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { Spin, message } from "antd";
import Chart from "react-apexcharts";

const AdminPayments = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(""); // Track the field being sorted
  const [sortOrder, setSortOrder] = useState("asc"); // Track the sorting order

  const [messageApi, contextHolder] = message.useMessage();

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const fetchPatients = async () => {
    setLoading(true);
    // Static data added
    const staticData = [
      { invoiceNo: "INV001", patientName: "John Doe", paymentType: "Credit", paidDate: "2025-01-10", paidAmount: 150, status: "Completed" },
      { invoiceNo: "INV002", patientName: "Jane Smith", paymentType: "Cash", paidDate: "2025-01-12", paidAmount: 200, status: "Pending" },
      { invoiceNo: "INV003", patientName: "Michael Brown", paymentType: "Debit", paidDate: "2025-01-14", paidAmount: 120, status: "Completed" },
      { invoiceNo: "INV004", patientName: "Emily Clark", paymentType: "Credit", paidDate: "2025-01-15", paidAmount: 250, status: "Pending" },
    ];
    setPatients(staticData);
    setFilteredPatients(staticData); // Initialize with all patients
    setLoading(false);
  };

  // Handle sorting
  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedData = [...filteredPatients].sort((a, b) => {
      if (a[field] < b[field]) return newSortOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newSortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredPatients(sortedData);
  };

  // Handle search
// Handle search
const handleSearch = (e) => {
  const value = e.target.value.toLowerCase();
  setSearchTerm(value);
  const filtered = patients.filter((patient) =>
    patient.patientName.toLowerCase().includes(value) || 
    patient.invoiceNo.toLowerCase().includes(value)  // Added this condition to check invoice number
  );
  setFilteredPatients(filtered);
};

  // Sorting arrows logic
  const getSortIcon = (field) => {
    if (sortField === field) {
      return (
        <span style={{ color: "#116af0", marginLeft: "5px" }}>
          {sortOrder === "asc" ? "▲" : "▼"}
        </span>
      );
    }
    return null;
  };

  var options = {
    chart: {
      height: 300,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    series: [
      {
        name: "Payments",
        data: [10, 40, 15, 40, 20, 35, 20, 10, 31, 43, 56, 29],
      },
    ],
    grid: {
      borderColor: "#d8dee6",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 10,
        left: 0,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    colors: ["#116aef", "#ce313e", "#436ccf", "#dcad10", "#828382"],
    markers: {
      size: 0,
      opacity: 0.3,
      colors: ["#116aef", "#ce313e", "#436ccf", "#dcad10", "#828382"],
      strokeColor: "#ffffff",
      strokeWidth: 1,
      hover: {
        size: 7,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$" + val + "k";
        },
      },
    },
  };

  var series = [
    {
      name: "Payments",
      data: [10, 40, 15, 40, 20, 35, 20, 10, 31, 43, 56, 29],
    },
  ];

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <Topbar />
        <div className="main-container">
          <Sidebar />
          <div className="app-container">
            <div className="app-hero-header d-flex align-items-center">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <i className="ri-home-8-line lh-1 pe-3 me-3 border-end"></i>
                  <a href="index-2.html">Home</a>
                </li>
                <li className="breadcrumb-item text-primary" aria-current="page">
                  Payments
                </li>
              </ol>
            </div>

            <div className="app-body">
              <div className="row gx-3">
                <div className="col-sm-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Payments by Month</h5>
                    </div>
                    <div className="card-body">
                      <div className="chart-height-lg">
                        <div id="payments">
                          <Chart
                            options={options}
                            series={series}
                            type="bar"
                            height={300}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row gx-3">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Summary</h5>
                    </div>
                    <div className="card-body">
                      <input style={{ width: "30%" }}
                        type="text"
                        placeholder="Search by Patient Name"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-control mb-3"
                      />
                      <div className="table-responsive">
                        <table id="customButtons" className="table m-0 align-middle">
                          <thead>
                            <tr>
                              <th
                                onClick={() => handleSort("invoiceNo")}
                                style={{ cursor: "pointer" }}
                              >
                                Invoice {getSortIcon("invoiceNo")}
                              </th>
                              <th
                                onClick={() => handleSort("patientName")}
                                style={{ cursor: "pointer" }}
                              >
                                Patient Name {getSortIcon("patientName")}
                              </th>
                              <th
                                onClick={() => handleSort("paymentType")}
                                style={{ cursor: "pointer" }}
                              >
                                Payment Type {getSortIcon("paymentType")}
                              </th>
                              <th
                                onClick={() => handleSort("paidDate")}
                                style={{ cursor: "pointer" }}
                              >
                                Paid Date {getSortIcon("paidDate")}
                              </th>
                              <th
                                onClick={() => handleSort("paidAmount")}
                                style={{ cursor: "pointer" }}
                              >
                                Paid Amount {getSortIcon("paidAmount")}
                              </th>
                              <th
                                onClick={() => handleSort("status")}
                                style={{ cursor: "pointer" }}
                              >
                                Status {getSortIcon("status")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <td colSpan={6} style={{ textAlign: "center" }}>
                                <Spin spinning={loading} size="large"></Spin>
                              </td>
                            ) : filteredPatients.length > 0 ? (
                              filteredPatients.map((patient, index) => (
                                <tr key={patient.invoiceNo}>
                                  <td>{patient.invoiceNo}</td>
                                  <td>{patient.patientName}</td>
                                  <td>{patient.paymentType}</td>
                                  <td>{new Date(patient.paidDate).toLocaleDateString()}</td>
                                  <td>{patient.paidAmount}</td>
                                  <td>
                                    <span
                                      style={{
                                        color: patient.status === "Completed" ? "green" : "red",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {patient.status === "Completed" ? "Paid" : "Unpaid"}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={6}>No data found</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {contextHolder}
    </>
  );
};

export default AdminPayments;



// import { useEffect, useState } from "react";
// import Sidebar from "../../../components/Sidebar";
// import Topbar from "../../../components/Topbar";
// import axios from "axios";
// import { Spin, message } from "antd";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import Chart from "react-apexcharts";
// const AdminPayments =()=>{
//     const [loading, setLoading] = useState(false);
//     const [patients, setPatients] = useState([]);
//     const [selectedPatientId, setSelectedPatientId] = useState(null);
  
//     const token = localStorage.getItem("token");
  
//     const [messageApi, contextHolder] = message.useMessage();
  
//     const success = (message) => {
//       messageApi.open({
//         type: "success",
//         content: message,
//       });
//     };
  
//     const error = (message) => {
//       messageApi.open({
//         type: "error",
//         content: message,
//       });
//     };
  
//     const fetchPatients = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/patient/get-patient`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setPatients(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         error(err.message);
//         setLoading(false);
//       }
//     };
  
//     const handleDeletePatient = async () => {
//       setLoading(true);
//       try {
//         const result = await axios.delete(
//           `${
//             import.meta.env.VITE_API_URL
//           }/patient/delete-patient/${selectedPatientId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const { message } = result.data;
//         success(message);
//         setPatients((prev) =>
//           prev.filter((patient) => patient._id !== selectedPatientId)
//         );
//         setSelectedPatientId(null);
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         error(err.message);
//       }
//     };
  
//     useEffect(() => {
//       fetchPatients();
//     }, [0]);



//     var options = {
//       chart: {
//         height: 300,
//         type: "bar",
//         toolbar: {
//           show: false,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "smooth",
//         width: 3,
//       },
//       plotOptions: {
//         bar: {
//           columnWidth: "30%",
//         },
//       },
//       series: [
//         {
//           name: "Payments",
//           data: [10, 40, 15, 40, 20, 35, 20, 10, 31, 43, 56, 29],
//         },
//       ],
//       grid: {
//         borderColor: "#d8dee6",
//         strokeDashArray: 5,
//         xaxis: {
//           lines: {
//             show: true,
//           },
//         },
//         yaxis: {
//           lines: {
//             show: false,
//           },
//         },
//         padding: {
//           top: 0,
//           right: 0,
//           bottom: 10,
//           left: 0,
//         },
//       },
//       xaxis: {
//         categories: [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ],
//       },
//       yaxis: {
//         labels: {
//           show: false,
//         },
//       },
//       colors: ["#116aef", "#ce313e", "#436ccf", "#dcad10", "#828382"],
//       markers: {
//         size: 0,
//         opacity: 0.3,
//         colors: ["#116aef", "#ce313e", "#436ccf", "#dcad10", "#828382"],
//         strokeColor: "#ffffff",
//         strokeWidth: 1,
//         hover: {
//           size: 7,
//         },
//       },
//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return "$" + val + "k";
//           },
//         },
//       },
//     };
    
// var series= [
//   {
//     name: "Payments",
//     data: [10, 40, 15, 40, 20, 35, 20, 10, 31, 43, 56, 29],
//   },
// ]
    
//     return <>

//      <div className="page-wrapper">
//         <Topbar />
//         <div className="main-container">
//           <Sidebar />
//           <div class="app-container">

        
//           <div class="app-hero-header d-flex align-items-center">

          
//             <ol class="breadcrumb">
//               <li class="breadcrumb-item">
//                 <i class="ri-home-8-line lh-1 pe-3 me-3 border-end"></i>
//                 <a href="index-2.html">Home</a>
//               </li>
//               <li class="breadcrumb-item text-primary" aria-current="page">
//                 Payments
//               </li>
//             </ol>
          

          
//             <div class="ms-auto d-lg-flex d-none flex-row">
//               <div class="d-flex flex-row gap-1 day-sorting">
//                 <button class="btn btn-sm btn-primary">Today</button>
//                 <button class="btn btn-sm">7d</button>
//                 <button class="btn btn-sm">2w</button>
//                 <button class="btn btn-sm">1m</button>
//                 <button class="btn btn-sm">3m</button>
//                 <button class="btn btn-sm">6m</button>
//                 <button class="btn btn-sm">1y</button>
//               </div>
//             </div>
         

//           </div>
        

         
//           <div class="app-body">

//             <div class="row gx-3">
//               <div class="col-sm-12">
//                 <div class="card mb-3">
//                   <div class="card-header">
//                     <h5 class="card-title">Payments by Month</h5>
//                   </div>
//                   <div class="card-body">

//                     <div class="chart-height-lg">
//                       <div id="payments"><Chart options={options} series={series} type="bar" height={300} /></div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </div>
          

    
//             <div class="row gx-3">
//               <div class="col-sm-12">
     
//                 <div class="card">
//                   <div class="card-header">
//                     <h5 class="card-title">Summary</h5>
//                   </div>
//                   <div class="card-body">

//                     <div class="table-responsive">
//                       <table id="customButtons" class="table m-0 align-middle">
//                         <thead>
//                           <tr>
//                             <th>#</th>
//                             <th>Invoice No.</th>
//                             <th>Patient Name</th>
//                             <th>Payment Type</th>
//                             <th>Paid Date</th>
//                             <th>Paid Amount</th>
//                             <th>Status</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>1</td>
//                             <td>#000988</td>
//                             <td>Trugex Malin</td>
//                             <td>PayPal</td>
//                             <td>02/05/2024</td>
//                             <td>$2590.00</td>
//                             <td><span class="badge bg-success">Paid</span></td>
//                           </tr>
//                           <tr>
//                             <td>2</td>
//                             <td>#000927</td>
//                             <td>Serge Baldwin</td>
//                             <td>Credit Card</td>
//                             <td>14/05/2024</td>
//                             <td>$3470.00</td>
//                             <td><span class="badge bg-success">Paid</span></td>
//                           </tr>
//                           <tr>
//                             <td>3</td>
//                             <td>#000763</td>
//                             <td>Zenaida Frank</td>
//                             <td>Debit Card</td>
//                             <td>22/04/2024</td>
//                             <td>$7630.00</td>
//                             <td><span class="badge bg-danger">Unpaid</span></td>
//                           </tr>
//                           <tr>
//                             <td>4</td>
//                             <td>#000876</td>
//                             <td>Henriq Agas</td>
//                             <td>Credit Card</td>
//                             <td>22/04/2024</td>
//                             <td>$7630.00</td>
//                             <td><span class="badge bg-success">Paid</span></td>
//                           </tr>
//                           <tr>
//                             <td>5</td>
//                             <td>#000839</td>
//                             <td>Kelly James</td>
//                             <td>Debit Card</td>
//                             <td>26/05/2024</td>
//                             <td>$2231.00</td>
//                             <td><span class="badge bg-success">Paid</span></td>
//                           </tr>
//                           <tr>
//                             <td>6</td>
//                             <td>#000786</td>
//                             <td>Carl Jampa</td>
//                             <td>PayPal</td>
//                             <td>17/05/2024</td>
//                             <td>$4532.00</td>
//                             <td><span class="badge bg-success">Paid</span></td>
//                           </tr>
//                           <tr>
//                             <td>7</td>
//                             <td>#000762</td>
//                             <td>Hameed Khan</td>
//                             <td>Credit Card</td>
//                             <td>23/06/2024</td>
//                             <td>$4539.00</td>
//                             <td><span class="badge bg-success">Paid</span></td>
//                           </tr>
//                           <tr>
//                             <td>8</td>
//                             <td>#000645</td>
//                             <td>Paul Miller</td>
//                             <td>Credit Card</td>
//                             <td>28/05/2024</td>
//                             <td>$6579.00</td>
//                             <td><span class="badge bg-danger">Unpaid</span></td>
//                           </tr>
//                           <tr>
//                             <td>9</td>
//                             <td>#000876</td>
//                             <td>Robert Francis</td>
//                             <td>Debit Card</td>
//                             <td>29/04/2024</td>
//                             <td>$3324.00</td>
//                             <td><span class="badge bg-success">Paid</span></td>
//                           </tr>
//                           <tr>
//                             <td>10</td>
//                             <td>#000767</td>
//                             <td>Edison Lee</td>
//                             <td>Credit Card</td>
//                             <td>14/05/2024</td>
//                             <td>$8719.00</td>
//                             <td><span class="badge bg-success">Paid</span></td>
//                           </tr>
//                           <tr>
//                             <td>11</td>
//                             <td>#000522</td>
//                             <td>Saul Lane</td>
//                             <td>Credit Card</td>
//                             <td>10/03/2024</td>
//                             <td>$6574.00</td>
//                             <td><span class="badge bg-success">Paid</span></td>
//                           </tr>
//                           <tr>
//                             <td>12</td>
//                             <td>#000382</td>
//                             <td>Antonia Larson</td>
//                             <td>Credit Card</td>
//                             <td>02/06/2024</td>
//                             <td>$3219.00</td>
//                             <td><span class="badge bg-danger">Unpaid</span></td>
//                           </tr>
//                           <tr>
//                             <td>13</td>
//                             <td>#000765</td>
//                             <td>Neal Werner</td>
//                             <td>Credit Card</td>
//                             <td>17/05/2024</td>
//                             <td>$3324.00</td>
//                             <td><span class="badge bg-danger">Unpaid</span></td>
//                           </tr>
//                           <tr>
//                             <td>14</td>
//                             <td>#000799</td>
//                             <td>Mariano Hooper</td>
//                             <td>PayPal</td>
//                             <td>22/06/2024</td>
//                             <td>$2134.00</td>
//                             <td><span class="badge bg-danger">Unpaid</span></td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
                  

//                   </div>
//                 </div>
            

//               </div>
//             </div>
         

//           </div>
        
          
     

//         </div>
//         </div>
//       </div>
//     </>
// }
// export default AdminPayments