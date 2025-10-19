package com.food_app.service;

import com.food_app.model.Donation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    // Send donation-submitted event with full details
    public void sendDonationSubmittedEvent(Donation donation) {
        String topic = "donation-submitted";
        try {
            String message = objectMapper.writeValueAsString(donation);
            System.out.println("🚀 Sending Kafka message: " + message);  // DEBUG
            kafkaTemplate.send(topic, message);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize donation for Kafka", e);
        }
    }
}
