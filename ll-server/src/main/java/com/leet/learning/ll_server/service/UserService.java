package com.leet.learning.ll_server.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
        User user = null;
        if (loginDto.username() != null) {
            user = findByUsername(loginDto.username());
        } else if (loginDto.email() != null) {
            user = findByEmail(loginDto.email());
        }

        if (user != null && passwordEncoder.matches(loginDto.password(), user.getPassword())) {
            return user;
        }

        return null;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUser(String username, User updatedUser) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            return userRepository.save(user);
        }
        return null;
    }
}
