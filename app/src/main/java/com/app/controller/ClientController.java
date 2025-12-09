package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Client;
import com.app.repository.ClientRepository;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class ClientController {
	 @Autowired
	    private ClientRepository clientRepository;
	    
	    @GetMapping
	    public List<Client> getAllClients() {
	        return clientRepository.findAll();
	    }
	    
	    @PostMapping
	    public Client createClient(@RequestBody Client client) {
	        return clientRepository.save(client);
	    }
	    
	    @DeleteMapping("/{id}")
	    public ResponseEntity<?> deleteClient(@PathVariable String id) {
	        clientRepository.deleteById(id);
	        return ResponseEntity.ok().build();
	    }
}
