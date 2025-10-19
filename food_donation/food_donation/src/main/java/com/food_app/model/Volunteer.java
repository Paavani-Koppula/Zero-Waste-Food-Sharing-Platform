package com.food_app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "volunteers")
public class Volunteer {

    @Id 
    private String id;
    private String name;
    private String email;
    private String password;  // ✅ new field
    private String ngoId;

    // Getters and Setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {   // ✅ getter for password
        return password;
    }
    public void setPassword(String password) {   // ✅ setter for password
        this.password = password;
    }

    public String getNgoId() {
        return ngoId;
    }
    public void setNgoId(String ngoId) {
        this.ngoId = ngoId;
    }
}
