import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, please login");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/user/all-doctors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDoctors(response.data.doctors || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom fontWeight={600} color="black">
        All Registered Doctors
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>S.No</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Specialization</strong>
                </TableCell>
                <TableCell>
                  <strong>Contact Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor, index) => (
                <TableRow key={doctor._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {doctor.firstName} {doctor.lastName}
                  </TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.contactNumber}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          navigate(`/dashboard/booking/${doctor._id}`)
                        }
                      >
                        Book
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate(`/view-profile/${doctor._id}`)}
                      >
                        View Profile
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AllDoctors;
