package com.leet.learning.ll_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leet.learning.ll_server.model.Attempt;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
}