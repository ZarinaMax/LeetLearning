// src/components/tasks/TaskCatalog.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  List,
  ListItem,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Chip,
  Divider, // Импортируем Divider
} from "@mui/material";
import taskService from "../../services/taskService";
import attemptService from "../../services/attemptService";
import TaskSearch from "./TaskSearch";
import TaskRecommender from "./TaskRecommender"; // Импортируем TaskRecommender

const TaskCatalog = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [solvedTasks, setSolvedTasks] = useState(new Set());

  useEffect(() => {
    const fetchTasksAndAttempts = async () => {
      try {
        const [tasksResponse, attemptsResponse] = await Promise.all([
          taskService.getTasks(),
          attemptService.getUserAttempts(),
        ]);

        setTasks(tasksResponse.data);
        setFilteredTasks(tasksResponse.data);

        const successfulAttempts = attemptsResponse.data.filter(
          (attempt) => attempt.status === "success",
        );

        const solvedTaskIds = new Set(
          successfulAttempts.map((attempt) => attempt.taskId),
        );

        setSolvedTasks(solvedTaskIds);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTasksAndAttempts();
  }, []);

  const handleSearch = ({ name, difficulties, selectedTags }) => {
    const filtered = tasks.filter((task) => {
      const matchesName = name
        ? task.name.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchesDifficulty =
        difficulties.easy || difficulties.medium || difficulties.hard
          ? (difficulties.easy && task.difficulty === "easy") ||
            (difficulties.medium && task.difficulty === "medium") ||
            (difficulties.hard && task.difficulty === "hard")
          : true;
      const matchesTags = Object.values(selectedTags).some((checked) => checked)
        ? Object.keys(selectedTags).some(
            (tag) => selectedTags[tag] && task.tags.includes(tag),
          )
        : true;
      return matchesName && matchesDifficulty && matchesTags;
    });
    setFilteredTasks(filtered);
  };

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
      <div style={{ textAlign: "left" }}>
        <TaskRecommender />
      </div>
      <Divider style={{ margin: "16px 0" }} />
      <div style={{ textAlign: "left" }}>
        <TaskSearch onSearch={handleSearch} />
      </div>
      <Divider style={{ margin: "16px 0" }} />
      <Grid container spacing={3} style={{ marginTop: "16px" }}>
        <Grid item xs={2}>
          <Typography variant="h6" style={{ textAlign: "left" }}>
            ID
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" style={{ textAlign: "left" }}>
            Name
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" style={{ textAlign: "left" }}>
            Difficulty
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" style={{ textAlign: "left" }}>
            Tags
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" style={{ textAlign: "left" }}>
            Actions
          </Typography>
        </Grid>
      </Grid>
      <List>
        {filteredTasks.map((task) => (
          <ListItem key={task.id} divider>
            <Grid container alignItems="center">
              <Grid item xs={2}>
                <Typography>{task.id}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>
                  {task.name}
                  {solvedTasks.has(task.id) && (
                    <Chip
                      label="Solved"
                      color="success"
                      style={{ marginLeft: "8px" }}
                    />
                  )}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography style={getDifficultyStyle(task.difficulty)}>
                  {task.difficulty}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                {task.tags.slice(0, 3).map((tag) => (
                  <Chip key={tag} label={tag} style={{ margin: "2px" }} />
                ))}
              </Grid>
              <Grid item xs={2}>
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
