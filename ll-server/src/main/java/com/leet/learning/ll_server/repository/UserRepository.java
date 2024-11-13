package com.leet.learning.ll_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leet.learning.ll_server.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
}