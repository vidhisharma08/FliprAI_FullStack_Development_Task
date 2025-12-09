package com.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "contacts")
public class Contact {
    @Id
    private String id;
    private String fullName;
    private String email;
    private String mobile;
    private String city;
}
