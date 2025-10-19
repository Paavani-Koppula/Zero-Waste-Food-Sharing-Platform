package com.food_app.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class DonationService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private static final String TOPIC = "donation-notification";

    public void donate(String donorName, double amount) {
        // Process the donation logic (save to DB etc.)

        // Send notification message
        String message = "Donor " + donorName + " donated $" + amount;
        kafkaTemplate.send(TOPIC, message);
    }
}
