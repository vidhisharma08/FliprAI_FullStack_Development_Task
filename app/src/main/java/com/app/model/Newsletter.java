package com.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "newsletters")
public class Newsletter {
    @Id
    private String id;
    private String email;
}