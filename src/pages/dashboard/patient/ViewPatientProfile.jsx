import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import axios from "axios";
import { Spin, message } from "antd"; // Import Spin from Ant Design
import Chart from "react-apexcharts";
import MedicalExpensesChart from "./MedicalInsuranceChart";
import InsuranceClaimsChart from "./HealthInsuranceChart";
import HealthActivityChart from "./HealthActivityChart";
const ViewPatientProfile = () => {
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const token = localStorage.getItem("token");

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
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/patient/get-patient`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPatients(response.data.data);
            setLoading(false);
        } catch (err) {
            error(err.message);
            setLoading(false);
        }
    };

    const handleDeletePatient = async () => {
        setLoading(true);
        try {
            const result = await axios.delete(
                `${import.meta.env.VITE_API_URL
                }/patient/delete-patient/${selectedPatientId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { message } = result.data;
            success(message);
            setPatients((prev) =>
                prev.filter((patient) => patient._id !== selectedPatientId)
            );
            setSelectedPatientId(null);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            error(err.message);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, [0]);



      const BPChart = () => {
        const options = {
          chart: {
            height: 100,
            type: "area",
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
            width: 3,
          },
          grid: {
            show: false,
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          colors: ["#ff3939"],
          tooltip: {
            y: {
              formatter: (val) => val,
            },
          },
        };
      
        const series = [
          {
            name: "BP Level",
            data: [100, 140, 120, 150, 130, 160],
          },
        ];
      
        return <Chart options={options} series={series} type="area" height={100} />;
      };
      
      const SugarChart = () => {
        const options = {
          chart: {
            height: 100,
            type: "area",
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
            width: 3,
          },
          grid: {
            show: false,
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          colors: ["#28a8f6"],
          tooltip: {
            y: {
              formatter: (val) => val,
            },
          },
        };
      
        const series = [
          {
            name: "Sugar Level",
            data: [100, 140, 120, 150, 130, 160],
          },
        ];
      
        return <Chart options={options} series={series} type="area" height={100} />;
      };
      
      const HeartRateChart = () => {
        const options = {
          chart: {
            height: 100,
            type: "area",
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
            width: 3,
          },
          grid: {
            show: false,
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          colors: ["#02b86f"],
          tooltip: {
            y: {
              formatter: (val) => val,
            },
          },
        };
      
        const series = [
          {
            name: "Heart Rate",
            data: [100, 140, 120, 150, 130, 160],
          },
        ];
      
        return <Chart options={options} series={series} type="area" height={100} />;
      };
      
      const CholesterolChart = () => {
        const options = {
          chart: {
            height: 100,
            type: "area",
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
            width: 3,
          },
          grid: {
            show: false,
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          colors: ["#f1b15b"],
          tooltip: {
            y: {
              formatter: (val) => val,
            },
          },
        };
      
        const series = [
          {
            name: "Cholesterol",
            data: [100, 140, 120, 150, 130, 160],
          },
        ];
      
        return <Chart options={options} series={series} type="area" height={100} />;
      };



    return (
        <>
            {contextHolder}
            <div className="page-wrapper">
                <Topbar />
                <div className="main-container">
                    <Sidebar />
                    <div class="app-container">


                        <div class="app-hero-header d-flex align-items-center">


                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <i class="ri-home-8-line lh-1 pe-3 me-3 border-end"></i>
                                    <a href="index-2.html">Home</a>
                                </li>
                                <li class="breadcrumb-item text-primary" aria-current="page">
                                    Patients Dashboard
                                </li>
                            </ol>

                            <div class="ms-auto d-lg-flex d-none flex-row">
                                <div class="d-flex flex-row gap-1 day-sorting">
                                    <button class="btn btn-sm btn-primary">Today</button>
                                    <button class="btn btn-sm">7d</button>
                                    <button class="btn btn-sm">2w</button>
                                    <button class="btn btn-sm">1m</button>
                                    <button class="btn btn-sm">3m</button>
                                    <button class="btn btn-sm">6m</button>
                                    <button class="btn btn-sm">1y</button>
                                </div>
                            </div>


                        </div>

                        <div class="app-body">


                            <div class="row gx-3">
                                <div class="col-sm-12">
                                    <div class="card mb-3">
                                        <div class="card-body">

                                            <div class="d-flex ">

                                                <div class="d-flex align-items-center flex-wrap gap-4">
                                                    <div class="d-flex align-items-center">
                                                        <div class="icon-box lg bg-primary rounded-5 me-2">
                                                            <i class="ri-account-circle-line fs-3"></i>
                                                        </div>
                                                        <div>
                                                            <h4 class="mb-1">Carole</h4>
                                                            <p class="m-0">Patient Name</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <div class="icon-box lg bg-primary rounded-5 me-2">
                                                            <i class="ri-women-line fs-3"></i>
                                                        </div>
                                                        <div>
                                                            <h4 class="mb-1">Female</h4>
                                                            <p class="m-0">Gender</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <div class="icon-box lg bg-primary rounded-5 me-2">
                                                            <i class="ri-arrow-right-up-line fs-3"></i>
                                                        </div>
                                                        <div>
                                                            <h4 class="mb-1">68</h4>
                                                            <p class="m-0">Patient Age</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <div class="icon-box lg bg-primary rounded-5 me-2">
                                                            <i class="ri-contrast-drop-2-line fs-3"></i>
                                                        </div>
                                                        <div>
                                                            <h4 class="mb-1">O+</h4>
                                                            <p class="m-0">Blood Type</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <div class="icon-box lg bg-secondary rounded-5 me-2">
                                                            <i class="ri-stethoscope-line fs-3 text-body"></i>
                                                        </div>
                                                        <div>
                                                            <h4 class="mb-1">Dr. David</h4>
                                                            <p class="m-0">Consulting Doctor</p>
                                                        </div>
                                                    </div>
                                                </div>


                                                <img src="/assets/images/patient.png"
                                                    class="img-7x rounded-circle ms-auto"
                                                    alt="Patient Admin Template" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row gx-3">
                                <div class="col-xxl-3 col-sm-6 col-12">
                                    <div class="card mb-3">
                                        <div class="card-body">
                                            <div class="text-center">
                                                <div class="icon-box md bg-danger rounded-5 m-auto">
                                                    <i class="ri-capsule-line fs-3"></i>
                                                </div>
                                                <div class="mt-3">
                                                    <h5>BP Levels</h5>
                                                    <p class="m-0 opacity-50">Recent five visits</p>
                                                </div>
                                            </div>
                                            <div id="bpLevels"><BPChart/></div>
                                            <ul class="list-group">
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>24/04/2024</div>
                                                    <div>140</div>
                                                </li>
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>16/04/2024</div>
                                                    <div>190</div>
                                                </li>
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>10/04/2024</div>
                                                    <div>230</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-sm-6 col-12">
                                    <div class="card mb-3">
                                        <div class="card-body">
                                            <div class="text-center">
                                                <div class="icon-box md bg-info rounded-5 m-auto">
                                                    <i class="ri-contrast-drop-2-line fs-3"></i>
                                                </div>
                                                <div class="mt-3">
                                                    <h5>Sugar Levels</h5>
                                                    <p class="m-0 opacity-50">Recent five visits</p>
                                                </div>
                                            </div>
                                            <div id="sugarLevels"><SugarChart/></div>
                                            <ul class="list-group">
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>24/04/2024</div>
                                                    <div>140</div>
                                                </li>
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>16/04/2024</div>
                                                    <div>190</div>
                                                </li>
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>10/04/2024</div>
                                                    <div>230</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-sm-6 col-12">
                                    <div class="card mb-3">
                                        <div class="card-body">
                                            <div class="text-center">
                                                <div class="icon-box md bg-success rounded-5 m-auto">
                                                    <i class="ri-heart-pulse-line fs-3"></i>
                                                </div>
                                                <div class="mt-3">
                                                    <h5>Heart Rate</h5>
                                                    <p class="m-0 opacity-50">Recent five visits</p>
                                                </div>
                                            </div>
                                            <div id="heartRate"><HeartRateChart/></div>
                                            <ul class="list-group">
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>24/04/2024</div>
                                                    <div>110</div>
                                                </li>
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>16/04/2024</div>
                                                    <div>120</div>
                                                </li>
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>10/04/2024</div>
                                                    <div>100</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-sm-6 col-12">
                                    <div class="card mb-3">
                                        <div class="card-body">
                                            <div class="text-center">
                                                <div class="icon-box md bg-warning rounded-5 m-auto">
                                                    <i class="ri-flask-line fs-3"></i>
                                                </div>
                                                <div class="mt-3">
                                                    <h5>Clolesterol</h5>
                                                    <p class="m-0 opacity-50">Recent five visits</p>
                                                </div>
                                            </div>
                                            <div id="clolesterolLevels"><CholesterolChart/></div>
                                            <ul class="list-group">
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>24/04/2024</div>
                                                    <div>180</div>
                                                </li>
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>16/04/2024</div>
                                                    <div>220</div>
                                                </li>
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>10/04/2024</div>
                                                    <div>230</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row gx-3">
                                <div class="col-xl-6 col-sm-12">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <h5 class="card-title">Health Insurance Claims</h5>
                                        </div>
                                        <div class="card-body">
                                            <div id="insuranceClaims"><InsuranceClaimsChart/></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-sm-12">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <h5 class="card-title">My Medical Expenses</h5>
                                        </div>
                                        <div class="card-body">
                                            <div id="medicalExpenses"><MedicalExpensesChart/></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-sm-12">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <h5 class="card-title">Doctor Visits</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="table-outer">
                                                <div class="table-responsive">
                                                    <table class="table align-middle truncate m-0">
                                                        <thead>
                                                            <tr>
                                                                <th>Doctor</th>
                                                                <th>Date</th>
                                                                <th>Department</th>
                                                                <th>Reports</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <img src="/assets/images/user1.png"
                                                                        class="img-3x rounded-2"
                                                                        alt="Medical Dashboard" /> Dr.
                                                                    Hector
                                                                </td>
                                                                <td>20/05/2024</td>
                                                                <td>
                                                                    Dentist
                                                                </td>
                                                                <td>
                                                                    <div class="d-inline-flex gap-1">
                                                                        <button class="btn btn-danger btn-sm"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#viewReportsModal1">
                                                                            View Reports
                                                                        </button>
                                                                        <button class="btn btn-info btn-sm"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            data-bs-title="Download Report">
                                                                            <i class="ri-file-download-line"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <img src="/assets/images/user5.png"
                                                                        class="img-3x rounded-2"
                                                                        alt="Medical Dashboard" /> Dr.
                                                                    Mitchel
                                                                </td>
                                                                <td>20/05/2024</td>
                                                                <td>
                                                                    Urologist
                                                                </td>
                                                                <td>
                                                                    <div class="d-inline-flex gap-1">
                                                                        <button class="btn btn-danger btn-sm"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#viewReportsModal1">
                                                                            View Reports
                                                                        </button>
                                                                        <button class="btn btn-info btn-sm"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            data-bs-title="Download Report">
                                                                            <i class="ri-file-download-line"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <img src="/assets/images/user3.png"
                                                                        class="img-3x rounded-2"
                                                                        alt="Medical Dashboard" /> Dr.
                                                                    Fermin
                                                                </td>
                                                                <td>18/03/2024</td>
                                                                <td>
                                                                    Surgeon
                                                                </td>
                                                                <td>
                                                                    <div class="d-inline-flex gap-1">
                                                                        <button class="btn btn-danger btn-sm"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#viewReportsModal1">
                                                                            View Reports
                                                                        </button>
                                                                        <button class="btn btn-info btn-sm"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            data-bs-title="Download Report">
                                                                            <i class="ri-file-download-line"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-sm-12">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <h5 class="card-title">Reports</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="table-outer">
                                                <div class="table-responsive">
                                                    <table class="table align-middle truncate m-0">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>File</th>
                                                                <th>Reports Link</th>
                                                                <th>Date</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>
                                                                    <div class="icon-box md bg-primary rounded-2">
                                                                        <i class="ri-file-excel-2-line"></i>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#!"
                                                                        class="link-primary text-truncate">Reports 1
                                                                        clinical
                                                                        documentation</a>
                                                                </td>
                                                                <td>May-28, 2024</td>
                                                                <td>
                                                                    <div class="d-inline-flex gap-1">
                                                                        <button class="btn btn-danger btn-sm"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delRow">
                                                                            <i class="ri-delete-bin-line"></i>
                                                                        </button>
                                                                        <button class="btn btn-info btn-sm"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            data-bs-title="Download Report">
                                                                            <i class="ri-file-download-line"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>
                                                                    <div class="icon-box md bg-primary rounded-2">
                                                                        <i class="ri-file-excel-2-line"></i>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#!"
                                                                        class="link-primary text-truncate">Reports 2
                                                                        random files
                                                                        documentation</a>
                                                                </td>
                                                                <td>Mar-20, 2024</td>
                                                                <td>
                                                                    <div class="d-inline-flex gap-1">
                                                                        <button class="btn btn-danger btn-sm"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delRow">
                                                                            <i class="ri-delete-bin-line"></i>
                                                                        </button>
                                                                        <button class="btn btn-info btn-sm"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            data-bs-title="Download Report">
                                                                            <i class="ri-file-download-line"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>
                                                                    <div class="icon-box md bg-primary rounded-2">
                                                                        <i class="ri-file-excel-2-line"></i>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <a href="#!"
                                                                        class="link-primary text-truncate">Reports 3
                                                                        glucose level
                                                                        complete report</a>
                                                                </td>
                                                                <td>Feb-18, 2024</td>
                                                                <td>
                                                                    <div class="d-inline-flex gap-1">
                                                                        <button class="btn btn-danger btn-sm"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delRow">
                                                                            <i class="ri-delete-bin-line"></i>
                                                                        </button>
                                                                        <button class="btn btn-info btn-sm"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            data-bs-title="Download Report">
                                                                            <i class="ri-file-download-line"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-sm-6">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <h5 class="card-title">Health Activity</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="scroll350">
                                                <div id="healthActivity"><HealthActivityChart/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-sm-6">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <h5 class="card-title">Pharmacy</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="scroll350">
                                                <div class="text-center">
                                                    <img class="img-fluid mb-3"
                                                        src="/assets/images/reports.svg" style={{width: "180px"}}
                                                        alt="Hospital Admin Templates" />
                                                    <h2>$980</h2>
                                                    <span class="d-block mb-1">Average Spending</span>
                                                    <span class="d-block mb-2"><b>+20%</b> vs last
                                                        month</span>
                                                    <p class="m-0 opacity-75">You can choose from over 1600
                                                        admin dashboard templates on Bootstrap
                                                        Gallery.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-sm-6">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            <h5 class="card-title">Timeline</h5>
                                        </div>
                                        <div class="card-body">


                                            <div class="scroll350">
                                                <div class="activity-feed">
                                                    <div class="feed-item">
                                                        <span class="feed-date pb-1" data-bs-toggle="tooltip"
                                                            data-bs-title="Today 05:32:35">An
                                                            Hour Ago</span>
                                                        <div class="mb-1">
                                                            <a href="#" class="text-primary">Dr. Janie
                                                                Mcdonald</a> - sent a new prescription.
                                                        </div>
                                                        <div class="mb-1">Medecine Name - <a href="#"
                                                            class="text-danger">Amocvmillin</a></div>
                                                        <a href="#!" class="text-dark">Payment Link <i
                                                            class="ri-arrow-right-up-line"></i> </a>
                                                    </div>
                                                    <div class="feed-item">
                                                        <span class="feed-date pb-1" data-bs-toggle="tooltip"
                                                            data-bs-title="Today 05:32:35">An
                                                            Hour Ago</span>
                                                        <div class="mb-1">
                                                            <a href="#" class="text-primary">Dr. Hector
                                                                Banks</a> - uploaded a report.
                                                        </div>
                                                        <div class="mb-1">Report Name - <a href="#"
                                                            class="text-danger">Lisymorpril</a></div>
                                                        <a href="#!" class="text-dark">Payment Link <i
                                                            class="ri-arrow-right-up-line"></i> </a>
                                                    </div>
                                                    <div class="feed-item">
                                                        <span class="feed-date pb-1" data-bs-toggle="tooltip"
                                                            data-bs-title="Today 05:32:35">An
                                                            Hour Ago</span>
                                                        <div class="mb-1">
                                                            <a href="#" class="text-primary">Dr. Deena
                                                                Cooley</a> - sent medecine details.
                                                        </div>
                                                        <div class="mb-1">Medecine Name - <a href="#"
                                                            class="text-danger">Predeymsone</a></div>
                                                        <a href="#!" class="text-dark">Payment Link <i
                                                            class="ri-arrow-right-up-line"></i> </a>
                                                    </div>
                                                    <div class="feed-item">
                                                        <span class="feed-date pb-1" data-bs-toggle="tooltip"
                                                            data-bs-title="Today 05:32:35">An
                                                            Hour Ago</span>
                                                        <div class="mb-1">
                                                            <a href="#" class="text-primary">Dr. Mitchel
                                                                Alvarez</a> - added import files.
                                                        </div>
                                                        <div class="mb-1">File Name - <a href="#"
                                                            class="text-danger">Naverreone</a></div>
                                                        <a href="#!" class="text-dark">Payment Link <i
                                                            class="ri-arrow-right-up-line"></i> </a>
                                                    </div>
                                                    <div class="feed-item">
                                                        <span class="feed-date pb-1" data-bs-toggle="tooltip"
                                                            data-bs-title="Today 05:32:35">An
                                                            Hour Ago</span>
                                                        <div class="mb-1">
                                                            <a href="#" class="text-primary">Dr. Owen Scott</a>
                                                            - reviewed your file.
                                                        </div>
                                                        <div class="mb-1">File Name - <a href="#"
                                                            class="text-danger">Gabateyntin</a></div>
                                                        <a href="#!" class="text-dark">Payment Link <i
                                                            class="ri-arrow-right-up-line"></i> </a>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="modal fade" id="delRow" tabindex="-1"
                                aria-labelledby="delRowLabel" aria-hidden="true">
                                <div class="modal-dialog modal-sm">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="delRowLabel">
                                                Confirm
                                            </h5>
                                            <button type="button" class="btn-close"
                                                data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            Are you sure you want to delete this report?
                                        </div>
                                        <div class="modal-footer">
                                            <div class="d-flex justify-content-end gap-2">
                                                <button class="btn btn-outline-secondary"
                                                    data-bs-dismiss="modal" aria-label="Close">No</button>
                                                <button class="btn btn-danger" data-bs-dismiss="modal"
                                                    aria-label="Close">Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="modal fade" id="viewReportsModal1" tabindex="-1"
                                aria-labelledby="viewReportsModalLabel1"
                                aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="viewReportsModalLabel1">
                                                View Reports
                                            </h5>
                                            <button type="button" class="btn-close"
                                                data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">


                                            <div class="row g-3">
                                                <div class="col-sm-2">
                                                    <a href="#"
                                                        class="d-flex flex-column bg-light p-2 rounded-2 text-center"
                                                        data-bs-target="#viewReportsModal2"
                                                        data-bs-toggle="modal">
                                                        <img src="assets/images/report.svg"
                                                            class="img-fluid rounded-2"
                                                            alt="Medical Dashboards" />
                                                        <h6 class="mt-3 mb-1 text-truncate">Clinical
                                                            Report</h6>
                                                        <p class="m-0 small">10/05/2024</p>
                                                    </a>
                                                </div>
                                                <div class="col-sm-2">
                                                    <a href="#"
                                                        class="d-flex flex-column bg-light p-2 rounded-2 text-center"
                                                        data-bs-target="#viewReportsModal2"
                                                        data-bs-toggle="modal">
                                                        <img src="assets/images/report.svg"
                                                            class="img-fluid rounded-2"
                                                            alt="Medical Dashboards" />
                                                        <h6 class="mt-3 mb-1 text-truncate">Dentist
                                                            Report</h6>
                                                        <p class="m-0 small">20/06/2024</p>
                                                    </a>
                                                </div>
                                                <div class="col-sm-2">
                                                    <a href="#"
                                                        class="d-flex flex-column bg-light p-2 rounded-2 text-center"
                                                        data-bs-target="#viewReportsModal2"
                                                        data-bs-toggle="modal">
                                                        <img src="assets/images/report.svg"
                                                            class="img-fluid rounded-2"
                                                            alt="Medical Dashboards" />
                                                        <h6 class="mt-3 mb-1 text-truncate">Glucose
                                                            Report</h6>
                                                        <p class="m-0 small">30/06/2024</p>
                                                    </a>
                                                </div>
                                                <div class="col-sm-2">
                                                    <a href="#"
                                                        class="d-flex flex-column bg-light p-2 rounded-2 text-center"
                                                        data-bs-target="#viewReportsModal2"
                                                        data-bs-toggle="modal">
                                                        <img src="assets/images/report.svg"
                                                            class="img-fluid rounded-2"
                                                            alt="Medical Dashboards" />
                                                        <h6 class="mt-3 mb-1 text-truncate">X-ray Report</h6>
                                                        <p class="m-0 small">26/08/2024</p>
                                                    </a>
                                                </div>
                                                <div class="col-sm-2">
                                                    <a href="#"
                                                        class="d-flex flex-column bg-light p-2 rounded-2 text-center"
                                                        data-bs-target="#viewReportsModal2"
                                                        data-bs-toggle="modal">
                                                        <img src="assets/images/report.svg"
                                                            class="img-fluid rounded-2"
                                                            alt="Medical Dashboards" />
                                                        <h6 class="mt-3 mb-1 text-truncate">Ultrasound
                                                            Report</h6>
                                                        <p class="m-0 small">21/08/2024</p>
                                                    </a>
                                                </div>
                                                <div class="col-sm-2">
                                                    <a href="#"
                                                        class="d-flex flex-column bg-light p-2 rounded-2 text-center"
                                                        data-bs-target="#viewReportsModal2"
                                                        data-bs-toggle="modal">
                                                        <img src="assets/images/report.svg"
                                                            class="img-fluid rounded-2"
                                                            alt="Medical Dashboards" />
                                                        <h6 class="mt-3 mb-1 text-truncate">Hypothermia
                                                            Report</h6>
                                                        <p class="m-0 small">15/04/2024</p>
                                                    </a>
                                                </div>
                                                <div class="col-sm-2">
                                                    <a href="#"
                                                        class="d-flex flex-column bg-light p-2 rounded-2 text-center"
                                                        data-bs-target="#viewReportsModal2"
                                                        data-bs-toggle="modal">
                                                        <img src="assets/images/report.svg"
                                                            class="img-fluid rounded-2"
                                                            alt="Medical Dashboards" />
                                                        <h6 class="mt-3 mb-1 text-truncate">Discharge
                                                            Report</h6>
                                                        <p class="m-0 small">22/07/2024</p>
                                                    </a>
                                                </div>
                                                <div class="col-sm-2">
                                                    <a href="#"
                                                        class="d-flex flex-column bg-light p-2 rounded-2 text-center"
                                                        data-bs-target="#viewReportsModal2"
                                                        data-bs-toggle="modal">
                                                        <img src="assets/images/report.svg"
                                                            class="img-fluid rounded-2"
                                                            alt="Medical Dashboards" />
                                                        <h6 class="mt-3 mb-1 text-truncate">Diabetes
                                                            Report</h6>
                                                        <p class="m-0 small">17/05/2024</p>
                                                    </a>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="modal fade" id="viewReportsModal2" tabindex="-1"
                                aria-labelledby="viewReportsModalLabel2"
                                aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="viewReportsModalLabel2">
                                                <div class="d-flex align-items-center">
                                                    <a href="#!" class="btn btn-sm btn-outline-primary me-2"
                                                        data-bs-target="#viewReportsModal1"
                                                        data-bs-toggle="modal">
                                                        <i class="ri-arrow-left-wide-fill"></i>
                                                    </a>
                                                    Clinical Report
                                                </div>
                                            </h5>
                                            <button type="button" class="btn-close"
                                                data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">


                                            <div class="row g-3">
                                                <div class="col-sm-12">
                                                    <a href="#"
                                                        class="d-flex flex-column bg-light p-2 rounded-2 text-center">
                                                        <img src="assets/images/report.svg"
                                                            class="img-fluid rounded-2"
                                                            alt="Medical Dashboards" />
                                                        <h6 class="mt-3 mb-1 text-truncate">Clinical
                                                            Report</h6>
                                                        <p class="m-0 small">10/05/2024</p>
                                                    </a>
                                                </div>
                                            </div>


                                        </div>
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

export default ViewPatientProfile;


