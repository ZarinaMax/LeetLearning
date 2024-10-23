package com.leet.learning.ll_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leet.learning.ll_server.model.Test;

public interface TestRepository extends JpaRepository<Test, Long> {
}
