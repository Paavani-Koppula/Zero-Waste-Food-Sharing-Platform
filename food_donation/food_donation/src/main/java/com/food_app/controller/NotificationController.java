package com.food_app.controller;

import com.food_app.service.KafkaConsumerService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
public class NotificationController {

    private final KafkaConsumerService kafkaConsumerService;

    public NotificationController(KafkaConsumerService kafkaConsumerService) {
        this.kafkaConsumerService = kafkaConsumerService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/notifications/stream")
    public SseEmitter streamNotifications() {
        return kafkaConsumerService.subscribe();
    }
}
