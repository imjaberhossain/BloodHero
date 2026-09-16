package com.bloodhero.backend.controller;

import com.bloodhero.backend.model.BloodRequest;
import com.bloodhero.backend.repository.BloodRequestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class RequestController {

    private final BloodRequestRepository requestRepository;

    public RequestController(BloodRequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @GetMapping
    public ResponseEntity<List<BloodRequest>> getAllRequests() {
        return ResponseEntity.ok(requestRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<BloodRequest> createRequest(@RequestBody BloodRequest request) {
        return ResponseEntity.ok(requestRepository.save(request));
    }
}