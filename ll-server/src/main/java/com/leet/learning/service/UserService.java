package com.leet.learning.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.leet.learning.ll_server.dto.UserLoginDto;
import com.leet.learning.ll_server.dto.UserRegistrationDto;
import com.leet.learning.ll_server.model.User;
import com.leet.learning.ll_server.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User register(UserRegistrationDto registrationDto) {
        User user = new User();
        user.setUsername(registrationDto.username());
        user.setEmail(registrationDto.email());
        user.setPassword(passwordEncoder.encode(registrationDto.password()));
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User login(UserLoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.username());
        if (user != null && passwordEncoder.matches(loginDto.password(), user.getPassword())) {
            return user; // Успешный логин
        }
        return null; // Логин не удался
    }
}
