// src/components/tasks/TagSelect.js
import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
} from "@mui/material";
import tagService from "../../services/tagService";

const TagSelect = ({ selectedTags, onTagChange }) => {
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    tagService
      .getTags()
      .then((response) => {
        const sortedTags = response.data.sort((a, b) => a.localeCompare(b));
        setTags(sortedTags);
      })
      .catch((error) => {
        console.error("Error fetching tags", error);
      });
  }, []);

  // Закомментируем обработчик изменения поиска
  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // Закомментируем фильтрацию тегов
  // const filteredTags = tags.filter((tag) =>
  //   tag.toLowerCase().includes(searchTerm.toLowerCase()),
  // );

  return (
    <FormControl fullWidth>
      <InputLabel id="tag-select-label">Tags</InputLabel>
      <Select
        labelId="tag-select-label"
        multiple
        value={Object.keys(selectedTags).filter((tag) => selectedTags[tag])}
        renderValue={(selected) => selected.join(", ")}
      >
        {/* Закомментируем поле поиска */}
        {/* <MenuItem disabled>
          <TextField
            placeholder="Search tags"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
          />
        </MenuItem> */}
        {tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            <Checkbox
              checked={selectedTags[tag]}
              onChange={onTagChange}
              name={tag}
            />
            <ListItemText primary={tag} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TagSelect;
