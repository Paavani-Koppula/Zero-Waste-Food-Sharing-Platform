package com.food_app.controller;

import com.food_app.model.Donation;
import com.food_app.model.Ngos;
import com.food_app.repository.DonationRepository;
import com.food_app.repository.NgoRepository;
import com.food_app.service.EmailService;
import com.food_app.service.KafkaProducerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/donations")
@CrossOrigin(origins = "http://localhost:3000")
public class DonationController {

    private static final Logger logger = LoggerFactory.getLogger(DonationController.class);

    private final DonationRepository donationRepository;
    private final NgoRepository ngoRepository;
    private final KafkaProducerService kafkaProducerService;
    private final EmailService emailService;

    public DonationController(DonationRepository donationRepository, NgoRepository ngoRepository,
                              KafkaProducerService kafkaProducerService, EmailService emailService) {
        this.donationRepository = donationRepository;
        this.ngoRepository = ngoRepository;
        this.kafkaProducerService = kafkaProducerService;
        this.emailService = emailService;
    }

    // Create Donation
    @PostMapping("/create")
    public ResponseEntity<?> createDonation(@RequestBody Donation donation) {
        try {
            donation.setStatus("PENDING");
            donation.setCreatedAt(Instant.now());
            donation.setUpdatedAt(Instant.now());
            Donation saved = donationRepository.save(donation);

            kafkaProducerService.sendDonationSubmittedEvent(saved);

            if (saved.getEmail() != null && !saved.getEmail().isEmpty()) {
                String emailBody = "🎉 New Donation Created!\n\n" +
                        "Donor Name: " + saved.getDonorName() + "\n" +
                        "Email: " + saved.getEmail() + "\n" +
                        "Mobile: " + saved.getMobile() + "\n" +
                        "Food Type: " + saved.getFoodType() + "\n" +
                        "Food Name: " + saved.getFoodName() + "\n" +
                        "Quantity: " + saved.getQuantity() + "\n" +
                        "Location: " + saved.getLocation() + "\n" +
                        "Pickup Time: " + saved.getPickupTime() + "\n" +
                        "Best Before: " + saved.getBestBefore();

                emailService.sendEmailToAllNgos("New Donation Created", emailBody);
            }
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            logger.error("Error while creating donation", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create donation");
        }
    }

    // Accept Donation by NGO
    @PostMapping("/{donationId}/accept/{ngoId}")
    public ResponseEntity<?> acceptDonation(@PathVariable String donationId, @PathVariable String ngoId) {
        try {
            Optional<Donation> donationOptional = donationRepository.findById(donationId);
            Optional<Ngos> ngoOptional = ngoRepository.findById(ngoId);

            if (donationOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Donation not found"));
            }
            if (ngoOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "NGO not found"));
            }

            Donation donation = donationOptional.get();

            if (!donation.getStatus().equalsIgnoreCase("PENDING")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Donation already accepted by another NGO"));
            }

            Ngos ngo = ngoOptional.get();
            donation.setNgoId(ngoId);
            donation.setNgoName(ngo.getName());
            donation.setStatus("ACCEPTED");
            donation.setUpdatedAt(Instant.now());
            donationRepository.save(donation);

            // Send email to donor
            if (donation.getEmail() != null && !donation.getEmail().isEmpty()) {
                emailService.sendEmail(
                        donation.getEmail(),
                        "Donation Accepted",
                        "Your donation has been accepted by " + ngo.getName()
                );
            }

            return ResponseEntity.ok(Map.of("message", "Donation accepted successfully"));
        } catch (Exception e) {
            logger.error("Error while accepting donation", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to accept donation");
        }
    }

    // Mark Donation as Picked Up
    @PostMapping("/{donationId}/pickup")
    public ResponseEntity<?> markAsPickedUp(@PathVariable String donationId) {
        try {
            Donation donation = donationRepository.findById(donationId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Donation not found"));

            if (!donation.getStatus().equalsIgnoreCase("ACCEPTED")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Donation must be accepted before pickup"));
            }

            donation.setStatus("PICKEDUP");
            donation.setUpdatedAt(Instant.now());
            donationRepository.save(donation);

            // Send email to donor
            if (donation.getEmail() != null && !donation.getEmail().isEmpty()) {
                emailService.sendEmail(
                        donation.getEmail(),
                        "Donation Picked Up",
                        "Your donation has been picked up and is on the way!"
                );
            }

            return ResponseEntity.ok(Map.of("message", "Donation marked as picked up"));
        } catch (Exception e) {
            logger.error("Error while picking up donation", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to mark donation as picked up");
        }
    }

    // Mark Donation as Delivered
    @PostMapping("/{donationId}/deliver")
    public ResponseEntity<?> markAsDelivered(@PathVariable String donationId) {
        try {
            Donation donation = donationRepository.findById(donationId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Donation not found"));

            if (!donation.getStatus().equalsIgnoreCase("PICKEDUP")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Donation must be picked up before delivery"));
            }

            donation.setStatus("DELIVERED");
            donation.setUpdatedAt(Instant.now());
            donationRepository.save(donation);

            // Send email to donor
            if (donation.getEmail() != null && !donation.getEmail().isEmpty()) {
                emailService.sendEmail(
                        donation.getEmail(),
                        "Donation Delivered",
                        "Your donation has been successfully delivered. Thank you for contributing!"
                );
            }

            return ResponseEntity.ok(Map.of("message", "Donation marked as delivered"));
        } catch (Exception e) {
            logger.error("Error while delivering donation", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to mark donation as delivered");
        }
    }

    // Get All Donations or by Status
    @GetMapping
    public ResponseEntity<?> getDonations(@RequestParam(required = false) String status) {
        try {
            List<Donation> donations;
            if (status != null) {
                donations = donationRepository.findByStatus(status.toUpperCase());
            } else {
                donations = donationRepository.findAll();
            }
            return ResponseEntity.ok(donations);
        } catch (Exception e) {
            logger.error("Error while fetching donations", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get donations");
        }
    }

    // Get Donation by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getDonationById(@PathVariable String id) {
        try {
            Optional<Donation> donation = donationRepository.findById(id);
            if (donation.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Donation not found"));
            }
            return ResponseEntity.ok(donation.get());
        } catch (Exception e) {
            logger.error("Error while fetching donation", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get donation");
        }
    }
}
