package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Newsletter;
import com.app.repository.NewsletterRepository;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "*")
public class NewsletterController {
	@Autowired
    private NewsletterRepository newsletterRepository;
    
    @GetMapping
    public List<Newsletter> getAllNewsletters() {
        return newsletterRepository.findAll();
    }
    
    @PostMapping
    public Newsletter subscribe(@RequestBody Newsletter newsletter) {
        return newsletterRepository.save(newsletter);
    }
}
