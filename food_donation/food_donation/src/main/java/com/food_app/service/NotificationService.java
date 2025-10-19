package com.food_app.service;

import com.food_app.repository.NgoRepository;
import com.food_app.model.Ngos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private NgoRepository ngoRepository;

    public void notifyAllNgos(String body) {
        List<Ngos> ngos = ngoRepository.findAll();

        for (Ngos ngo : ngos) {
            System.out.println("📨 Sending email to: " + ngo.getEmail());  // DEBUG
            sendEmail(ngo.getEmail(), body);
        }
    }

    private void sendEmail(String to, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("🍴 New Donation Alert");
        message.setText(body);
        mailSender.send(message);

        System.out.println("✅ Email sent to " + to);  // DEBUG
    }
}
