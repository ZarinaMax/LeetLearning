// src/components/TaskCatalog.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import taskService from "../../services/taskService";

const TaskCatalog = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    taskService
      .getTasks()
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return { color: "green" };
      case "medium":
        return { color: "orange" };
      case "hard":
        return { color: "red" };
      default:
        return {};
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Task Catalog
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <Grid container alignItems="center">
              <Grid item xs={2}>
                <Typography>ID: {task.id}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Name: {task.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography style={getDifficultyStyle(task.difficulty)}>
                  Difficulty: {task.difficulty}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/tasks/${task.id}`}
                >
                  View Details
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskCatalog;
