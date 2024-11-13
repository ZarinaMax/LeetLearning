// src/components/user/Dashboard.js
import React, { useEffect, useState } from "react";
import { Grid, Card, Typography, Container } from "@mui/material";
import userService from "../../services/userService";
import AccountSettingsForm from "./AccountSettingsForm";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    userService
      .getUserData()
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!userData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <Typography variant="h6">User Statistics</Typography>
            <Typography>Username: {userData.username}</Typography>
            <Typography>Email: {userData.email}</Typography>
            {/* Add more user statistics here */}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <Typography variant="h6">Account Settings</Typography>
            <AccountSettingsForm userData={userData} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
