package com.food_app.controller;

import com.food_app.model.Ngos;
import com.food_app.repository.NgoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ngos")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend requests
public class NgoController {

    @Autowired
    private NgoRepository ngoRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ✅ Registration endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerNgo(@RequestBody Ngos ngo) {
        // Check if email already exists
        if (ngoRepository.findByEmail(ngo.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // Encrypt the password before saving
        ngo.setPassword(passwordEncoder.encode(ngo.getPassword()));

        // Save NGO to database
        ngoRepository.save(ngo);

        return ResponseEntity.ok("NGO registered successfully");
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginNgo(@RequestBody Ngos ngo) {
        return ngoRepository.findByEmail(ngo.getEmail())
                .map(existingNgo -> {
                    if (passwordEncoder.matches(ngo.getPassword(), existingNgo.getPassword())) {
                        // success response
                        java.util.Map<String, Object> response = new java.util.HashMap<>();
                        response.put("id", existingNgo.getId());
                        response.put("name", existingNgo.getName());
                        response.put("email", existingNgo.getEmail());
                        return ResponseEntity.ok(response);
                    } else {
                        java.util.Map<String, String> error = new java.util.HashMap<>();
                        error.put("error", "Invalid password");
                        return ResponseEntity.badRequest().body(error);
                    }
                })
                .orElseGet(() -> {
                    java.util.Map<String, String> error = new java.util.HashMap<>();
                    error.put("error", "NGO not found");
                    return ResponseEntity.badRequest().body(error);
                });
    }

}
