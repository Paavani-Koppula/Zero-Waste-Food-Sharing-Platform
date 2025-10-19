package com.food_app.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumerWebSocketBridge {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "test", groupId = "ngo-group")
    public void listenAndSend(String message) {
        // Send to WebSocket topic "/topic/notifications"
        messagingTemplate.convertAndSend("/topic/notifications", message);
    }
}
