package com.food_app.service;

import com.food_app.model.Ngos;
import com.food_app.repository.NgoRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final NgoRepository ngoRepository;

    public EmailService(JavaMailSender mailSender, NgoRepository ngoRepository) {
        this.mailSender = mailSender;
        this.ngoRepository = ngoRepository;
    }

    public void sendEmailToAllNgos(String subject, String body) {
        List<Ngos> ngos = ngoRepository.findAll();
        for (Ngos ngo : ngos) {
            if (ngo.getEmail() != null && !ngo.getEmail().isEmpty()) {
                sendEmail(ngo.getEmail(), subject, body);
            }
        }
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
