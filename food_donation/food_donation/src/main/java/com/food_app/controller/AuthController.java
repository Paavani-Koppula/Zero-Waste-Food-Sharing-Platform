package com.food_app.controller;

import com.food_app.model.Donor;
import com.food_app.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private DonorRepository donorRepo;

    // Register endpoint
    @PostMapping("/register-donor")
    public ResponseEntity<String> register(@RequestBody Donor donor) {
        if (donorRepo.findByName(donor.getName()) != null) {
            return ResponseEntity.badRequest().body("Donor already exists");
        }

        donorRepo.save(donor);
        return ResponseEntity.ok("Donor registered successfully");
    }

    // Login endpoint
    @PostMapping("/login-donor")
    public ResponseEntity<String> login(@RequestBody Donor request) {
        Donor donor = donorRepo.findByName(request.getName());

        if (donor == null || !donor.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Invalid name or password");
        }

        return ResponseEntity.ok("Login successful");
    }
}
