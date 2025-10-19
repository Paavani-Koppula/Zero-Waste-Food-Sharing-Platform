package com.food_app.repository;

import com.food_app.model.Volunteer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface VolunteerRepository extends MongoRepository<Volunteer, String> {
    List<Volunteer> findByNgoId(String ngoId);

    Volunteer findByEmail(String email); // ✅ for login
}
