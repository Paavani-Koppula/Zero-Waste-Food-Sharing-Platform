package com.food_app.service;

import com.food_app.model.Donation;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Service
public class KafkaConsumerService {

    private final NotificationService notificationService;
    private final ObjectMapper objectMapper;
    private final Set<SseEmitter> emitters = new CopyOnWriteArraySet<>();

    public KafkaConsumerService(NotificationService notificationService, ObjectMapper objectMapper) {
        this.notificationService = notificationService;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "donation-submitted", groupId = "ngo-notification-group")
    public void listen(String message) {
        System.out.println("📩 Received Kafka message: " + message);

        try {
            Donation donation = objectMapper.readValue(message, Donation.class);

            // Build email body
            String emailBody = "🎉 New Donation Submitted!\n\n" +
                    "Donor Name: " + donation.getDonorName() + "\n" +
                    "Email: " + donation.getEmail() + "\n" +
                    "Mobile: " + donation.getMobile() + "\n" +
                    "Food Type: " + donation.getFoodType() + "\n" +
                    "Food Name: " + donation.getFoodName() + "\n" +
                    "Quantity: " + donation.getQuantity() + "\n" +
                    "Location: " + donation.getLocation() + "\n" +
                    "Pickup Time: " + donation.getPickupTime() + "\n" +
                    "Best Before: " + donation.getBestBefore();

            System.out.println("📧 Email body prepared:\n" + emailBody); // DEBUG

            notificationService.notifyAllNgos(emailBody);

            for (SseEmitter emitter : emitters) {
                try {
                    emitter.send(SseEmitter.event().name("donation-event").data(emailBody));
                } catch (IOException e) {
                    emitters.remove(emitter);
                }
            }

        } catch (Exception e) {
            System.err.println("❌ Failed to parse donation JSON: " + e.getMessage());
        }
    }

    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));

        return emitter;
    }
}
