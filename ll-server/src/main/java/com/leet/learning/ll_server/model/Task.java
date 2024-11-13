package com.leet.learning.ll_server.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer timeout;
    private Integer memoryLimit;
    private String name;
    private String difficulty;
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "task")
    private Set<Test> tests;

    @OneToMany(mappedBy = "task")
    private Set<Attempt> attempts;
}
