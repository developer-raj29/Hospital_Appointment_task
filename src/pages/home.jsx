import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";

// Dummy Doctor Data
const doctors = [
  {
    name: "Dr. Priya Sharma",
    specialization: "Cardiologist",
    email: "priya.sharma@hospital.com",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. Arjun Verma",
    specialization: "Dermatologist",
    email: "arjun.verma@hospital.com",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Dr. Meena Das",
    specialization: "Neurologist",
    email: "meena.das@hospital.com",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
  },
  {
    name: "Dr. Rahul Khanna",
    specialization: "Pediatrician",
    email: "rahul.khanna@hospital.com",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    name: "Dr. Sneha Reddy",
    specialization: "Gynecologist",
    email: "sneha.reddy@hospital.com",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Dr. Aman Joshi",
    specialization: "Orthopedic Surgeon",
    email: "aman.joshi@hospital.com",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
  },
  {
    name: "Dr. Kavita Mishra",
    specialization: "Oncologist",
    email: "kavita.mishra@hospital.com",
    image: "https://randomuser.me/api/portraits/women/49.jpg",
  },
  {
    name: "Dr. Rohan Patel",
    specialization: "ENT Specialist",
    email: "rohan.patel@hospital.com",
    image: "https://randomuser.me/api/portraits/men/49.jpg",
  },
  {
    name: "Dr. Neha Kulkarni",
    specialization: "Psychiatrist",
    email: "neha.kulkarni@hospital.com",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
  },
  {
    name: "Dr. Ankit Mehra",
    specialization: "General Physician",
    email: "ankit.mehra@hospital.com",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingY: 6 }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" gutterBottom>
          🏥 Welcome to HealthCare+
        </Typography>
        <Typography variant="h6">
          Book appointments with our trusted doctors anytime, anywhere.
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        👩‍⚕️ Available Doctors
      </Typography>

      <Grid container spacing={4}>
        {doctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image={doctor.image}
                alt={doctor.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {doctor.name}
                </Typography>
                <Typography variant="body2">{doctor.specialization}</Typography>
                <Typography variant="body2">{doctor.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
