package com.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Contact;
@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {

}
