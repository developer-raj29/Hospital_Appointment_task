import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import AllDoctors from "./components/alldoctors";
import AllPatients from "./components/allpatients";
import Profile from "./pages/profile";
import ViewProfile from "./pages/viewprofile";
import Navbar from "./components/navBar";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
import Booking from "./pages/booking";

const App = () => {
  // const [isloggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isloggedIn={true}>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="all-doctors" element={<AllDoctors />} />
          <Route path="all-patients" element={<AllPatients />} />
          <Route path="booking/:id" element={<Booking />} />
        </Route>

        <Route
          path="/profile"
          element={
            <PrivateRoute isloggedIn={true}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-profile"
          element={
            <PrivateRoute isloggedIn={true}>
              <ViewProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
