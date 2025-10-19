package com.food_app.controller;

import com.food_app.model.Volunteer;
import com.food_app.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List; 
@RestController
@RequestMapping("/api/ngo")
public class VolunteerController {

    @Autowired
    private VolunteerRepository volunteerRepository;

    // GET all volunteers for a specific NGO
    @GetMapping("/{ngoId}/volunteers")
    public List<Volunteer> getVolunteersByNgo(@PathVariable String ngoId) {
        return volunteerRepository.findByNgoId(ngoId);
    }

    // POST a new volunteer for a specific NGO
    @PostMapping("/{ngoId}/volunteers")
    public Volunteer addVolunteer(@PathVariable String ngoId, @RequestBody Volunteer volunteer) {
        volunteer.setNgoId(ngoId);
        return volunteerRepository.save(volunteer);
    }

    // ✅ Volunteer login
    @PostMapping("/volunteer/login")
    public Volunteer login(@RequestBody Volunteer loginRequest) {
        Volunteer volunteer = volunteerRepository.findByEmail(loginRequest.getEmail());
        if (volunteer != null && volunteer.getPassword().equals(loginRequest.getPassword())) {
            return volunteer; // login success, return volunteer details
        }
        throw new RuntimeException("Invalid email or password");
    }
}
