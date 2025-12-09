package com.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "clients")
public class Client {
    @Id
    private String id;
    private String name;
    private String description;
    private String designation;
    private String imageUrl;
}
