import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import axios from "axios";
import { Spin, message } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
const AdminAppointment =()=>{
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
          `${
            import.meta.env.VITE_API_URL
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


    const  events = [
      {
        title: "5 Appointments",
        url: "appointments-list.html",
        start: "2024-05-01",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "9 Appointments",
        url: "appointments-list.html",
        start: "2024-05-02",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "12 Appointments",
        url: "appointments-list.html",
        start: "2024-05-03",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "9 Appointments",
        url: "appointments-list.html",
        start: "2024-05-04",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "7 Appointments",
        url: "appointments-list.html",
        start: "2024-05-05",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "16 Appointments",
        url: "appointments-list.html",
        start: "2024-05-06",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "9 Appointments",
        url: "appointments-list.html",
        start: "2024-05-07",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "13 Appointments",
        url: "appointments-list.html",
        start: "2024-05-08",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "20 Appointments",
        url: "appointments-list.html",
        start: "2024-05-09",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "11 Appointments",
        url: "appointments-list.html",
        start: "2024-05-10",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "3 Appointments",
        url: "appointments-list.html",
        start: "2024-05-11",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8"
      },
      {
        title: "6 Appointments",
        url: "appointments-list.html",
        start: "2024-05-12",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "18 Appointments",
        url: "appointments-list.html",
        start: "2024-05-13",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "4 Appointments",
        url: "appointments-list.html",
        start: "2024-05-14",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "5 Appointments",
        url: "appointments-list.html",
        start: "2024-05-15",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "5 Appointments",
        url: "appointments-list.html",
        start: "2024-05-16",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "9 Appointments",
        url: "appointments-list.html",
        start: "2024-05-17",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "12 Appointments",
        url: "appointments-list.html",
        start: "2024-05-18",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "9 Appointments",
        url: "appointments-list.html",
        start: "2024-05-19",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "7 Appointments",
        url: "appointments-list.html",
        start: "2024-05-20",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "16 Appointments",
        url: "appointments-list.html",
        start: "2024-05-21",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "9 Appointments",
        url: "appointments-list.html",
        start: "2024-05-22",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "13 Appointments",
        url: "appointments-list.html",
        start: "2024-05-23",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "20 Appointments",
        url: "appointments-list.html",
        start: "2024-05-24",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "11 Appointments",
        url: "appointments-list.html",
        start: "2024-05-25",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "3 Appointments",
        url: "appointments-list.html",
        start: "2024-05-26",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "6 Appointments",
        url: "appointments-list.html",
        start: "2024-05-27",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "18 Appointments",
        url: "appointments-list.html",
        start: "2024-05-28",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "4 Appointments",
        url: "appointments-list.html",
        start: "2024-05-29",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "5 Appointments",
        url: "appointments-list.html",
        start: "2024-05-30",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      },
      {
        title: "8 Appointments",
        url: "appointments-list.html",
        start: "2024-05-31",
        textColor: "#116aef",
        color: "#ffffff",
        borderColor: "#469ED8",
      }
    ]

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
                Appointments
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
              <div class="col-sm-12 col-12">
                <div class="card">
                  <div class="card-header d-flex align-items-center justify-content-between">
                    <h5 class="card-title">Applointments</h5>
                    <a href="/admin-book-appointment" class="btn btn-primary ms-auto">Book Appointment</a>
                  </div>
                  <div class="card-body">

                    <div id="appointmentsCal">
                    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prevYear,prev,next,nextYear today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        initialDate="2024-05-10"
        navLinks={true} // can click day/week names to navigate views
        editable={true}
        dayMaxEvents={true} // allow "more" link when too many events
        events={events}
      />
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
export default AdminAppointment