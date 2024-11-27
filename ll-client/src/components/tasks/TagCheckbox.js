// src/components/tasks/TagCheckbox.js
import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const TagCheckbox = ({ tag, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          name={tag}
          color="primary"
        />
      }
      label={tag}
    />
  );
};

export default TagCheckbox;
