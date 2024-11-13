package com.leet.learning.ll_server.controller;

import com.leet.learning.ll_server.dto.TaskDto;
import com.leet.learning.ll_server.model.Task;
import com.leet.learning.ll_server.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<TaskDto> getAllTasks() {
        return taskService.getAllTasks().stream()
                .map(task -> new TaskDto(task.getId(), task.getName(), task.getTimeout(), task.getMemoryLimit(), task.getDescription(), task.getDifficulty()))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        Task task = new Task();
        task.setName(taskDto.name());
        task.setTimeout(taskDto.timeout());
        task.setMemoryLimit(taskDto.memoryLimit());
        task.setDescription(taskDto.description());
        task.setDifficulty(taskDto.difficulty());
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.ok(new TaskDto(createdTask.getId(), createdTask.getName(), createdTask.getTimeout(), createdTask.getMemoryLimit(), createdTask.getDescription(), createdTask.getDifficulty()));
    }
}
