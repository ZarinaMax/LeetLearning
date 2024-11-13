// src/components/user/Profile.js
import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import Dashboard from "./Dashboard";
import { Typography, Container } from "@mui/material";

const Profile = () => {
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
        {userData.username} profile
      </Typography>
      <Dashboard />
    </Container>
  );
};

export default Profile;
