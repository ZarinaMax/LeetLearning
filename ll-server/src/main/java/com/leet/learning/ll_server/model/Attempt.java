package com.leet.learning.ll_server.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attempts")
public class Attempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    private String solutionFile;
    private Boolean succeeded;

    @ManyToOne
    @JoinColumn(name = "failed_test_id")
    private Test failedTest;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
