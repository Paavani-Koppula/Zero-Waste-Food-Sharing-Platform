package com.food_app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.food_app.model.Ngos;
import com.food_app.repository.NgoRepository;

import java.util.List;

@Service
public class NotificationConsumer {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private NgoRepository ngoRepository;

    @KafkaListener(topics = "donation-notification", groupId = "ngo-notification-group")
    public void listen(String message) {
        System.out.println("Received message: " + message);

        List<Ngos> ngos = ngoRepository.findAll();

        for (Ngos ngo : ngos) {
            sendEmail(ngo.getEmail(), message);
        }
    }

    private void sendEmail(String to, String messageBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("New Donation Alert");
        message.setText(messageBody);
        mailSender.send(message);
    }
}
