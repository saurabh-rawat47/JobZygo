package com.tony.JobZygo.service;

import com.tony.JobZygo.entity.User;
import com.tony.JobZygo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    AuthenticationManager auth;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public User signup(User user) {
        try {
            // Check if username already exists
            User existingUserByUsername = userRepo.findByUsername(user.getUsername());
            if (existingUserByUsername != null) {
                throw new RuntimeException("Username '" + user.getUsername() + "' already exists");
            }

            // Check if email already exists
            User existingUserByEmail = userRepo.findByEmail(user.getEmail());
            if (existingUserByEmail != null) {
                throw new RuntimeException("Email '" + user.getEmail() + "' already exists");
            }

            // Encode password and save
            user.setPassword(encoder.encode(user.getPassword()));

            System.out.println("Saving user to database: " + user.getUsername());
            User savedUser = userRepo.save(user);
            System.out.println("User saved successfully with ID: " + savedUser.getId());

            return savedUser;

        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            System.err.println("Error saving user: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to create user: " + e.getMessage());
        }
    }

    public String verify(User user) {

        try {
            Authentication authentication = auth.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            if (authentication.isAuthenticated()) {
                return jwtService.generateToken(user.getUsername());
            } else {
                return "Fail";
            }
        } catch (Exception e) {
            System.err.println("Authentication failed for user: " + user.getUsername() + " - " + e.getMessage());
            return "Fail";
        }
    }

    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }
}
