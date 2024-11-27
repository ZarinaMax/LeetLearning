// src/components/tasks/AttemptHistory.js
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import attemptService from "../../services/attemptService";

const AttemptHistory = ({ taskId }) => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAttempt, setSelectedAttempt] = useState(null);

  useEffect(() => {
    attemptService
      .getAttemptsByTaskId(taskId)
      .then((response) => {
        setAttempts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [taskId]);

  const handleViewDetails = (attempt) => {
    setSelectedAttempt(attempt);
  };

  const handleCloseDetails = () => {
    setSelectedAttempt(null);
  };

  const decodeBase64 = (str) => {
    try {
      return atob(str);
    } catch (e) {
      console.error("Failed to decode base64 string:", e);
      return str;
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Attempt History</Typography>
      <List>
        {attempts.map((attempt) => (
          <ListItem key={attempt.id} divider>
            <ListItemText
              primary={`Attempt on ${new Date(attempt.created_at).toLocaleString()}`}
              secondary={`Status: ${attempt.status}`}
            />
            <Button
              variant="outlined"
              onClick={() => handleViewDetails(attempt)}
            >
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
      {selectedAttempt && (
        <Dialog
          open={true}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Attempt Details</DialogTitle>
          <DialogContent>
            <Typography>Attempt ID: {selectedAttempt.id}</Typography>
            <Typography>Status: {selectedAttempt.status}</Typography>
            <Typography>Code:</Typography>
            <pre>{decodeBase64(selectedAttempt.code)}</pre>
            <Typography>
              Created At:{" "}
              {new Date(selectedAttempt.created_at).toLocaleString()}
            </Typography>
            {/* Add more details as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default AttemptHistory;
