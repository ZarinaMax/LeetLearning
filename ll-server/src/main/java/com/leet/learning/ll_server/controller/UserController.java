// package com.leet.learning.ll_server.controller;

// import com.leet.learning.ll_server.model.User;
// import com.leet.learning.ll_server.service.UserService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/user")
// public class UserController {

//     @Autowired
//     private UserService userService;

//     @GetMapping("/me")
//     public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
//         User user = userService.findByUsername(userDetails.getUsername());
//         return ResponseEntity.ok(user);
//     }

//     @PutMapping("/me")
//     public ResponseEntity<User> updateUser(@AuthenticationPrincipal UserDetails userDetails, @RequestBody User updatedUser) {
//         User user = userService.updateUser(userDetails.getUsername(), updatedUser);
//         return ResponseEntity.ok(user);
//     }
// }
