// src/components/tasks/DifficultySelect.js
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import DifficultyCheckbox from "./DifficultyCheckbox";

const DifficultySelect = ({ difficulties, onDifficultyChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
      <Select
        labelId="difficulty-select-label"
        multiple
        value={Object.keys(difficulties).filter(
          (difficulty) => difficulties[difficulty],
        )}
        renderValue={(selected) => selected.join(", ")}
      >
        {Object.keys(difficulties).map((difficulty) => (
          <MenuItem key={difficulty} value={difficulty}>
            <DifficultyCheckbox
              difficulty={difficulty}
              checked={difficulties[difficulty]}
              onChange={onDifficultyChange}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DifficultySelect;
