import React, { useState, useEffect } from 'react';
import { Steps, Button, message } from 'antd';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import moment from "moment-timezone";

import ModeOfContact from './ModeOfContact';
import PaymentMethod from './PaymentMethod';
import BookAppointment from './BookAppointment';
import Topbar from '../../../components/patient/Topbar';
import {motion} from "framer-motion";
import Sidebar from '../../../components/patient/Sidebar';
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { RiHome8Line } from 'react-icons/ri';

const { Step } = Steps;

const AppointmentPage = () => {
    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState({});

    const steps = [
        { title: 'Book Appointment', content: <BookAppointment formData={formData} setFormData={setFormData} /> },
        { title: 'Mode of Contact', content: <ModeOfContact formData={formData} setFormData={setFormData} /> },
        { title: 'Payment Method', content: <PaymentMethod formData={formData} setFormData={setFormData} /> },
    ];

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const handleFinish = async () => {
        const { date, time } = formData;
        const token = localStorage.getItem("patientToken");
        const decodeToken = jwtDecode(token);
        const patientId = decodeToken?.user?._id;

        try {
            const selectedDateTime = moment.tz(`${date} ${time}`, formData.patientTimeZone);
            const doctorTime = selectedDateTime.clone().tz(formData.doctorTimeZone);
            const appointmentTimeUTC = doctorTime.utc().format("YYYY-MM-DD HH:mm");

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/patient/book-appointment`,
                { patientId, doctorId: formData.doctorId, date: doctorTime.format("YYYY-MM-DD"), time: doctorTime.format("HH:mm") },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            message.success('Appointment successfully booked!');
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to book appointment. Try another slot.");
        }
    };

    return (

         <div className="page-wrapper">
              <Topbar />
              <div className="main-container">
                {/* <Sidebar /> */}
                <div className="app-container ">
                  {/* <motion.div className="app-hero-header d-flex align-items-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <RiHome8Line className="lh-1 pe-3 me-3 border-end" />
                        <a href="/">Home</a>
                      </li>
                      <li className="breadcrumb-item text-primary" aria-current="page"> Book Appointment</li>
                    </ol>
                  </motion.div> */}
        <div className="stepper-container my-4 p-4">
            <Steps current={current}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="step-content" style={{ marginTop: 24 }}>
                {steps[current].content}
            </div>
            <div className="step-actions" style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={next}>Next</Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={prev}>Previous</Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={handleFinish}>Finish</Button>
                )}
            </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default AppointmentPage;
