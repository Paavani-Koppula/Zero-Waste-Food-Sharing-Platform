package com.food_app.repository;

import com.food_app.model.Ngos;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface NgoRepository extends MongoRepository<Ngos, String> {
	 Optional<Ngos> findByEmail(String email);
}
