package com.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Client;
@Repository
public interface ClientRepository extends MongoRepository<Client, String> {

}
