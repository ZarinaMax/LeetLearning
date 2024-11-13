// src/components/tasks/TaskDetails.js
import React from "react";
import { Typography, Grid } from "@mui/material";

const TaskDetails = ({ task }) => {
  return (
    <Grid item xs={12} md={4}>
      <Typography variant="h4" gutterBottom>
        {task.name}
      </Typography>
      <Typography>Difficulty: {task.difficulty}</Typography>
      <Typography>Description: {task.description}</Typography>
      <Typography>Timeout: {task.timeout} seconds</Typography>
      <Typography>Memory Limit: {task.memory_limit} MB</Typography>
    </Grid>
  );
};

export default TaskDetails;
