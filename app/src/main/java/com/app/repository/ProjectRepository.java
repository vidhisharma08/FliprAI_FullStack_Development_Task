package com.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Project;
@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

}
