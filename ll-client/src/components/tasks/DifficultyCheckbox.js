// src/components/tasks/DifficultyCheckbox.js
import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const DifficultyCheckbox = ({ difficulty, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          name={difficulty}
          color="primary"
        />
      }
      label={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    />
  );
};

export default DifficultyCheckbox;
