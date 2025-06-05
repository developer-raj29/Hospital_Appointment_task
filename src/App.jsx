import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import AllDoctors from "./components/alldoctors";
import AllPatients from "./components/allpatients";
import ViewProfile from "./pages/viewprofile";
import Navbar from "./components/navBar";
import PrivateRoute from "./components/PrivateRoute";
import Booking from "./pages/booking";
import Profile from "./pages/profile";

const App = () => {
  const isloggedIn = !!localStorage.getItem("token");

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
            <PrivateRoute isloggedIn={isloggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="all-doctors" element={<AllDoctors />} />
          <Route path="all-patients" element={<AllPatients />} />
          <Route path="booking/:id" element={<Booking />} />
        </Route>

        <Route
          path="/profile/:id"
          element={
            <PrivateRoute isloggedIn={isloggedIn}>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/view-profile/:id"
          element={
            <PrivateRoute isloggedIn={isloggedIn}>
              <ViewProfile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </>
  );
};

export default App;
