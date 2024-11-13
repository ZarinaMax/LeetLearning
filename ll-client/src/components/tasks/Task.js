// src/components/tasks/Task.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import taskService from "../../services/taskService";
import attemptService from "../../services/attemptService";
import TaskDetails from "./TaskDetails";
import CodeEditor from "./CodeEditor";

const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [codeTemplate, setCodeTemplate] = useState("");
  const [attemptStatus, setAttemptStatus] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    taskService
      .getTaskById(id)
      .then((response) => {
        setTask(response.data);
        const decodedTemplate = atob(response.data.code_template);
        setCodeTemplate(decodedTemplate);
        setCode(decodedTemplate);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = () => {
    const encodedCode = btoa(code);
    attemptService
      .submitAttempt(id, encodedCode)
      .then((response) => {
        console.log("Submission successful", response);
        setAttemptStatus("pending");

        // Проверка статуса попытки через 2 секунды
        setTimeout(() => {
          attemptService
            .getAttemptStatus(response.data.id)
            .then((statusResponse) => {
              setAttemptStatus(statusResponse.data.status);
            })
            .catch((error) => {
              console.error("Error fetching attempt status", error);
              setAttemptStatus("error");
            });
        }, 2000);
      })
      .catch((error) => {
        console.error("Submission error", error);
        setAttemptStatus("error");
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <TaskDetails task={task} />
        <Grid item xs={12} md={8}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginBottom: "16px" }}
          >
            Submit
          </Button>
          {attemptStatus && (
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ marginBottom: "16px" }}
            >
              Attempt Status: {attemptStatus}
            </Typography>
          )}
          <CodeEditor initialCode={codeTemplate} onCodeChange={setCode} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Task;
