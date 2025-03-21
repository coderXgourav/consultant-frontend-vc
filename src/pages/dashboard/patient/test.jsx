import React, { useEffect, useState } from "react";
// ... other imports ...
import { TextField } from "@mui/material";
import { NoteAdd, Widgets } from "@mui/icons-material";
import axios from "axios";

const AllDoctorAppointment = () => {
  // ... existing states ...
  const [noteDialog, setNoteDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [noteContent, setNoteContent] = useState("");

  // ... existing code ...

  const handleOpenNoteDialog = (patient) => {
    setSelectedPatient(patient);
    setNoteContent("");
    setNoteDialog(true);
  };

  const handleSaveNote = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/add-note`,
        {
          patientId: selectedPatient._id,
          note: noteContent
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
          },
        }
      );
      // Refresh appointments after adding note
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/patient/get-appointment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
        },
      });
      setAppointments(response.data.data);
      setNoteDialog(false);
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  return (
    <Box className="page-wrapper">
      {/* ... existing JSX ... */}

      {/* Add new column in TableHead */}
      <TableHead>
        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
          {/* ... existing columns ... */}
          <TableCell>
            <Typography variant="subtitle1" fontWeight="bold">
              Notes
            </Typography>
          </TableCell>
          {/* ... existing Action column ... */}
        </TableRow>
      </TableHead>

      {/* Add new column in TableBody */}
      <TableBody>
        {appointments.map((appointment, index) => (
          <motion.tr
            key={appointment._id}
            // ... existing props ...
          >
            {/* ... existing cells ... */}
            <TableCell>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => handleOpenNoteDialog(appointment.patient)}
                startIcon={<NoteAdd />}
                sx={{
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Add Note
              </Button>
            </TableCell>
            {/* ... existing Action cell ... */}
          </motion.tr>
        ))}
      </TableBody>

      {/* Note Dialog */}
      <Dialog
        open={noteDialog}
        onClose={() => setNoteDialog(false)}
        PaperProps={{
          style: {
            borderRadius: "12px",
            padding: "10px",
            Width: "200px",
          },
        }}
      >
        <DialogTitle>Add Note for {selectedPatient?.first_name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveNote} variant="contained">
            Save Note
          </Button>
        </DialogActions>
      </Dialog>

      {/* ... existing Confirmation Dialog ... */}
    </Box>
  );
};

export default AllDoctorAppointment;