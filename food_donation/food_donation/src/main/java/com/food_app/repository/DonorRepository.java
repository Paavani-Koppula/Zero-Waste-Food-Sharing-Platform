package com.food_app.repository;

import com.food_app.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonorRepository extends MongoRepository<Donor, String> {
    Donor findByName(String name); // Custom query method
}
