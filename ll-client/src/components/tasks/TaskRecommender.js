// src/components/tasks/TaskRecommender.js
import React, { useEffect, useState } from "react";
import { Typography, Button, CircularProgress, Chip } from "@mui/material";
import taskService from "../../services/taskService";
import attemptService from "../../services/attemptService";
import { Link } from "react-router-dom";

const TaskRecommender = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedTask, setRecommendedTask] = useState(null);

  useEffect(() => {
    const fetchTasksAndAttempts = async () => {
      try {
        const [tasksResponse, attemptsResponse] = await Promise.all([
          taskService.getTasks(),
          attemptService.getUserAttempts(),
        ]);

        const tasks = tasksResponse.data;
        const attempts = attemptsResponse.data;

        const solvedTaskIds = new Set(
          attempts
            .filter((attempt) => attempt.status === "success")
            .map((attempt) => attempt.taskId),
        );

        const unsolvedTasks = tasks.filter(
          (task) => !solvedTaskIds.has(task.id),
        );

        setTasks(tasks);
        setRecommendedTask(unsolvedTasks.length > 0 ? unsolvedTasks[0] : null);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTasksAndAttempts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!recommendedTask) {
    return <Typography>Congratulations! You have solved all tasks.</Typography>;
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
    <div>
      <Typography variant="h6">Recommended Task</Typography>
      <Typography variant="body1">{recommendedTask.name}</Typography>
      <Typography
        variant="body2"
        style={getDifficultyStyle(recommendedTask.difficulty)}
      >
        Difficulty: {recommendedTask.difficulty}
      </Typography>
      <div>
        {recommendedTask.tags.map((tag) => (
          <Chip key={tag} label={tag} style={{ margin: "2px" }} />
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/tasks/${recommendedTask.id}`}
        style={{ marginTop: "16px" }}
      >
        Solve Task
      </Button>
    </div>
  );
};

export default TaskRecommender;
