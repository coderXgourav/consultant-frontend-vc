import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import moment from "moment-timezone";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  Typography,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Divider,
} from "@mui/material";
import { CreditCard, AttachMoney } from "@mui/icons-material";
import { RiHome8Line } from "react-icons/ri";
import Topbar from "../../../components/patient/Topbar";
import Sidebar from "../../../components/patient/Sidebar";
import { useSocket } from "../doctor/context/SocketProvider";

// Load Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [doctorSchedule, setDoctorSchedule] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);
  const [doctorTimeZone, setDoctorTimeZone] = useState("UTC");
  const [slotDuration, setSlotDuration] = useState(60);
  const [patientTimeZone, setPatientTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("patientToken");
  const decodeToken = jwtDecode(token);
  const [activeStep, setActiveStep] = useState(0);
  const [meetingMode, setMeetingMode] = useState("video");
  const [formValid, setFormValid] = useState(false);

  const socket = useSocket();

  // Add new useEffect for socket initialization check
  useEffect(() => {
    if (!socket) {
      console.warn("Socket connection not established");
    } else {
      socket.on("connect", () => {
        console.log("Socket connected successfully");
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
      }
    };
  }, [socket]);

  // Load Razorpay script on component mount
  useEffect(() => {
    loadRazorpayScript().then((loaded) => {
      if (!loaded) {
        setErrorMessage("Failed to load Razorpay SDK. Please try again.");
      }
    });
  }, []);

  useEffect(() => {
    if (date && Object.keys(doctorSchedule).length > 0) {
      fetchBookedSlots().then((updatedBookedSlots) => {
        generateAvailableTimes(date, updatedBookedSlots);
      });
    }
  }, [date, doctorSchedule, doctorTimeZone, slotDuration]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/patient/get-doctor-by-patient/${doctorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.status) {
          setDoctorSchedule(response.data.doctor.schedule);
          setDoctorTimeZone(response.data.doctor.timeZone || "UTC");
          setSlotDuration(response.data.doctor.slotDuration || 60);
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [doctorId]);

  const fetchBookedSlots = async () => {
    if (!date) return [];
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/patient/get-booked-slots/${doctorId}/${date}`
      );
      let formattedBookedSlots = response.data.bookedSlots.map((slot) => {
        const fullDateTime = `${date} ${slot}`;
        const isValidDate = moment(
          fullDateTime,
          "YYYY-MM-DD HH:mm",
          true
        ).isValid();
        return isValidDate
          ? moment
              .tz(fullDateTime, doctorTimeZone)
              .tz(patientTimeZone)
              .format("HH:mm")
          : "Invalid date";
      });
      setBookedSlots([...formattedBookedSlots]);
      return formattedBookedSlots;
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const generateAvailableTimes = async (selectedDate, updatedBookedSlots) => {
    setErrorMessage("");
    const patientLocalDate = moment.tz(selectedDate, patientTimeZone);
    const selectedDay = patientLocalDate.format("ddd").toLowerCase();

    if (
      !doctorSchedule[selectedDay] ||
      doctorSchedule[selectedDay].length === 0
    ) {
      setAvailableTimes([]);
      setErrorMessage("Doctor is not available on this day.");
      return;
    }

    let times = [];
    doctorSchedule[selectedDay].forEach((slot) => {
      const startTime = moment.tz(
        `${selectedDate} ${slot.start}`,
        "YYYY-MM-DD HH:mm",
        doctorTimeZone
      );
      const endTime = moment.tz(
        `${selectedDate} ${slot.end}`,
        "YYYY-MM-DD HH:mm",
        doctorTimeZone
      );
      let currentSlot = startTime.clone();
      while (currentSlot.isBefore(endTime) || currentSlot.isSame(endTime)) {
        const localTimeSlot = currentSlot
          .clone()
          .tz(patientTimeZone)
          .format("HH:mm");
        times.push({
          time: localTimeSlot,
          disabled: updatedBookedSlots.includes(localTimeSlot),
        });
        currentSlot.add(slotDuration, "minutes");
      }
    });
    setAvailableTimes(times);
  };

  // const createMeetingRoom = async (room) => {
  //   if (!socket?.connected) {
  //     throw new Error("Socket connection not available");
  //   }

  //   return new Promise((resolve, reject) => {
  //     socket.emit("room:create", { room });

  //     const timeout = setTimeout(() => {
  //       socket.off("room:created");
  //       reject(new Error("Room creation timeout"));
  //     }, 5000);

  //     socket.once("room:created", () => {
  //       clearTimeout(timeout);
  //       resolve(room);
  //     });

  //     socket.once("room:error", (error) => {
  //       clearTimeout(timeout);
  //       reject(new Error(error.message || "Failed to create room"));
  //     });
  //   });
  // };

  const handlePaymentAndBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const patientId = decodeToken?.user?._id;
      if (!patientId) throw new Error("Patient ID not found in token");
      // Fetch doctor details
      const doctorResponse = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/patient/get-doctor-by-patient/${doctorId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!doctorResponse.data.status) {
        throw new Error("Failed to fetch doctor details");
      }
      const doctorTimeZone = doctorResponse.data.doctor.timeZone || "UTC";
      const doctorName = `${doctorResponse.data.doctor.firstName} ${doctorResponse.data.doctor.lastName}`;
      const patientName = `${decodeToken.user.first_name} ${decodeToken.user.last_name}`;

      const selectedDateTime = moment.tz(
        `${date} ${time}`,
        "YYYY-MM-DD HH:mm",
        patientTimeZone
      );
      const doctorTime = selectedDateTime.clone().tz(doctorTimeZone);

      // Step 1: Initiate Razorpay Payment
      const paymentOptions = {
        key: "rzp_test_Xq4UCOuS99p1Mn", // Replace with your Razorpay Key ID
        amount: 100, // ₹550 in paise (corrected from 100)
        currency: "INR",
        name: "Healthcare Platform",
        description: "Appointment Booking",
        image: "https://example.com/your_logo",
        handler: async function (response) {
          try {
            // Create meeting room with better error handling
            const room = "room_" + Math.random().toString(36).substr(2, 9);
            // await createMeetingRoom(room);
            const meetingLink = `${window.location.origin}/patient/meeting/${room}`;

            // Step 3: Book the appointment
            const meetingResponse = await axios.post(
              `${import.meta.env.VITE_API_URL}/patient/create-meeting`,
              {
                patientId,
                doctorId,
                date: doctorTime.format("YYYY-MM-DD"),
                time: doctorTime.format("HH:mm"),
                meetingMode,
                patientTimeZone,
                paymentId: response.razorpay_payment_id,
                meetingLink,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!meetingResponse.data.success) {
              throw new Error(
                meetingResponse.data.message || "Failed to create meeting"
              );
            }

            setSuccessMessage(
              "Appointment booked successfully! Check your email for details."
            );
            navigate("/book-appointment-success", {
              state: {
                appointmentDetails: {
                  doctorName,
                  patientName,
                  date: doctorTime.format("YYYY-MM-DD"),
                  time: doctorTime.format("HH:mm"),
                  type:
                    meetingMode === "video" ? "Video Consultation" : "Other",
                  appointmentId: meetingResponse.data.appointmentId || "N/A",
                  meetingLink,
                },
              },
            });
          } catch (error) {
            console.error("Post-payment error:", error);
            setErrorMessage(
              error.message ||
                "Failed to process booking after payment. Please contact support."
            );
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: patientName,
          email: decodeToken.user.email,
          contact: decodeToken.user.contact || "9000090000",
        },
        notes: { address: "Healthcare Platform Office" },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(paymentOptions);
      rzp1.on("payment.failed", function (response) {
        setErrorMessage(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      setErrorMessage(
        error.message || "Error initiating payment. Please try again."
      );
      setLoading(false);
    }
  };

  // Step validation
  useEffect(() => {
    if (activeStep === 0) {
      setFormValid(date && time);
    } else if (activeStep === 1) {
      setFormValid(!!meetingMode);
    } else {
      setFormValid(true);
    }
  }, [date, time, meetingMode, activeStep]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const DateTimeSelection = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Select Appointment Date and Time
      </Typography>
      <TextField
        fullWidth
        label="Select Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ mb: 3 }}
        required
        inputProps={{ min: moment().format("YYYY-MM-DD") }}
      />
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Available Time Slots
        </Typography>
        <Select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Select a Time Slot
          </MenuItem>
          {availableTimes.map((slot, index) => (
            <MenuItem
              key={index}
              value={slot.time}
              disabled={slot.disabled}
              sx={{
                color: slot.disabled ? "grey.500" : "text.primary",
                "&:hover": {
                  backgroundColor: slot.disabled ? "inherit" : "action.hover",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FaClock />
                {slot.time} {slot.disabled && "(Booked)"}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  const MeetingModeSelection = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Select Consultation Mode
      </Typography>
      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <RadioGroup
          value={meetingMode}
          onChange={(e) => setMeetingMode(e.target.value)}
        >
          <Box sx={{ display: "grid", gap: 2 }}>
            {[{ value: "video", label: "Video Call", icon: "🎥" }].map(
              (option) => (
                <Card
                  key={option.value}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    border:
                      meetingMode === option.value
                        ? "2px solid primary.main"
                        : "1px solid grey.300",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                  onClick={() => setMeetingMode(option.value)}
                >
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography variant="h5">{option.icon}</Typography>
                        <Typography variant="subtitle1">
                          {option.label}
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0 }}
                  />
                </Card>
              )
            )}
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  );

  const PaymentSection = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Payment Details
      </Typography>
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Consultation Fee
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="body1">Doctor's Fee:</Typography>
          <Typography variant="h6">₹500</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="body1">Platform Fee:</Typography>
          <Typography variant="h6">₹50</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Total Amount:</Typography>
          <Typography variant="h5" color="primary">
            ₹550
          </Typography>
        </Box>
      </Card>
      <Button
        variant="contained"
        fullWidth
        size="large"
        startIcon={<CreditCard />}
        onClick={handlePaymentAndBooking}
        disabled={loading}
        sx={{
          py: 2,
          backgroundColor: "success.main",
          "&:hover": { backgroundColor: "success.dark" },
        }}
      >
        {loading ? <CircularProgress size={24} /> : "Pay Now"}
      </Button>
    </Box>
  );

  const steps = [
    { label: "Select Date & Time", component: <DateTimeSelection /> },
    { label: "Meeting Mode", component: <MeetingModeSelection /> },
    { label: "Payment", component: <PaymentSection /> },
  ];

  return (
    <div className="page-wrapper">
      <Topbar />
      <div className="main-container">
        <Sidebar />
        <div className="app-container">
          <motion.div
            className="app-body"
            style={{ paddingTop: "50px", paddingBottom: "50px" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 800,
                mx: "auto",
                p: 4,
                boxShadow: 3,
              }}
            >
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel>{step.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {successMessage}
                </Alert>
              )}
              {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              {steps[activeStep].component}

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  variant="outlined"
                  sx={{ px: 4 }}
                >
                  Back
                </Button>
                {activeStep !== steps.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!formValid}
                    sx={{ px: 4 }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
