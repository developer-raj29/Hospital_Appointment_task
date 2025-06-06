import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          p: 2,
          // bgcolor: "primary.main",
          color: "white",
        }}
      >
        Dashboard
      </Typography>

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, p: 1, bgcolor: "#f5f5f5", overflowY: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
