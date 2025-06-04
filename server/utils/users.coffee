users
  - _id
  - name
  - email
  - password
  - role (patient/doctor)
  - specialization (doctor)
  - availability (doctor)
  - age, gender, etc. (patient)

appointments
  - _id
  - doctorId
  - patientId
  - date
  - timeSlot
  - status (booked/cancelled/completed)

/controllers
  - authController.js
  - appointmentController.js
  - user.controller.js

/models
  - User.js
  - Appointment.js

/routes
  - authRoutes.js
  - userRoutes.js
  - appointmentRoutes.js

/middleware
  - authMiddleware.js
  - roleMiddleware.js

{
  "success": true,
  "message": "Patient's appointments fetched",
  "appointments": [
    {
      "_id": "663b1cceab12345678",
      "doctorId": {
        "firstName": "Dr. Ravi",
        "lastName": "Yadav",
        "email": "ravi@example.com",
        "specialization": "Dermatology"
      },
      "date": "2025-06-06T00:00:00.000Z",
      "timeSlot": "10:00 AM - 10:30 AM",
      "status": "booked"
    }
  ]
}

"doctorId": {
  "firstName": "Dr. Sanya",
  "lastName": "Singh",
  "email": "sanya@example.com",
  "specialization": "Cardiologist"
}
