package com.tony.JobZygo.controller;

import com.tony.JobZygo.entity.User;
import com.tony.JobZygo.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody User user) {
        System.out.println("=== SIGNUP REQUEST RECEIVED ===");
        System.out.println("Request received at: " + new java.util.Date());
        System.out.println("User object: " + user);

        Map<String, Object> response = new HashMap<>();

        try {
            // Validate input
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Username is required");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Email is required");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Password is required");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Trim whitespace
            user.setUsername(user.getUsername().trim());
            user.setEmail(user.getEmail().trim());

            System.out.println("Attempting to create user: " + user.getUsername() + " with email: " + user.getEmail());

            User savedUser = userService.signup(user);

            // Don't return password
            savedUser.setPassword(null);

            response.put("success", true);
            response.put("message", "User created successfully");
            response.put("user", savedUser);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (RuntimeException e) {
            System.err.println("Signup error: " + e.getMessage());
            response.put("success", false);
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.err.println("Unexpected signup error: " + e.getMessage());
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "An unexpected error occurred");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user, HttpServletResponse response) {
        Map<String, Object> responseBody = new HashMap<>();

        try {
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                responseBody.put("success", false);
                responseBody.put("message", "Username is required");
                return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
            }

            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                responseBody.put("success", false);
                responseBody.put("message", "Password is required");
                return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
            }

            System.out.println("Attempting login for user: " + user.getUsername());

            String token = userService.verify(user);

            if (!"Fail".equals(token)) {
                // Set JWT token in response header
                response.setHeader("Authorization", "Bearer " + token);

                // Also get user details for response
                User loggedInUser = userService.findByUsername(user.getUsername());
                loggedInUser.setPassword(null); // Don't return password

                responseBody.put("success", true);
                responseBody.put("message", "Login successful");
                responseBody.put("user", loggedInUser);

                return new ResponseEntity<>(responseBody, HttpStatus.OK);
            } else {
                responseBody.put("success", false);
                responseBody.put("message", "Invalid username or password");
                return new ResponseEntity<>(responseBody, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            e.printStackTrace();
            responseBody.put("success", false);
            responseBody.put("message", "Login failed");
            return new ResponseEntity<>(responseBody, HttpStatus.UNAUTHORIZED);
        }
    }
}
