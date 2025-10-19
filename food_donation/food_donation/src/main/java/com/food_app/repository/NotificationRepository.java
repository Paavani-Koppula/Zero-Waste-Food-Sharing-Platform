package com.food_app.repository;


import com.food_app.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByNgoIdOrderByCreatedAtDesc(String ngoId);
}

