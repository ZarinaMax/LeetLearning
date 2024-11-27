// src/components/tasks/TaskSearch.js
import React, { useState, useEffect } from "react";
import { TextField, FormControl, FormLabel, Button, Grid } from "@mui/material";
import DifficultySelect from "./DifficultySelect";
import TagSelect from "./TagSelect";
import tagService from "../../services/tagService";

const TaskSearch = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [difficulties, setDifficulties] = useState({
    easy: false,
    medium: false,
    hard: false,
  });
  const [selectedTags, setSelectedTags] = useState({});

  useEffect(() => {
    tagService
      .getTags()
      .then((response) => {
        const initialSelectedTags = response.data.reduce((acc, tag) => {
          acc[tag] = false;
          return acc;
        }, {});
        setSelectedTags(initialSelectedTags);
      })
      .catch((error) => {
        console.error("Error fetching tags", error);
      });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulties({
      ...difficulties,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTagChange = (event) => {
    setSelectedTags({
      ...selectedTags,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSearch = () => {
    onSearch({ name, difficulties, selectedTags });
  };

  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">Search Tasks</FormLabel>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DifficultySelect
            difficulties={difficulties}
            onDifficultyChange={handleDifficultyChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TagSelect
            selectedTags={selectedTags}
            onTagChange={handleTagChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Task Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default TaskSearch;
