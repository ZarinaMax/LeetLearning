package com.leet.learning.ll_server.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tests")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @Column(name = "test_num")
    private Integer testNum;

    @Column(columnDefinition = "TEXT") // To handle potentially large input
    private String input;

    @Column(columnDefinition = "TEXT") // To handle potentially large output
    private String output;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
