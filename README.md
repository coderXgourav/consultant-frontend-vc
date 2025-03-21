# Doctor Consultation Website - Feature List

## Admin Features
### User Management
- View, edit, and delete all user accounts (doctors and patients)
- Approve/reject doctor registrations after verification
- Manage user roles and permissions
- Monitor user activities and generate reports
- Monitor chat communications for compliance

### Doctor Management
- View all doctor profiles and their specializations
- Monitor doctor availability and scheduling
- Access doctor verification documents
- Handle doctor-related disputes and complaints
- Review chat and medical report sharing metrics

### Payment Management
- View all transaction histories
- Process refunds when necessary
- Set platform commission rates
- Generate financial reports
- Export payment data for accounting

### Analytics & Reporting
- View platform usage statistics
- Generate revenue reports
- Monitor booking trends
- Track user engagement metrics
- Analyze communication patterns and response times

## Doctor Features
### Profile Management
- Create and edit professional profile
- Upload qualification certificates
- Add profile picture and background
- Set consultation fees
- Update professional experience
- List specializations and expertise
- Add clinic/hospital affiliations

### Appointment Management
- Set availability slots (daily/weekly basis)
- View upcoming appointments
- Accept/reject appointment requests
- Reschedule appointments
- Set buffer time between consultations
- Mark slots as unavailable
- Set vacation/leave dates

### Consultation Features
- View patient medical history
- Real-time chat with patients
- Share prescriptions and medical advice
- Review shared medical reports
- Provide feedback on medical reports
- Request additional medical documents
- Set follow-up appointments

### Communication Center
- Dedicated chat interface
- View and respond to patient messages
- Set chat availability status
- View chat history with patients
- Tag important conversations for follow-up

### Payment Features
- Set consultation fees
- View earnings dashboard
- Generate income reports

## Patient Features
### Profile Management
- Create and edit personal profile
- Upload profile picture
- Manage medical history
- Save medical documents

### Doctor Search & Booking
- Search doctors by specialization
- Filter doctors by availability
- View doctor profiles and ratings
- Check doctor's available slots
- Book appointments
- Pay consultation fees
- Cancel/reschedule appointments
- Set appointment reminders

### Medical Report Management
- Upload medical reports and documents
- Organize documents by category
- Share reports with selected doctors
- Track document sharing history
- Receive document review notifications
- Set document access permissions
- Download shared medical documents
- Archive old medical reports

### Communication Center
- Real-time chat with doctors
- Share medical reports directly in chat
- Send photos and documents
- View chat history
- Search through past conversations
- Set message notifications
- Save important messages

### Consultation Features
- Chat with doctors
- View and download prescriptions
- Access medical advice
- Upload relevant medical documents
- View consultation history
- Rate and review doctors

### Payment Features
- Make secure payments
- View payment history
- Download invoices
- Request refunds
- Save payment methods

## Common Features
### Authentication & Security
- Email/phone registration
- Password reset functionality
- Session management
- Privacy settings
- End-to-end encryption for chats
- Secure file sharing

### Notifications
- Email notifications
- Payment confirmations
- Chat message alerts
- Document sharing notifications

### Communication
- Real-time chat system
- File sharing with virus scanning
- Email communications
- Contact support
- Message encryption
- Chat backup system

### User Interface
- Responsive design
- Accessibility features
- Search functionality
- Chat interface customization
- Document preview capability

### Technical Features
- Data backup and recovery
- System logs
- Performance monitoring
- Error reporting
- API documentation
- Database optimization
- File storage management
- Chat server optimization

### Support & Help
- Help documentation
- FAQ section
- Contact forms





// Users Collection - Base user information
{
  _id: ObjectId,
  email: String,
  password: String,  // hashed
  phoneNumber: String,
  role: String,      // enum: ["admin", "doctor", "patient"]
  firstName: String,
  lastName: String,
  profileImage: String,
  isEmailVerified: Boolean,
  isPhoneVerified: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  notifications: {
    email: Boolean,
    sms: Boolean,
    push: Boolean
  }
}

// Doctor Profiles Collection
{
  _id: ObjectId,
  userId: ObjectId,        // reference to Users collection
  specialization: [String],
  qualifications: [{
    degree: String,
    institution: String,
    year: Number,
    certificate: String    // file URL
  }],
  experience: Number,
  aboutMe: String,
  clinicInfo: {
    name: String,
    address: String,
    location: {
      type: "Point",
      coordinates: [Number]  // [longitude, latitude]
    }
  },
  consultationFee: Number,
  languages: [String],
  availability: {
    monday: [{ startTime: String, endTime: String }],
    tuesday: [{ startTime: String, endTime: String }],
    // ... other days
  },
  rating: Number,
  totalRatings: Number,
  isVerified: Boolean,
  documents: [{
    type: String,
    url: String,
    uploadedAt: Date
  }],
  bankDetails: {
    accountNumber: String,
    bankName: String,
    ifscCode: String
  }
}

// Patient Profiles Collection
{
  _id: ObjectId,
  userId: ObjectId,        // reference to Users collection
  dateOfBirth: Date,
  gender: String,
  bloodGroup: String,
  allergies: [String],
  chronicDiseases: [String],
  emergencyContacts: [{
    name: String,
    relationship: String,
    phone: String
  }],
  medicalHistory: [{
    condition: String,
    diagnosis: Date,
    medications: [String],
    documents: [String]    // file URLs
  }]
}

// Appointments Collection
{
  _id: ObjectId,
  doctorId: ObjectId,     // reference to Doctor Profiles
  patientId: ObjectId,    // reference to Patient Profiles
  dateTime: Date,
  duration: Number,       // in minutes
  status: String,         // enum: ["scheduled", "completed", "cancelled", "no-show"]
  type: String,          // enum: ["video", "chat"]
  fees: Number,
  paymentStatus: String, // enum: ["pending", "completed", "refunded"]
  paymentId: ObjectId,   // reference to Payments collection
  notes: String,
  prescription: {
    medications: [{
      name: String,
      dosage: String,
      duration: String,
      instructions: String
    }],
    advice: String,
    followUpDate: Date
  },
  createdAt: Date,
  updatedAt: Date
}

// Availability Slots Collection
{
  _id: ObjectId,
  doctorId: ObjectId,
  date: Date,
  slots: [{
    startTime: String,
    endTime: String,
    isBooked: Boolean,
    appointmentId: ObjectId  // reference to Appointments if booked
  }]
}

// Payments Collection
{
  _id: ObjectId,
  appointmentId: ObjectId,
  patientId: ObjectId,
  doctorId: ObjectId,
  amount: Number,
  platformFee: Number,
  paymentMethod: String,
  transactionId: String,
  status: String,        // enum: ["pending", "completed", "failed", "refunded"]
  refundDetails: {
    amount: Number,
    reason: String,
    date: Date
  },
  createdAt: Date,
  updatedAt: Date
}

// Reviews Collection
{
  _id: ObjectId,
  doctorId: ObjectId,
  patientId: ObjectId,
  appointmentId: ObjectId,
  rating: Number,        // 1-5
  review: String,
  reply: String,        // doctor's reply
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}

// Chat Messages Collection
{
  _id: ObjectId,
  conversationId: ObjectId,  // reference to Conversations collection
  senderId: ObjectId,
  receiverId: ObjectId,
  messageType: String,      // enum: ["text", "image", "document", "video"]
  content: String,
  fileUrl: String,         // for documents/images
  fileName: String,
  fileSize: Number,
  isRead: Boolean,
  readAt: Date,
  createdAt: Date
}

// Conversations Collection
{
  _id: ObjectId,
  doctorId: ObjectId,
  patientId: ObjectId,
  lastMessage: {
    content: String,
    senderId: ObjectId,
    timestamp: Date
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}

// Medical Reports Collection
{
  _id: ObjectId,
  patientId: ObjectId,
  uploadedBy: ObjectId,    // can be patient or doctor
  type: String,           // enum: ["lab_report", "prescription", "imaging", "other"]
  title: String,
  description: String,
  fileUrl: String,
  fileType: String,       // mime type
  fileSize: Number,
  sharedWith: [{
    doctorId: ObjectId,
    sharedAt: Date,
    access: Boolean       // can be revoked
  }],
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}

// Notifications Collection
{
  _id: ObjectId,
  userId: ObjectId,
  type: String,          // enum: ["appointment", "message", "payment", "report"]
  title: String,
  message: String,
  relatedId: ObjectId,   // ID of related document (appointment, message, etc.)
  isRead: Boolean,
  createdAt: Date
}

// Indexes
{
  // Users Collection
  "email": 1,            // unique
  "phoneNumber": 1,      // unique
  
  // Doctor Profiles Collection
  "userId": 1,           // unique
  "specialization": 1,   // for searching
  "location": "2dsphere" // for geo-queries
  
  // Appointments Collection
  "doctorId": 1,
  "patientId": 1,
  "dateTime": 1
  
  // Chat Messages Collection
  "conversationId": 1,
  "senderId": 1,
  "receiverId": 1,
  "createdAt": 1
  
  // Medical Reports Collection
  "patientId": 1,
  "sharedWith.doctorId": 1
}
