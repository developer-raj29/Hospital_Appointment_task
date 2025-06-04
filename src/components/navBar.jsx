import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  // Safe parse
  const user = (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Invalid JSON in localStorage 'user':", e);
      return null;
    }
  })();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 600 }}
          >
            MyLogo
          </Typography>

          {/* Conditional Buttons */}
          <Box>
            {!user ? (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  color="inherit"
                  variant="outlined"
                  sx={{ marginRight: 2 }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="contained"
                  color="secondary"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}${user.lastName}`}
                  alt={`${user.firstName} ${user.lastName}`}
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/profile")}
                />
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="secondary"
                >
                  Logout
                </Button>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
