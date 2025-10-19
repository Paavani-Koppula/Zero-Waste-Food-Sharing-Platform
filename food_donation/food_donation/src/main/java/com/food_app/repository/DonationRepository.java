package com.food_app.repository;

import com.food_app.model.Donation;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DonationRepository extends MongoRepository<Donation, String> {
    List<Donation> findByStatus(String status); 
    List<Donation> findByVolunteerId(String volunteerId);
// Needed for filtering by status
}
