import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import axios from "axios";
import { Spin, message } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
const AdminEditAppointment = () => {
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




    return <>

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
                                Edit Appointment
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
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-title">Edit Appointment</h5>
                                    </div>
                                    <div class="card-body">


                                        <div class="row gx-3">
                                            <div class="col-xxl-3 col-lg-4 col-sm-6">
                                                <div class="mb-3">
                                                    <label class="form-label" for="a1">Patient Name</label>
                                                    <input type="text" class="form-control" id="a1" value="Jason Compton" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-lg-4 col-sm-6">
                                                <div class="mb-3">
                                                    <label class="form-label" for="a2">Patient Email</label>
                                                    <input type="email" class="form-control" id="a2" value="test@test.com" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-lg-4 col-sm-6">
                                                <div class="mb-3">
                                                    <label class="form-label" for="a3">Gender</label>
                                                    <select class="form-select" id="a3">
                                                        <option value="0">Male</option>
                                                        <option value="1">Male</option>
                                                        <option value="2">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-lg-4 col-sm-6">
                                                <div class="mb-3">
                                                    <label class="form-label" for="a4">Age</label>
                                                    <input type="number" class="form-control" id="a4" value="68" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-lg-4 col-sm-6">
                                                <div class="mb-3">
                                                    <label class="form-label" for="a5">Patient Phone</label>
                                                    <input type="text" class="form-control" id="a5" value="09876543421" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-lg-4 col-sm-6">
                                                <div class="mb-3">
                                                    <label class="form-label" for="a6">Select Date</label>
                                                    <input type="date" class="form-control" id="a6" placeholder="28/05/2024" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-lg-4 col-sm-6">
                                                <div class="mb-3">
                                                    <label class="form-label" for="a7">Select Time</label>
                                                    <input type="time" class="form-control" id="a7" value="Select time" />
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-lg-4 col-sm-6">
                                                <div class="mb-3">
                                                    <label class="form-label" for="a8">Speacilist Doctor</label>
                                                    <select class="form-select" id="a8">
                                                        <option value="0">Surgeon</option>
                                                        <option value="1">Gynecologist</option>
                                                        <option value="2">Psychiatrists</option>
                                                        <option value="3">Surgeon</option>
                                                        <option value="4">Urologist</option>
                                                        <option value="5">Paediatrician</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="mb-3">
                                                    <label class="form-label" for="a9">Problem</label>
                                                    <textarea class="form-control" id="a9" placeholder="Medical Issue health problem"
                                                        rows="3"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="d-flex gap-2 justify-content-end">
                                                    <a href="appointments-list.html" class="btn btn-outline-secondary">
                                                        Cancel
                                                    </a>
                                                    <a href="appointments-list.html" class="btn btn-primary">
                                                        Update Appointment
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
        </div>
    </>
}
export default AdminEditAppointment